import type { RootNode } from '@handbook/remark-node-types';
export interface ExcerptOptions {
    identifier?: string[] | string;
}
export declare const excerpt: ({ identifier }?: ExcerptOptions) => (tree: RootNode) => void;
export interface ExcerptBreakpointOptions {
    breakpointID?: string;
    identifier?: string[] | string;
}
export declare const excerptBreakpoint: ({ breakpointID, identifier, }?: ExcerptBreakpointOptions) => (tree: RootNode) => void;
export default excerpt;
