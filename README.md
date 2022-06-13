# remark-excerpt

> [Remark](https://remark.js.org/) transformer for extracting an excerpt.

This is a [remark](https://remark.js.org/) plugin for transformer for extracting an excerpt, similar to [WordPress's excerpt functionality](https://kinsta.com/knowledgebase/wordpress-excerpt/).

This repo is a fork of [manovotny/remark-excerpt](https://github.com/manovotny/remark-excerpt) that I extended for more
related functionality and better MDX support.

This plugin is tailored for MDX support. In order to use this plugin, the following packages must be installed and
included in the Remark `use` chain:

* [remark-parse](https://www.npmjs.com/package/remark-parse)
* [remark-comment](https://www.npmjs.com/package/remark-comment)
* Some sort of MDX processor, either [remark-mdx](https://github.com/mdx-js/mdx/tree/main/packages/remark-mdx) or
  providing this plugin and others to [mdx-bundler](https://github.com/kentcdodds/mdx-bundler) in the `remarkPlugins`
  option.

## Installation

```bash
# npm
$ npm i @eligundry/remark-excerpt remark-parse remark-comment
# yarn
$ yarn add @eligundry/remark-excerpt remark-parse remark-comment
```

This package is ESM only and I sorta regret it! Life is a learning experience!

## Usage

Say we have the following file, `example.md`:

```
# Title

Paragraph 1.

Paragraph 2.

<!-- excerpt -->

Paragraph 3.

Paragraph 4.
```

And our script, `example.js`, looks as follows:

```javascript
import fs from 'fs'
import { remark } from 'remark'
import remarkParse from 'remark-parse'
import remarkComment from 'remark-comment'
import { excerpt } from '@eligundry/remark-excerpt'

;(async () => {
  const file = await fs.promises.read('example.md')
  const result = await remark()
    .use(remarkParse)
    .use(remarkComment, { ast: true })
    .use(excerpt)
    .process(file)

  console.log(result.toString())
})()
```

Now, running `node example` yields:

```
# Title

Paragraph 1.

Paragraph 2.
```

If you wanted to link to where the excerpt broke off, say for a read more link, you would do the following:

```javascript
import fs from 'fs'
import { remark } from 'remark'
import remarkParse from 'remark-parse'
import remarkComment from 'remark-comment'
import remarkMDX from 'remark-mdx'
import { excerptBreakpoint } from '@eligundry/remark-excerpt'

;(async () => {
  const file = await fs.promises.read('example.md')
  const result = await remark()
    .use(remarkMDX)
    .use(remarkParse)
    .use(remarkComment, { ast: true })
    .use(excerptBreakpoint)
    .process(file)

  console.log(result.toString())
})()
```

This would yield the following:

```
# Title

Paragraph 1.

Paragraph 2.

<span id="read-more" />

Paragraph 3.

Paragraph 4.
```

## API

### `remark().use(excerpt[, options])`

Returns markdown content specified before the excerpt comment.

#### Options

##### `identifier`

Type: `String`
Default: `excerpt`, `more`, `preview`, or `teaser`

Specifies the excerpt comment identifier to look for.

### `remark().use(excerptBreakpoint[, options])`

Inserts a `<span id="read-more" />` tag with MDX. This can be used for deep linking into documents from a read more link
in the preview. If there are multiple `<!-- excerpt -->` comments, this element will be inserted at the last instance.

##### `identifier`

Type: `String`
Default: `excerpt`, `more`, `preview`, or `teaser`

Specifies the excerpt comment identifier to look for.

##### `breakpointID`

Type: `String`
Default: `read-more`

The ID to be applied to the `<span />` element for the breakpoint. Can be helpful if you have multiple breakpoints that
you need to scroll to from various previews.

## License

MIT © [Eli Gundry](https://eligundry.com)
