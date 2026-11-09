import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import products from "../src/data/products.json" with { type: "json" };
import { selectFeaturedProducts } from "../src/lib/featured-products.ts";

// Exercita a home real com configurações distintas e restaura a seleção editorial.
const config = new URL("../src/config/home.ts", import.meta.url);
const original = readFileSync(config, "utf8");
const eligible = selectFeaturedProducts(
  products,
  products.map((product) => product.id),
);
if (eligible.length < 2)
  throw new Error("A matriz de navegador precisa de dois produtos elegíveis.");
const [first, second] = eligible;
const scenarios = [
  { name: "vazia", ids: [] },
  { name: "única", ids: [first.id] },
  { name: "inválidos e repetidos", ids: ["__produto_inexistente__", first.id, first.id] },
  { name: "dois produtos em ordem invertida", ids: [second.id, first.id] },
];
let fixture;

try {
  for (const scenario of scenarios) {
    fixture = `export const featuredProductIds: readonly string[] = ${JSON.stringify(scenario.ids)};\n`;
    writeFileSync(config, fixture);
    process.stdout.write(`\nValidando seleção ${scenario.name}\n`);
    const args = ["node_modules/@playwright/test/cli.js", "test"];
    if (scenario.ids.length < 2 || scenario.name === "inválidos e repetidos") {
      args.push("--grep", "zero produtos");
    }
    const result = spawnSync(process.execPath, args, { stdio: "inherit" });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(`Falhou a seleção ${scenario.name}.`);
    if (readFileSync(config, "utf8") !== fixture) {
      throw new Error("A configuração foi editada durante os testes; a edição será preservada.");
    }
  }
} finally {
  if (readFileSync(config, "utf8") === fixture) writeFileSync(config, original);
}
