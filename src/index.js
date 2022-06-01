"use strict";
exports.__esModule = true;
exports.excerptBreakpoint = exports.excerpt = void 0;
var unist_util_visit_1 = require("unist-util-visit");
var defaultIdentifiers = ['excerpt', 'more', 'preview', 'teaser'];
var excerpt = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.identifier, identifier = _c === void 0 ? defaultIdentifiers : _c;
    return function (tree) {
        var identifiers = Array.isArray(identifier) ? identifier : [identifier];
        var excerptIndex = -1;
        (0, unist_util_visit_1.visit)(tree, 'comment', function (node, idx) {
            var commentValue = node.commentValue;
            if (typeof commentValue === 'string' &&
                !!commentValue &&
                identifiers.some(function (e) { return commentValue.trim() === e; })) {
                excerptIndex = idx;
            }
        });
        if (excerptIndex > -1) {
            tree.children.splice(excerptIndex);
        }
    };
};
exports.excerpt = excerpt;
var excerptBreakpoint = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.breakpointID, breakpointID = _c === void 0 ? 'read-more' : _c, _d = _b.identifier, identifier = _d === void 0 ? defaultIdentifiers : _d;
    return function (tree) {
        var identifiers = Array.isArray(identifier) ? identifier : [identifier];
        var excerptIndex = -1;
        (0, unist_util_visit_1.visit)(tree, 'comment', function (node, idx) {
            var commentValue = node.commentValue;
            if (typeof commentValue === 'string' &&
                !!commentValue &&
                identifiers.some(function (e) { return commentValue.trim() === e; })) {
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
                    },
                ],
                children: [],
                data: { _mdxExplicitJsx: true }
            });
        }
    };
};
exports.excerptBreakpoint = excerptBreakpoint;
exports["default"] = exports.excerpt;
