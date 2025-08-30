import parseCsv from './parseCsv.ts'
import parseXsd from './parseXsd.ts'
import type { CsvData, CsvRecords, CsvType } from './parseCsv.ts'
import type { XsdProperty } from './parseXsd.ts'

interface TrackField {
  description?: string
  group?: string
  type: string
}

type TrackFields = Record<string, TrackField>

type TrackTypes = Record<'Base' | CsvType, TrackFields>

type GetXsdPropery = (name: string) => XsdProperty

function normalizeName(name: string) {
  let normalizedName = name.replace('*', '_')
  for (const char of ['(', ')']) {
    normalizedName = normalizedName.replace(char, '')
  }
  return normalizedName
}

function findCommonFields(descriptions: CsvData, getXsdType: GetXsdPropery): TrackFields {
  const commonFields: TrackFields = {}

  const { General: general, ...others } = descriptions

  // Find fields present in every track type
  for (const csvName of Object.keys(general)) {
    // Ignore `Title` as it has different descriptions that are worth keeping
    if (csvName === 'Title') {
      continue
    }

    if (Object.values(others).every((descr) => Object.keys(descr).includes(csvName))) {
      const normalizedName = normalizeName(csvName)

      // Add to common
      commonFields[normalizedName] = {
        description: general[csvName].description, // ok: all common properties have descriptions
        group: general[csvName].group,
        type: getXsdType(normalizedName).type,
      }
    }
  }

  return commonFields
}

function makeTrackFields(
  csvRecords: CsvRecords,
  commonFieldsNames: string[],
  getXsdType: GetXsdPropery
): TrackFields {
  const fields: TrackFields = {}

  for (const [csvName, record] of Object.entries(csvRecords)) {
    const normalizedName = normalizeName(csvName)

    // Skip fields present in `BaseTrack`
    if (commonFieldsNames.includes(normalizedName)) {
      continue
    }

    let xsdProperty: XsdProperty
    try {
      xsdProperty = getXsdType(normalizedName)
    } catch (error) {
      if (error instanceof Error && error.message === "Property 'Type_String' not found in XSD") {
        // 'Type_String' is missing in
        // https://github.com/MediaArea/MediaAreaXml/blob/master/mediainfo.xsd
        xsdProperty = { type: 'string' }
      } else {
        throw error
      }
    }

    const field: TrackField = {
      type: xsdProperty.type,
      group: record.group,
    }

    // try description from CSV, or XSD
    if (record.description) {
      field.description = record.description
    } else if (xsdProperty.annotation) {
      field.description = xsdProperty.annotation
    }

    // Skip deprecated
    if (field.description?.toLowerCase().includes('deprecated')) {
      continue
    }

    fields[normalizedName] = field
  }

  return fields
}

async function getFields(): Promise<[TrackTypes, string[], string[]]> {
  // Parse XSD
  const { properties: xsdProperties, intFields, floatFields } = await parseXsd()

  // Parse CSV
  const csvData = await parseCsv()

  const getXsdType = (fieldName: string): XsdProperty => {
    if (!Object.keys(xsdProperties).includes(fieldName)) {
      throw new Error(`Property '${fieldName}' not found in XSD`)
    }
    return xsdProperties[fieldName]
  }

  // Find common fields to put into `BaseTrack`
  const commonFields = findCommonFields(csvData, getXsdType)
  const commonFieldNames = Object.keys(commonFields)

  return [
    {
      Base: commonFields,
      Audio: makeTrackFields(csvData.Audio, commonFieldNames, getXsdType),
      General: makeTrackFields(csvData.General, commonFieldNames, getXsdType),
      Image: makeTrackFields(csvData.Image, commonFieldNames, getXsdType),
      Menu: makeTrackFields(csvData.Menu, commonFieldNames, getXsdType),
      Other: makeTrackFields(csvData.Other, commonFieldNames, getXsdType),
      Text: makeTrackFields(csvData.Text, commonFieldNames, getXsdType),
      Video: makeTrackFields(csvData.Video, commonFieldNames, getXsdType),
    },
    intFields,
    floatFields,
  ]
}

export type { TrackFields }
export default getFields
