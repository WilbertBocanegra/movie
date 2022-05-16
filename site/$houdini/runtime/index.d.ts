import { GraphQLTagResult } from './types';
export * from './network';
export * from './types';
export * from './proxy';
export * from './config';
export { query, routeQuery, componentQuery } from './query';
export { mutation } from './mutation';
export { fragment } from './fragment';
export { subscription } from './subscription';
export { paginatedQuery, paginatedFragment } from './pagination';
export declare function graphql(str: TemplateStringsArray): GraphQLTagResult;
