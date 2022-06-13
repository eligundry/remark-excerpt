// eslint-disable no-console
import fs from 'fs'
import { remark } from 'remark'
import remarkParse from 'remark-parse'
import remarkComment from 'remark-comment'
import remarkMDX from 'remark-mdx'
import { excerpt, excerptBreakpoint } from '@eligundry/remark-excerpt'

const main = async () => {
  const file = await fs.promises.readFile('./example/example.md')
  const excerptResult = await remark()
    .use(remarkParse)
    .use(remarkComment, { ast: true })
    .use(excerpt)
    .process(file)

  const breakpointResult = await remark()
    .use(remarkMDX)
    .use(remarkParse)
    .use(remarkComment, { ast: true })
    .use(excerptBreakpoint)
    .process(file)

  console.log('excerpt\n\n', excerptResult.toString())
  console.log('breakpoint\n\n', breakpointResult.toString())
}

main()
