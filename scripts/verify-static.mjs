import { access, readFile, readdir } from "node:fs/promises";

const requiredFiles = [
  "site/index.html",
  "site/favicon.png",
  "site/media/sementinha-biblia.webp",
  "site/media/sementinha-cama.webp",
  "site/media/sementinha-feliz.webp",
  "site/media/sementinha-orando.webp",
  "site/media/sementinha-seed.webp",
  "site/media/sementinha-triste-sentado.webp",
  "site/media/sementinha-triste.webp"
];

await Promise.all(requiredFiles.map((file) => access(file)));

const assets = await readdir("site/assets");
const javascript = assets.find((file) => /^index-.*\.js$/.test(file));
const stylesheet = assets.find((file) => /^index-.*\.css$/.test(file));
const font = assets.find((file) => file.endsWith(".woff2"));

if (!javascript || !stylesheet || !font) {
  throw new Error("Os arquivos compilados do site estão incompletos.");
}

const html = await readFile("site/index.html", "utf8");
if (!html.includes(`/assets/${javascript}`) || !html.includes(`/assets/${stylesheet}`)) {
  throw new Error("Os arquivos principais do site não estão referenciados corretamente.");
}

const [javascriptCode, cssCode] = await Promise.all([
  readFile(`site/assets/${javascript}`, "utf8"),
  readFile(`site/assets/${stylesheet}`, "utf8"),
]);

for (const expectedText of [
  "Desafio da Sementinha",
  "Toda tela planta",
  "Seu filho pode ser pequeno demais",
  "Conhecer o aplicativo Sementinha",
]) {
  if (!javascriptCode.includes(expectedText)) {
    throw new Error(`Conteúdo obrigatório ausente: ${expectedText}`);
  }
}

for (const expectedStyle of [".quiz-demo", ".hero-mobile-scene", ".learning-ticker"]) {
  if (!cssCode.includes(expectedStyle)) {
    throw new Error(`Regra responsiva obrigatória ausente: ${expectedStyle}`);
  }
}

console.log("Site Sementinha pré-compilado e validado para publicação.");
