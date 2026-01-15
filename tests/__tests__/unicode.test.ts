import { analyzeFile, expectToBeDefined, fixturePath } from '../utils.ts'

const filePath = fixturePath('sample.mkv')

it('should return unicode data', async () => {
  const result = await analyzeFile(filePath, { full: true })
  expectToBeDefined(result.media)

  const { track } = result.media
  const [track0] = track
  expect(track0.Title).toBe(
    'Dès Noël où un zéphyr haï me vêt de glaçons würmiens je dîne ' +
      'd’exquis rôtis de bœuf au kir à l’aÿ d’âge mûr & cætera !'
  )
})
