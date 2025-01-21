import fs from 'fs';
import path from 'path';

import * as cheerio from 'cheerio';

function toUnicode(codes: number[]) {
  return codes.map((code) => `U+${code.toString(16).toUpperCase()}`);
}

export function updateCSS(
  distRoot: string,
  outputPath: string,
  fontName: string,
  fontFamily: string,
  range: number[],
) {
  const outputRelativePath = path.relative(distRoot, outputPath);

  const css =
    `<style>@font-face{font-family: "${fontName}";font-style: normal;` +
    `src: url('/blog/${outputRelativePath}/${fontFamily}') format('woff2');` +
    `unicode-range: ${toUnicode(range).join(',')};}</style>\n`;

  const indexHtmlPath = path.resolve(__dirname, distRoot, './index.html');
  const html = fs.readFileSync(indexHtmlPath, 'utf-8');

  const $ = cheerio.load(html);
  $('head').append(css);
  fs.writeFileSync(indexHtmlPath, $.html());
}
