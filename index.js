require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");

async function main() {
  const readmeTemplate = (
    await fs.readFile(path.join(process.cwd(), "./README.template.md"))
  ).toString("utf-8");

  const office_quote = await (
    await fetch("https://goquotes-api.herokuapp.com/api/v1/random?count=1")
  ).json();

  console.log(office_quote);

  const readme = readmeTemplate
    .replace("{office_quote}", office_quote.quotes[0].text)
    .replace("{office_character}", `- ${office_quote.quotes[0].author}`);

  await fs.writeFile("README.md", readme);
}

main();
