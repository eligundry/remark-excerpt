const visit = require('unist-util-visit');

const defaultIdentifiers = ['excerpt', 'more', 'preview', 'teaser'];

/**
 * @type {import('unified').Plugin}
 */
const excerpt = ({identifiers = defaultIdentifiers} = {}) => {
    const transformer = (tree) => {
        let excerptIndex = -1;

        visit(tree, 'comment', (node, idx) => {
            if (node.commentValue && identifiers.some((e) => node.commentValue.trim() === e)) {
                excerptIndex = idx;
            }
        });

        if (excerptIndex > -1) {
            tree.children.splice(excerptIndex);
        }
    };

    return transformer;
};

/**
 * @type {import('unified').Plugin}
 */
const excerptBreakpoint = ({breakpointID = 'read-more', identifiers = defaultIdentifiers} = {}) => {
    return (tree) => {
        let excerptIndex = -1;

        visit(tree, 'comment', (node, idx) => {
            if (node.commentValue && identifiers.some((e) => node.commentValue.trim() === e)) {
                excerptIndex = idx;
            }
        });

        if (excerptIndex > -1) {
            tree.children.splice(excerptIndex, 1, {
                type: 'mdxJsxTextElement',
                name: 'span',
                attributes: [
                    {
                        type: 'mdxJsxAttribute',
                        name: 'id',
                        value: breakpointID
                    }
                ],
                children: [],
                data: {_mdxExplicitJsx: true}
            });
        }
    };
};

module.exports = {excerpt, excerptBreakpoint};
