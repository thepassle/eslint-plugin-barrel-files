import { join, parse } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname } from "node:path";
import { readFile, readdir } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgJson = JSON.parse(await readFile(join(__dirname, "./package.json")));

const rules = {};
const filenames = await readdir(`${__dirname}/lib/rules`);
for (const filename of filenames) {
  const rule = (
    await import(pathToFileURL(`${__dirname}/lib/rules/${filename}`))
  ).default;

  const ruleName = parse(filename).name;
  rules[ruleName] = rule;
}

const plugin = {
  meta: {
    name: pkgJson.name,
    version: pkgJson.version,
  },
  processors: {},
  rules,
  configs: {},
};

// assign configs here so we can reference `plugin`
Object.assign(plugin.configs, {
  recommended: {
    plugins: {
      'barrel-files': plugin,
    },
    rules: {
      'barrel-files/avoid-importing-barrel-files': 'error',
      'barrel-files/avoid-barrel-files': 'error',
      'barrel-files/avoid-namespace-import': 'error',
      'barrel-files/avoid-re-export-all': 'error',
    },
  },
});

export default plugin;