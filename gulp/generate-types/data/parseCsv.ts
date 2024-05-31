import { parse } from 'csv-parse/sync'

import { downloadFile } from '../../utils'

const url = (type: CsvType) =>
  `https://raw.githubusercontent.com/MediaArea/MediaInfoLib/master/Source/Resource/Text/Stream/${type}.csv`

const types = ['Audio', 'General', 'Image', 'Menu', 'Other', 'Text', 'Video'] as const

function isCsvRecord(thing: unknown): thing is CsvRecord {
  return (
    thing !== null && typeof thing === 'object' && typeof (thing as CsvRecord).name === 'string'
  )
}

async function parseCsv(type: CsvType) {
  const csvData = await downloadFile(url(type))

  const records = parse(csvData, {
    columns: ['name', '', '', '', '', '', 'description', '', 'group'],
    delimiter: ';',
    escape: false,
    quote: false,
    relaxColumnCountLess: true,
    skipEmptyLines: true,
  }) as object

  if (!Array.isArray(records)) {
    throw new TypeError('Expected array')
  }

  const descriptions: CsvRecords = {}

  for (const record of records) {
    if (!isCsvRecord(record)) {
      throw new Error(`Got malformed record: ${record}`)
    }
    descriptions[record.name.replaceAll('/', '_')] = record
  }

  return descriptions
}

async function parseCsvFiles() {
  const typeDescriptions: CsvData = {
    Audio: {},
    General: {},
    Image: {},
    Menu: {},
    Other: {},
    Text: {},
    Video: {},
  }

  for (const type of types) {
    typeDescriptions[type] = await parseCsv(type)
  }

  return typeDescriptions
}

type CsvType = (typeof types)[number]

interface CsvRecord {
  name: string
  description?: string
  group?: string
}

type CsvRecords = Record<string, CsvRecord>

type CsvData = Record<CsvType, CsvRecords>

export type { CsvData, CsvRecords, CsvType }
export default parseCsvFiles
