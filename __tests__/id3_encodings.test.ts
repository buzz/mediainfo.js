import path from 'path'

const FILEPATH = path.resolve(__dirname, 'fixtures', 'char_enc_tags.mp3')

// https://github.com/buzz/mediainfo.js/issues/150
it('should parse id3 tags with different encodings (#150)', async () => {
  expect.assertions(5)

  const result = await analyzeFile(FILEPATH)
  if (!result.media) throw new Error()
  const { track } = result.media
  expect(track[0]['@type']).toBe('General')
  expect(track[0]['Title']).toBe('utf-8 Ã£â‚¬Æ’𐍈')
  expect(track[0]['Performer']).toBe('latin-1 Ã£â¬Æ')
  expect(track[0]['Album']).toBe('utf-16 Ã£â‚¬Æ’𐍈')
  expect(track[0]['Genre']).toBe('utf-16be Ã£â‚¬Æ’𐍈')
})
