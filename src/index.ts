/**
 * Template de plugin sabaki — pattern canonique : cross-encoder MiniLM
 * avec poids ONNX bundlés (`models/<nom>-fp32`), mêmes conventions que
 * `@sabaki-js/phishing-detection`.
 *
 * 1. Entraînez (voir `gpu/train_generalist.py`), exportez
 *    (`gpu/export_generalist.py`) dans `models/<nom>-fp32/`
 *    (`generalist.onnx` + `tokenizer/` + `config.json`).
 * 2. Renseignez `manifest.json` (questions, keywords, `languages` si le
 *    domaine est partagé avec un autre plugin).
 * 3. `npm run build && npm test`, tag, release.
 *
 * Alternative : Head mini (encodeur + Linear, `logits_<question>`) via
 * `loadMini(modelDir)` — voir `@sabaki-js/mail` (`models/<wf>-int8/`).
 * Alternative légère : nano TF-IDF via `nanoClassifier` — voir `train.py`.
 */
import {
	definePlugin,
	loadGeneralist,
	type GeneralistInput,
	type SabakiPlugin,
} from "sabaki";
import type { ClassifyOutput, PluginManifest } from "sabaki";
import manifestData from "./manifest.json" with { type: "json" };
import path from "node:path";
import { fileURLToPath } from "node:url";

const manifest = manifestData as PluginManifest;
// TODO: votre question et options par défaut.
const QUESTION = (manifest.primary ?? manifest.questions[0]) as string;
const OPTIONS = ["yes", "no"]; // TODO: vos options.

/** Dossier des poids embarqués (aucun téléchargement requis). */
export const modelDir = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
	"models",
	// TODO: nommez votre dossier (ex `mon-domaine-fp32`).
	"TODO-fp32",
);

export function defineClassifier(
	modelDirOverride?: string,
): SabakiPlugin & {
	classifyAsync: (input: GeneralistInput) => Promise<ClassifyOutput>;
} {
	const classifyAsync = async (
		input: GeneralistInput,
	): Promise<ClassifyOutput> => {
		const dir = modelDirOverride ?? process.env.SABAKI_MODEL_DIR ?? modelDir;
		const r = await loadGeneralist(dir).decide({
			...input,
			question: input.question ?? QUESTION,
			options:
				input.options && input.options.length >= 2
					? input.options
					: OPTIONS,
		});
		return { ...r, domain: manifest.domain };
	};
	return {
		...definePlugin({ manifest, classify: classifyAsync }),
		classifyAsync,
	};
}

const plugin: SabakiPlugin = {
	manifest,
	classify: (input) =>
		defineClassifier().classifyAsync(input as GeneralistInput),
};
export default plugin;
