# remark-excerpt

> [Remark](https://remark.js.org/) transformer for extracting an excerpt.

This is a [remark](https://remark.js.org/) plugin for transformer for extracting an excerpt, similar to [WordPress's excerpt functionality](https://kinsta.com/knowledgebase/wordpress-excerpt/).

This repo is a fork of [manovotny/remark-excerpt](https://github.com/manovotny/remark-excerpt) that I extended for more
related functionality.

## Installation

### NPM

```
$ npm i remark-excerpt
```

### Yarn

```
$ yarn add remark-excerpt
```

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
import fs from 'fs';
import remark from 'remark';
import { excerpt } from 'remark-excerpt';

(async () => {
    const file = await fs.promises.read('example.md');
    const result = await remark()
        .use(excerpt)
        .process(file);

    console.log(result.toString());
})();
```

Now, running `node example` yields:

```
# Title

Paragraph 1.

Paragraph 2.
```

If you wanted to link to where the excerpt broke off, say for a read more link, you would do the following:

```javascript
import fs from 'fs';
import remark from 'remark';
import { excerptBreakpoint } from 'remark-excerpt';

(async () => {
    const file = await fs.promises.read('example.md');
    const result = await remark()
        .use(excerptBreakpoint)
        .process(file);

    console.log(result.toString());
})();
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

## License

MIT © [Eli Gundry](https://eligundry.com)
