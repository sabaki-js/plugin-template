// PLUGIN TEMPLATE - à copier dans src/index.ts de chaque plugin après `npm install sabaki`.
import type { ClassifyOutput, SabakiInput, SabakiPlugin } from "sabaki";
import manifestData from "./manifest.json" with { type: "json" };
import type { PluginManifest } from "sabaki";

const manifest = manifestData as PluginManifest;

function classify(_input: SabakiInput): ClassifyOutput {
  // TODO: remplacer par le classifieur entraîné du domaine.
  return { decision: manifest.domain, confidence: 0.5, domain: manifest.domain };
}

const plugin: SabakiPlugin = { manifest, classify };
export default plugin;
