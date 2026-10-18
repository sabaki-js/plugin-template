<img src="https://raw.githubusercontent.com/sabaki-js/sabaki/main/assets/logo.svg" width="120" alt="sabaki logo" />

# @sabaki-js/plugin-template

[![npm](https://img.shields.io/npm/v/%40sabaki-js%2Fplugin-template)](https://www.npmjs.com/package/%40sabaki-js%2Fplugin-template) [![license](https://img.shields.io/npm/l/%40sabaki-js%2Fplugin-template)](https://github.com/sabaki-js/plugin-template#readme) [![CI](https://github.com/sabaki-js/plugin-template/actions/workflows/test-battery.yml/badge.svg)](https://github.com/sabaki-js/plugin-template/actions)

Starter template for a sabaki plugin.

Three patterns: `definePlugin` (ad-hoc), `nanoClassifier` (TF-IDF), `miniClassifier` (ONNX). Click Use this template.

## Bundled mini weights (no download needed)

Ship ONNX weights inside the package so it works offline:

1. Put the files in `models/<workflow>-int8/` (`<workflow>_int8.onnx`, `<workflow>_int8.onnx.data` if any, `<workflow>.json`, `model.json`, `tokenizer.json`).
2. Export the dir from `src/index.ts`:
   ```ts
   import path from "node:path";
   import { fileURLToPath } from "node:url";
   export const modelDir = path.join(
     path.dirname(fileURLToPath(import.meta.url)),
     "..", "models", "<workflow>-int8",
   );
   ```
3. Add `"models"` to `package.json` `files`.
4. Callers pass it explicitly: `miniClassifier(manifest, wf, { modelDir })` (falls back to HF download when absent).

## Publish

```sh
npm version patch && npm run publish-package  # tags v* -> CI publishes to npm
```

Part of [sabaki](https://github.com/sabaki-js/sabaki) - see the [GUIDE](https://github.com/sabaki-js/sabaki/blob/main/GUIDE.md).

## License

MIT
