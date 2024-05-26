import https from 'node:https'

import { DOMParser } from '@xmldom/xmldom'
import ts from 'typescript'
import xpath from 'xpath'

import { createProperty } from './factories.ts'

const URL = 'https://raw.githubusercontent.com/MediaArea/MediaAreaXml/master/mediainfo.xsd'
const namespace = 'http://www.w3.org/2001/XMLSchema'

async function downloadSchema() {
  return new Promise<string>((resolve, reject) => {
    https
      .get(URL, (resp) => {
        let data = ''
        resp.on('data', (chunk: string) => {
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

  const elements = select('//xmlns:complexType[@name="trackType"]/xmlns:all/*', xmlDoc)

  if (!xpath.isArrayOfNodes(elements)) {
    throw new Error('No elements found!')
  }

  // Collect int/float types
  const intFields: string[] = []
  const floatFields: string[] = []
  const properties: ts.PropertySignature[] = []

  for (const element of elements) {
    if (!xpath.isElement(element)) {
      continue
    }

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
    switch (xsdType) {
      case 'extraType': {
        type = 'ExtraType'
        break
      }
      case 'xsd:string': {
        type = 'string'
        break
      }
      case 'xsd:integer': {
        type = 'number'
        intFields.push(name)
        break
      }
      case 'xsd:float': {
        type = 'number'
        floatFields.push(name)
        break
      }
      default: {
        throw new Error(`Unknown type: ${xsdType}`)
      }
    }

    // create property
    const quotedName = name.includes('-') ? `'${name}'` : name
    let property = createProperty(quotedName, type, { required: false })

    // extract docstring
    let docString: string | undefined
    const docEl = select('./xmlns:annotation/xmlns:documentation/text()', element)
    if (xpath.isArrayOfNodes(docEl) && xpath.isTextNode(docEl[0])) {
      docString = docEl[0].nodeValue?.trim()
      if (!docString) {
        throw new Error('Empty documentation element found.')
      }
      property = ts.addSyntheticLeadingComment(
        property,
        ts.SyntaxKind.MultiLineCommentTrivia,
        `* ${docString} `,
        true
      )
    }

    properties.push(property)
  }

  return { properties, intFields, floatFields }
}

export default parseXsd
