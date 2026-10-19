import test from "node:test";
import assert from "node:assert/strict";
import plugin, { modelDir } from "./index.js";

test("manifest minimal", () => {
	assert.ok(typeof plugin.manifest.domain === "string" && plugin.manifest.domain.length > 0);
	assert.ok(plugin.manifest.questions.length > 0);
});

test("modelDir configuré", () => {
	assert.ok(typeof modelDir === "string" && modelDir.endsWith("fp32"));
});
