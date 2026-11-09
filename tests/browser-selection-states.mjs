import { spawnSync } from "node:child_process";
import products from "../src/data/products.json" with { type: "json" };
import { selectFeaturedProducts } from "../src/lib/featured-products.ts";

// Exercita a home real sem modificar arquivos do repositório.
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
for (const scenario of scenarios) {
  process.stdout.write(`\nValidando seleção ${scenario.name}\n`);
  const args = ["node_modules/@playwright/test/cli.js", "test"];
  if (scenario.ids.length < 2 || scenario.name === "inválidos e repetidos") {
    args.push("--grep", "zero produtos");
  }
  const result = spawnSync(process.execPath, args, {
    stdio: "inherit",
    env: { ...process.env, FEATURED_PRODUCT_IDS: scenario.ids.join(",") },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Falhou a seleção ${scenario.name}.`);
}
