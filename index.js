const visit = require('unist-util-visit');

const isComment = new RegExp('<!--(.*?)-->');
const getComment = new RegExp('<!--([\\s\\S]*?)-->');

const excerpt = (options = {}) => {
    const transformer = (tree) => {
        const excerpts =
            options.identifier && options.identifier.length
                ? [options.identifier]
                : ['excerpt', 'more', 'preview', 'teaser'];

        let excerptIndex = -1;

        visit(tree, 'html', (node) => {
            if (excerptIndex === -1 && isComment.test(node.value)) {
                const comment = getComment.exec(node.value);

                if (comment) {
                    const text = comment[1].trim();

                    if (excerpts.includes(text)) {
                        excerptIndex = tree.children.indexOf(node);
                    }
                }
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
const excerptBreakpoint = (options = {}) => {
    return (tree) => {
        const excerpts =
            options.identifier && options.identifier.length
                ? [options.identifier]
                : ['excerpt', 'more', 'preview', 'teaser'];

        let excerptIndex = -1;

        visit(tree, 'comment', (node, idx) => {
            if (node.commentValue && excerpts.some((e) => node.commentValue.trim() === e)) {
                excerptIndex = idx;
            }
        });

        if (excerptIndex > -1) {
            tree.children[excerptIndex] = {
                type: 'mdxJsxTextElement',
                name: 'span',
                attributes: [
                    {
                        type: 'mdxJsxAttribute',
                        name: 'id',
                        value: 'read-more'
                    }
                ],
                children: [],
                data: {_mdxExplicitJsx: true}
            };
        }
    };
};

module.exports = {excerpt, excerptBreakpoint};
