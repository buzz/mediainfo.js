import { DOMParser } from '@xmldom/xmldom'
import xpath from 'xpath'

import { downloadFile } from '../../utils.ts'

const URL = 'https://raw.githubusercontent.com/MediaArea/MediaAreaXml/master/mediainfo.xsd'
const namespace = 'http://www.w3.org/2001/XMLSchema'

async function parseXsd() {
  const xmlDocData = await downloadFile(URL)
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
  const properties: Record<string, XsdProperty> = {}

  for (const element of elements) {
    if (!xpath.isElement(element)) {
      continue
    }

    let name = element.attributes.getNamedItem('name')?.value
    const minOccurs = element.attributes.getNamedItem('minOccurs')?.value
    const maxOccurs = element.attributes.getNamedItem('maxOccurs')?.value
    const xsdType = element.attributes.getNamedItem('type')?.value

    // fix typo is XSD
    if (name === 'Choregrapher') {
      name = 'Choreographer'
    }

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
        type = 'Extra'
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

    const property: XsdProperty = { type: type as PropertyType }

    // extract annotation if available
    let annotation: string | undefined
    const docEl = select('./xmlns:annotation/xmlns:documentation/text()', element)
    if (xpath.isArrayOfNodes(docEl) && xpath.isTextNode(docEl[0])) {
      annotation = docEl[0].nodeValue?.trim()
      if (!annotation) {
        throw new Error('Empty documentation element found.')
      }
      property.annotation = annotation
    }

    properties[name] = property
  }

  // Add fields missing from XSD
  properties.ISAN = { type: 'string' }
  properties.Active_Width_String = { type: 'string' }
  properties.Active_Height_String = { type: 'string' }
  properties.Active_DisplayAspectRatio_String = { type: 'string' }
  properties.HDR_Format_Compression = { type: 'string' }
  properties.Encoded_OperatingSystem_String = { type: 'string' }
  properties.Encoded_Hardware_String = { type: 'string' }

  return { properties, intFields, floatFields }
}

type PropertyType = 'string' | 'number' | 'Extra'

interface XsdProperty {
  type: PropertyType
  annotation?: string
}

export type { XsdProperty }
export default parseXsd
