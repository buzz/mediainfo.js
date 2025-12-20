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

type GetXsdPropery = (csvType: CsvType | 'Common', name: string) => XsdProperty

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
        type: getXsdType('Common', normalizedName).type,
      }
    }
  }

  return commonFields
}

const MISSING_PROPERTIES: Record<string, XsdProperty['type']> = {
  Type_String: 'string',
  MasteringDisplay_Luminance_Original_Min: 'string',
  MasteringDisplay_Luminance_Original_Max: 'string',
}

function makeTrackFields(
  csvType: CsvType,
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

    let xsdProperty: XsdProperty | null = null
    try {
      xsdProperty = getXsdType(csvType, normalizedName)
    } catch (error) {
      if (error instanceof Error && /Property .+ not found in XSD/.test(error.message)) {
        for (const [propName, propType] of Object.entries(MISSING_PROPERTIES)) {
          if (error.message.includes(`'${propName}'`)) {
            xsdProperty = { type: propType }
          }
        }
      }
      if (xsdProperty === null) {
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

  const getXsdType: GetXsdPropery = (csvType, fieldName) => {
    if (!Object.keys(xsdProperties).includes(fieldName)) {
      throw new Error(`Property '${fieldName}' not found in XSD (csvType=${csvType})`)
    }
    return xsdProperties[fieldName]
  }

  // Find common fields to put into `BaseTrack`
  const commonFields = findCommonFields(csvData, getXsdType)
  const commonFieldNames = Object.keys(commonFields)

  return [
    {
      Base: commonFields,
      Audio: makeTrackFields('Audio', csvData.Audio, commonFieldNames, getXsdType),
      General: makeTrackFields('General', csvData.General, commonFieldNames, getXsdType),
      Image: makeTrackFields('Image', csvData.Image, commonFieldNames, getXsdType),
      Menu: makeTrackFields('Menu', csvData.Menu, commonFieldNames, getXsdType),
      Other: makeTrackFields('Other', csvData.Other, commonFieldNames, getXsdType),
      Text: makeTrackFields('Text', csvData.Text, commonFieldNames, getXsdType),
      Video: makeTrackFields('Video', csvData.Video, commonFieldNames, getXsdType),
    },
    intFields,
    floatFields,
  ]
}

export type { TrackFields }
export default getFields
