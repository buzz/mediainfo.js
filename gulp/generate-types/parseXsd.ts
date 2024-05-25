import https from 'https'

import { DOMParser } from '@xmldom/xmldom'
import ts from 'typescript'
import xpath from 'xpath'

import { createProperty } from './factories'

const URL = 'https://raw.githubusercontent.com/MediaArea/MediaAreaXml/master/mediainfo.xsd'
const namespace = 'http://www.w3.org/2001/XMLSchema'

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
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xmlDocData, 'text/xml')
  const select = xpath.useNamespaces({ xmlns: namespace })

  const attrs = select('//xmlns:complexType[@name="trackType"]/xmlns:all/*', xmlDoc)

  if (!xpath.isArrayOfNodes(attrs)) {
    throw new Error('No elements found!')
  }

  // Collect int/float types
  const intFields: string[] = []
  const floatFields: string[] = []

  const nodes = attrs.filter(xpath.isElement).map((element) => {
    const name = element.attributes.getNamedItem('name')?.value
    const minOccurs = element.attributes.getNamedItem('minOccurs')?.value
    const maxOccurs = element.attributes.getNamedItem('maxOccurs')?.value
    const xsdType = element.attributes.getNamedItem('type')?.value

    if (
      name === undefined ||
      minOccurs === undefined ||
      maxOccurs === undefined ||
      xsdType === undefined
    ) {
      throw new Error('Element missing attribute')
    }

    // all attributes should be optional
    if (minOccurs !== '0' || maxOccurs !== '1') {
      throw new Error(`minOccurs=${minOccurs} maxOccurs=${maxOccurs}`)
    }

    // extract type
    let type: string
    if (xsdType === 'extraType') {
      type = 'ExtraType'
    } else if (xsdType === 'xsd:string') {
      type = 'string'
    } else if (xsdType === 'xsd:integer') {
      type = 'number'
      intFields.push(name)
    } else if (xsdType === 'xsd:float') {
      type = 'number'
      floatFields.push(name)
    } else {
      throw new Error(`Unknown type: ${xsdType}`)
    }

    // extract docstring
    let docString: string | undefined
    const docEl = select('./xmlns:annotation/xmlns:documentation/text()', element)
    if (xpath.isArrayOfNodes(docEl) && xpath.isTextNode(docEl[0])) {
      docString = docEl[0].nodeValue?.trim()
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
