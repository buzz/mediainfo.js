import ts from 'typescript'

export const exportModifier = ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)
export const readonlyModifier = ts.factory.createModifier(ts.SyntaxKind.ReadonlyKeyword)
const questionToken = ts.factory.createToken(ts.SyntaxKind.QuestionToken)

export function createProperty(
  name: string,
  typeName: string,
  opts: { array?: boolean; required?: boolean; readonly?: boolean } = {}
) {
  const defaultOpts = { array: false, required: false, readonly: true }
  const mergedOpts = { ...defaultOpts, ...opts }
  const refNode = ts.factory.createTypeReferenceNode(typeName)
  return ts.factory.createPropertySignature(
    mergedOpts.readonly ? [readonlyModifier] : undefined,
    name,
    mergedOpts.required ? undefined : questionToken,
    mergedOpts.array ? ts.factory.createArrayTypeNode(refNode) : refNode
  )
}

export function createInterface(
  name: string,
  members: readonly ts.TypeElement[],
  extendsInterface?: string,
  modifiers: readonly ts.ModifierLike[] = [exportModifier]
) {
  return ts.factory.createInterfaceDeclaration(
    modifiers,
    name,
    undefined,
    extendsInterface
      ? [
          ts.factory.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
            ts.factory.createExpressionWithTypeArguments(
              ts.factory.createIdentifier(extendsInterface),
              []
            ),
          ]),
        ]
      : undefined,
    members
  )
}

export function createArrayAsConst(name: string, elements: string[]) {
  return ts.factory.createVariableStatement(
    [exportModifier],
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          ts.factory.createIdentifier(name),
          undefined,
          undefined,
          ts.factory.createAsExpression(
            ts.factory.createArrayLiteralExpression(
              elements.map((e) => ts.factory.createStringLiteral(e))
            ),
            ts.factory.createTypeReferenceNode('const')
          )
        ),
      ],
      ts.NodeFlags.Const
    )
  )
}
