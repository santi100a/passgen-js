import caxa from "caxa";
import ts from "typescript";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

function tsCompile(source, options = null) {
    // Default options -- you could also perform a merge, or use the project tsconfig.json
    if (null === options) {
        options = { compilerOptions: { module: ts.ModuleKind.CommonJS }};
    }
    return ts.transpileModule(source, options).outputText;
}

// Make sure it works
const source = readFileSync('./index.ts', 'utf8');
const readConfig = readFileSync('./tsconfig.json', 'utf-8');
const configFile = readConfig.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? "" : m);

let result = tsCompile(source, JSON.parse(configFile));
writeFileSync('index.js', Buffer.from(result.replace('Object.defineProperty(exports, "__esModule", { value: true });', '')), 'utf8');


(async () => {
  await caxa({
    input: ".",
    output: "dist/passgen.exe",
    command: [
      "{{caxa}}/node_modules/.bin/node",
      "{{caxa}}/index.js",
    ],
  });
})();