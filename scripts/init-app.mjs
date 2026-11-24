#!/usr/bin/env node
/**
 * Renames the template for a new prototype.
 * Usage: npm run init-app            (asks questions)
 *        npm run init-app -- --name "Req Finder" --description "…" --owner "jane-doe"
 */
import { readFile, writeFile } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { stdin, stdout, argv } from "node:process";

const args = Object.fromEntries(
  argv.slice(2).reduce((acc, cur, i, all) => (cur.startsWith("--") ? [...acc, [cur.slice(2), all[i + 1]]] : acc), []),
);

const rl = createInterface({ input: stdin, output: stdout });
const ask = async (key, question, fallback) => args[key] ?? ((await rl.question(`${question} (${fallback}): `)).trim() || fallback);

const title = await ask("name", "App name", "My Prototype");
const description = await ask("description", "One-line description", "An Otto prototype.");
const owner = await ask("owner", "Owner (GitHub username or team)", "your-team");
rl.close();

const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function edit(file, fn) {
  try {
    await writeFile(file, fn(await readFile(file, "utf8")));
    console.log(`  updated ${file}`);
  } catch {
    console.log(`  skipped ${file} (not found)`);
  }
}

console.log(`\nSetting up "${title}" (${slug})`);

await edit("package.json", (s) => {
  const pkg = JSON.parse(s);
  pkg.name = slug;
  pkg.description = description;
  pkg.version = "0.1.0";
  return JSON.stringify(pkg, null, 2) + "\n";
});

await edit("index.html", (s) =>
  s.replace(/<title>.*<\/title>/, `<title>${title}</title>`).replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${description}"`),
);

await edit("catalog-info.yaml", (s) =>
  s
    .replace(/name: .*/, `name: ${slug}`)
    .replace(/title: .*/, `title: ${title}`)
    .replace(/description: .*/, `description: ${description}`)
    .replace(/project-slug: .*/, `project-slug: ${owner}/${slug}`)
    .replace(/owner: .*/, `owner: ${owner}`),
);

await edit("README.md", (s) => {
  const rest = s.slice(s.indexOf("## What's inside"));
  return `# ${title}\n\n${description}\n\nOwner: ${owner}\n\nBuilt from Otto.\n\n${rest}`;
});

await edit("src/app/pages/HomePage.tsx", (s) => s.replace('title="Otto"', `title="${title.replace(/"/g, "&quot;")}"`));

console.log("\nDone. Next: replace src/data/sample.ts with your scenario and run `npm run dev`.");
