// Root re-export shim — short relative import:
//
//   import plugin from "./mon-plugin/index.js";
//
// (Node ESM does not resolve bare directory paths, even with
// package.json "main"/"exports", so this file bridges the gap.)
export { default } from "./dist/index.js";
export * from "./dist/index.js";
