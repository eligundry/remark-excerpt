import fs from 'fs'
import path from 'path'
import { wrap } from 'jest-snapshot-serializer-raw'
import { remark } from 'remark'
import remarkParse from 'remark-parse'
import remarkComment from 'remark-comment'
import { excerpt, ExcerptOptions } from '../index'

describe('excerpt', () => {
  const processFixture = async (name: string, options?: ExcerptOptions) => {
    const p = path.join(__dirname, 'fixtures', name)
    const file = await fs.promises.readFile(p)
    const result = await remark()
      .use(remarkParse)
      // @ts-ignore
      .use(remarkComment, { ast: true })
      .use(excerpt, options)
      .process(file)

    return result.toString()
  }

  test('should return unmodified document when no excerpt exists', async () => {
    const result = await processFixture('no-excerpt.md')

    expect(wrap(result)).toMatchSnapshot()
  })

  test('should return excerpt using "exceprt" identifier', async () => {
    const result = await processFixture('excerpt.md')

    expect(wrap(result)).toMatchSnapshot()
  })

  test('should return excerpt using "more" identifier', async () => {
    const result = await processFixture('more.md')

    expect(wrap(result)).toMatchSnapshot()
  })

  test('should return excerpt using "preview" identifier', async () => {
    const result = await processFixture('preview.md')

    expect(wrap(result)).toMatchSnapshot()
  })

  test('should return excerpt using "teaser" identifier', async () => {
    const result = await processFixture('teaser.md')

    expect(wrap(result)).toMatchSnapshot()
  })

  test('should return excerpt using custom identifier', async () => {
    const options = {
      identifier: 'custom',
    }
    const result = await processFixture('custom.md', options)

    expect(wrap(result)).toMatchSnapshot()
  })

  test('should return after excerpt when multiple exist', async () => {
    const result = await processFixture('multiple.md')

    expect(wrap(result)).toMatchSnapshot()
  })

  test('should handle identifier with dashes', async () => {
    const result = await processFixture('custom-with-dashes.md', {
      identifier: 'custom-with--dashes',
    })

    expect(wrap(result)).toMatchSnapshot()
  })

  test('should handle identifier with spaces', async () => {
    const result = await processFixture('custom-with-spaces.md', {
      identifier: 'custom with spaces',
    })

    expect(wrap(result)).toMatchSnapshot()
  })

  test('should handle no spacing in exceprt comment', async () => {
    const result = await processFixture('no-space-in-comment.md')

    expect(wrap(result)).toMatchSnapshot()
  })

  test('should handle mdx', async () => {
    const result = await processFixture('mdx.mdx')

    expect(wrap(result)).toMatchSnapshot()
  })
})
