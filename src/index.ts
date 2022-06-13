import { visit } from 'unist-util-visit'
import type { RootNode, Node } from '@handbook/remark-node-types'

const defaultIdentifiers = ['excerpt', 'more', 'preview', 'teaser']

export interface ExcerptOptions {
  identifier?: string[] | string
}

export const excerpt =
  ({ identifier = defaultIdentifiers }: ExcerptOptions = {}) =>
  (tree: RootNode) => {
    const identifiers = Array.isArray(identifier) ? identifier : [identifier]
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
  identifier?: string[] | string
}

export const excerptBreakpoint =
  ({
    breakpointID = 'read-more',
    identifier = defaultIdentifiers,
  }: ExcerptBreakpointOptions = {}) =>
  (tree: RootNode) => {
    const identifiers = Array.isArray(identifier) ? identifier : [identifier]
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
