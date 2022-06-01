import visit from 'unist-util-visit'
import type { RootNode, Node } from '@handbook/remark-node-types'

const defaultIdentifiers = ['excerpt', 'more', 'preview', 'teaser']

export interface ExcerptOptions {
  identifiers?: string[]
}

export const excerpt = ({
  identifiers = defaultIdentifiers,
}: ExcerptOptions = {}) => (tree: RootNode) => {
  let excerptIndex = -1

  visit(tree, 'comment', (node: Node, idx: number) => {
    const { commentValue } = node

    if (
      typeof commentValue === 'string' &&
      !!commentValue &&
      identifiers.some((e) => commentValue.trim() === e)
    ) {
      excerptIndex = idx
    }
  })

  if (excerptIndex > -1) {
    tree.children.splice(excerptIndex)
  }
}

export interface ExcerptBreakpointOptions {
  breakpointID?: string
  identifiers?: string[]
}

export const excerptBreakpoint = ({
  breakpointID = 'read-more',
  identifiers = defaultIdentifiers,
}: ExcerptBreakpointOptions = {}) => (tree: RootNode) => {
  let excerptIndex = -1

  visit(tree, 'comment', (node: Node, idx: number) => {
    const { commentValue } = node

    if (
      typeof commentValue === 'string' &&
      !!commentValue &&
      identifiers.some((e) => commentValue.trim() === e)
    ) {
      excerptIndex = idx
    }
  })

  if (excerptIndex > -1) {
    tree.children.splice(excerptIndex, 1, {
      type: 'mdxJsxTextElement',
      name: 'span',
      attributes: [
        {
          type: 'mdxJsxAttribute',
          name: 'id',
          value: breakpointID,
        },
      ],
      children: [],
      data: { _mdxExplicitJsx: true },
    })
  }
}

export default excerpt
