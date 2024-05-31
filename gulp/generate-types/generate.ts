import fs from 'node:fs/promises'
import path from 'node:path'

import ts from 'typescript'

import { BUILD_DIR, SRC_DIR, TRACK_TYPES } from '../constants.ts'
import { format } from '../utils.ts'
import getFields, { type TrackFields } from './data/getFields.ts'
import {
  createArrayAsConst,
  createInterface,
  createProperty,
  exportModifier,
  readonlyModifier,
} from './factories.ts'

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

function wrapWithComment(node: ts.PropertySignature, comment: string) {
  return ts.addSyntheticLeadingComment(
    node,
    ts.SyntaxKind.MultiLineCommentTrivia,
    `* ${comment} `,
    true
  )
}

function makeBaseTrack(fields: TrackFields) {
  return createInterface('BaseTrack', [
    wrapWithComment(
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
      'Documents the type of encoded media with the track, ie: ' +
        'General, Video, Audio, Text, Image, etc.'
    ),
    wrapWithComment(
      createProperty("'@typeorder'", 'string'),
      'If there is more than one track of the same type (i.e. four audio tracks) this ' +
        'attribute will number them according to storage order within the bitstream.'
    ),
    wrapWithComment(
      createProperty('extra', 'Extra'),
      'Holds (untyped) extra information if available'
    ),
    ...makeTrackMembers(fields),
  ])
}

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

function makeTrackMembers(fields: TrackFields) {
  const members: ts.TypeElement[] = []

  for (const [propertyName, field] of Object.entries(fields)) {
    const tsPropertyName = propertyName.includes('-') ? `'${propertyName}'` : propertyName
    const property = createProperty(tsPropertyName, field.type)

    // Add `@internal` tag
    if (field.description?.includes('This is mostly for internal use')) {
      field.description = field.description.replace('This is mostly for internal use', '@internal')
    }

    // Add `@group` tag
    if (field.group) {
      field.description = `${field.description} @group ${field.group}`
    }

    members.push(field.description ? wrapWithComment(property, field.description) : property)
  }

  return members
}

function makeTrackInterfaces(trackTypes: Record<string, TrackFields>) {
  return Object.entries(trackTypes).map(([trackType, fields]) => {
    const members = makeTrackMembers(fields)

    const typeProperty = ts.factory.createPropertySignature(
      [readonlyModifier],
      "'@type'",
      undefined,
      ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral(trackType))
    )

    return createInterface(`${trackType}Track`, [typeProperty, ...members], 'BaseTrack')
  })
}

async function generate() {
  const [trackTypes, intFields, floatFields] = await getFields()

  const { Base: baseTrackFields, ...otherTrackTypes } = trackTypes

  // Generate source code
  const allNodes = [
    createArrayAsConst('INT_FIELDS', intFields),
    createArrayAsConst('FLOAT_FIELDS', floatFields),
    creationInfo,
    extra,
    makeBaseTrack(baseTrackFields),
    ...makeTrackInterfaces(otherTrackTypes),
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
