import fs from 'fs/promises'
import { join } from 'path'

import ts from 'typescript'

import { BUILD_DIR, SRC_DIR } from '../constants'
import { format } from '../utils'

import {
  createArrayAsConst,
  createInterface,
  createProperty,
  exportModifier,
  readonlyModifier,
} from './factories'
import parseXsd from './parseXsd'

const topComment = '// DO NOT EDIT! File generated using `generate-types` script.'
const filename = 'MediaInfoType.ts'
const outFilename = join(SRC_DIR, filename)

async function generate() {
  // Parse XSD
  const { nodes, intFields, floatFields } = await parseXsd()

  // CreationType
  const ICreationType = createInterface('CreationType', [
    createProperty('version', 'string', { required: true }),
    createProperty('url', 'string'),
    createProperty('build_date', 'string'),
    createProperty('build_time', 'string'),
    createProperty('compiler_ident', 'string'),
  ])

  // ExtraType
  const ExtraType = ts.factory.createTypeAliasDeclaration(
    [exportModifier],
    ts.factory.createIdentifier('ExtraType'),
    undefined,
    ts.factory.createTypeReferenceNode(ts.factory.createIdentifier('Record'), [
      ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
      ts.factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword),
    ])
  )

  // Field types
  const intFieldsArr = createArrayAsConst('INT_FIELDS', intFields)
  const floatFieldsArr = createArrayAsConst('FLOAT_FIELDS', floatFields)

  // TrackType
  const ITrackType = createInterface('TrackType', [
    ts.addSyntheticLeadingComment(
      ts.factory.createPropertySignature(
        [readonlyModifier],
        "'@type'",
        undefined,
        ts.factory.createUnionTypeNode(
          ['General', 'Video', 'Audio', 'Text', 'Image', 'Chapters', 'Menu', 'Other'].map((t) =>
            ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral(t))
          )
        )
      ),

      ts.SyntaxKind.MultiLineCommentTrivia,
      '* Documents the type of encoded media with the track, ie: General, Video, Audio, Text, Image, etc. ',
      true
    ),
    ts.addSyntheticLeadingComment(
      createProperty("'@typeorder'", 'string', { required: false }),
      ts.SyntaxKind.MultiLineCommentTrivia,
      '* If there is more than one track of the same type (i.e. four audio tracks) this attribute will number them according to storage order within the bitstream. ',
      true
    ),
    ...nodes, // Take long attribute list from MediaInfo XSD
  ])

  // MediaType
  const IMediaType = createInterface('MediaType', [
    createProperty("'@ref'", 'string', { required: true }),
    createProperty('track', 'TrackType', { array: true, required: true }),
  ])

  // MediaInfoType
  const IMediaInfo = createInterface('MediaInfoType', [
    createProperty('creatingApplication', 'CreationType'),
    createProperty('creatingLibrary', 'CreationType'),
    createProperty('media', 'MediaType'),
  ])

  // Generate source
  const allNodes = [
    intFieldsArr,
    floatFieldsArr,
    ICreationType,
    ExtraType,
    ITrackType,
    IMediaType,
    IMediaInfo,
  ]
  const file = ts.createSourceFile('DUMMY.ts', '', ts.ScriptTarget.ESNext, false, ts.ScriptKind.TS)
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
  const tsSrc = [
    topComment,
    ...allNodes.map((node) => printer.printNode(ts.EmitHint.Unspecified, node, file)),
  ].join('\n\n')

  // Save generated source
  const buildOutFilename = join(BUILD_DIR, filename)
  await fs.writeFile(buildOutFilename, tsSrc)

  // Format sources
  await format(buildOutFilename, outFilename)
}

generate.displayName = 'generate-types'
generate.description = 'Generate MediaInfo result types from XSD'

export default generate
