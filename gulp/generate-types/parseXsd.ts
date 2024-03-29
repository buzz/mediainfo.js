import https from 'https'

import { type Element, type Node, parseXml } from 'libxmljs2'
import ts from 'typescript'

import { createProperty } from './factories'

const URL = 'https://raw.githubusercontent.com/MediaArea/MediaAreaXml/master/mediainfo.xsd'
const namespace = 'http://www.w3.org/2001/XMLSchema'

function isElement(node: Node): node is Element {
  return node.type() === 'element'
}

async function downloadSchema() {
  return new Promise<string>((resolve, reject) => {
    https
      .get(URL, (resp) => {
        let data = ''
        resp.on('data', (chunk) => {
          data += chunk
        })
        resp.on('end', () => {
          resolve(data)
        })
      })
      .on('error', reject)
  })
}

async function parseXsd() {
  const xmlDocData = await downloadSchema()
  const xmlDoc = parseXml(xmlDocData)
  const attrs = xmlDoc.find('//xmlns:complexType[@name="trackType"]/xmlns:all/*', namespace)

  // Collect int/float types
  const intFields: string[] = []
  const floatFields: string[] = []

  const nodes = attrs.filter(isElement).map((element) => {
    const name = element.attr('name')?.value()
    const minOccurs = element.attr('minOccurs')?.value()
    const maxOccurs = element.attr('maxOccurs')?.value()
    const xsdType = element.attr('type')?.value()
    if (!name || !minOccurs || !maxOccurs || !xsdType) {
      throw new Error('Element missing attribute')
    }

    // all attributes should be optional
    if (minOccurs !== '0' || maxOccurs !== '1')
      throw new Error(`minOccurs=${minOccurs} maxOccurs=${maxOccurs}`)

    // extract type
    let type: string
    if (xsdType === 'extraType') type = 'ExtraType'
    else if (xsdType === 'xsd:string') type = 'string'
    else if (xsdType === 'xsd:integer') {
      type = 'number'
      intFields.push(name)
    } else if (xsdType === 'xsd:float') {
      type = 'number'
      floatFields.push(name)
    } else throw new Error(`Unknown type: ${xsdType}`)

    // extract docstring
    let docString: string | undefined
    const docEl = element.get('./xmlns:annotation/xmlns:documentation', namespace)
    if (docEl && isElement(docEl)) {
      docString = docEl.text().trim()
    }

    // create property
    const quotedName = name.includes('-') ? `'${name}'` : name
    const prop = createProperty(quotedName, type, { required: false })
    return docString
      ? ts.addSyntheticLeadingComment(
          prop,
          ts.SyntaxKind.MultiLineCommentTrivia,
          `* ${docString} `,
          true
        )
      : prop
  })

  return { nodes, intFields, floatFields }
}

export default parseXsd
