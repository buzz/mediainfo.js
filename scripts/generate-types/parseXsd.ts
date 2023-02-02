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

  return attrs.filter(isElement).map((element) => {
    let name = element.attr('name')?.value()
    const minOccurs = element.attr('minOccurs')?.value()
    const maxOccurs = element.attr('maxOccurs')?.value()
    const xsdType = element.attr('type')?.value()
    if (!name || !minOccurs || !maxOccurs || !xsdType) {
      throw new Error('Element missing attribute')
    }

    name = name.includes('-') ? `'${name}'` : name

    // all attributes should be required
    if (minOccurs !== '0' || maxOccurs !== '1')
      throw new Error(`minOccurs=${minOccurs} maxOccurs=${maxOccurs}`)

    // extract type
    let type: string
    if (xsdType === 'extraType') type = 'ExtraType'
    else if (xsdType === 'xsd:string') type = 'string'
    else if (xsdType === 'xsd:integer') type = 'number'
    else if (xsdType === 'xsd:float') type = 'number'
    else throw new Error(`Unknown type: ${xsdType}`)

    // extract docstring
    let docString: string | undefined
    const docEl = element.get('./xmlns:annotation/xmlns:documentation', namespace)
    if (docEl && isElement(docEl)) {
      docString = docEl.text().trim()
    }

    // create property
    const prop = createProperty(name, type, { required: false })
    return docString
      ? ts.addSyntheticLeadingComment(
          prop,
          ts.SyntaxKind.MultiLineCommentTrivia,
          `* ${docString} `,
          true
        )
      : prop
  })
}

export default parseXsd
