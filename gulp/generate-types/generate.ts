import fs from 'node:fs/promises'
import path from 'node:path'

import ts from 'typescript'

import { BUILD_DIR, SRC_DIR, TRACK_TYPES } from '../constants.ts'
import { format } from '../utils.ts'
import {
  createArrayAsConst,
  createInterface,
  createProperty,
  exportModifier,
  readonlyModifier,
} from './factories.ts'
import parseCsv, { type CsvDescriptions } from './parseCsv.ts'
import parseXsd, { type XsdProperty } from './parseXsd.ts'

const TOP_COMMENT = '// DO NOT EDIT! File generated using `generate-types` script.'
const FILENAME = 'MediaInfoResult.ts'

const outFilename = path.join(SRC_DIR, FILENAME)

const creationInfo = createInterface('CreationInfo', [
  createProperty('version', 'string', { required: true }),
  createProperty('url', 'string'),
  createProperty('build_date', 'string'),
  createProperty('build_time', 'string'),
  createProperty('compiler_ident', 'string'),
])

const extra = ts.factory.createTypeAliasDeclaration(
  [exportModifier],
  ts.factory.createIdentifier('Extra'),
  undefined,
  ts.factory.createTypeReferenceNode(ts.factory.createIdentifier('Record'), [
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword),
  ])
)

const trackBase = createInterface(
  'BaseTrack',
  [
    ts.addSyntheticLeadingComment(
      ts.factory.createPropertySignature(
        [readonlyModifier],
        "'@type'",
        undefined,
        ts.factory.createUnionTypeNode(
          TRACK_TYPES.map((t) =>
            ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral(t))
          )
        )
      ),
      ts.SyntaxKind.MultiLineCommentTrivia,
      '* Documents the type of encoded media with the track, ie: General, Video, Audio, Text, Image, etc. ',
      true
    ),
    ts.addSyntheticLeadingComment(
      createProperty("'@typeorder'", 'string'),
      ts.SyntaxKind.MultiLineCommentTrivia,
      '* If there is more than one track of the same type (i.e. four audio tracks) this attribute will number them according to storage order within the bitstream. ',
      true
    ),
    createProperty('extra', 'Extra'),
  ],
  undefined,
  []
)

const track = ts.factory.createTypeAliasDeclaration(
  [exportModifier],
  ts.factory.createIdentifier('Track'),
  undefined,
  ts.factory.createUnionTypeNode(
    TRACK_TYPES.map((type) => ts.factory.createTypeReferenceNode(`${type}Track`))
  )
)

const media = createInterface('Media', [
  createProperty("'@ref'", 'string', { required: true }),
  createProperty('track', 'Track', { array: true, required: true }),
])

const mediaInfoResult = createInterface('MediaInfoResult', [
  createProperty('creatingApplication', 'CreationInfo'),
  createProperty('creatingLibrary', 'CreationInfo'),
  createProperty('media', 'Media'),
])

function normalizeName(name: string) {
  let normalizedName = name.replace('*', '_')
  for (const char of ['(', ')']) {
    normalizedName = normalizedName.replace(char, '')
  }
  return normalizedName
}

function makeTrackInterfaces(
  descriptions: CsvDescriptions,
  properties: Record<string, XsdProperty>
) {
  return Object.entries(descriptions).map(([type, descriptions]) => {
    const members: ts.TypeElement[] = []

    for (const [propertyName, record] of Object.entries(descriptions)) {
      const normalizedName = normalizeName(propertyName)
      let docComment: string | undefined

      if (!Object.keys(properties).includes(normalizedName)) {
        throw new Error(`Property '${normalizedName}' not found XSD (type '${type}')`)
      }
      const xsdProperty = properties[normalizedName]

      // from type CSV?
      if (record.description) {
        docComment = record.description
      }
      // from XSD?
      else if (xsdProperty.annotation) {
        docComment = xsdProperty.annotation
      }

      const tsPropertyName = normalizedName.includes('-') ? `'${normalizedName}'` : normalizedName
      let property = createProperty(tsPropertyName, xsdProperty.type)

      if (docComment) {
        // Skip deprecated
        if (docComment.toLowerCase().includes('deprecated')) {
          continue
        }

        property = ts.addSyntheticLeadingComment(
          property,
          ts.SyntaxKind.MultiLineCommentTrivia,
          `* ${docComment} `,
          true
        )
      }

      members.push(property)
    }

    const typeProperty = ts.factory.createPropertySignature(
      [readonlyModifier],
      "'@type'",
      undefined,
      ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral(type))
    )

    return createInterface(`${type}Track`, [typeProperty, ...members], trackBase)
  })
}

async function generate() {
  // Parse XSD
  const { properties, intFields, floatFields } = await parseXsd()

  // Parse CSV
  const descriptions = await parseCsv()

  // Field types
  const intFieldsArr = createArrayAsConst('INT_FIELDS', intFields)
  const floatFieldsArr = createArrayAsConst('FLOAT_FIELDS', floatFields)

  // Generate source code
  const allNodes = [
    intFieldsArr,
    floatFieldsArr,
    creationInfo,
    extra,
    trackBase,
    ...makeTrackInterfaces(descriptions, properties),
    track,
    media,
    mediaInfoResult,
  ]
  const file = ts.createSourceFile('DUMMY.ts', '', ts.ScriptTarget.ESNext, false, ts.ScriptKind.TS)
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
  const tsSrc = [
    TOP_COMMENT,
    ...allNodes.map((node) => printer.printNode(ts.EmitHint.Unspecified, node, file)),
  ].join('\n\n')

  // Save generated source
  const buildOutFilename = path.join(BUILD_DIR, FILENAME)
  await fs.writeFile(buildOutFilename, tsSrc)

  // Format sources
  await format(buildOutFilename, outFilename)
}

generate.displayName = 'generate-types'
generate.description = 'Generate MediaInfo result types from XSD'

export default generate
