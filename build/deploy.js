import path from 'path';

import { generateSubsetFont } from '../packages/font-subset/lib';

function main() {
  try {
    generateSubsetFont({
      publicDir: path.resolve(__dirname, '../public'),
      targetFolder: path.resolve(__dirname, '../data/posts'),
      fontFile: path.resolve(
        __dirname,
        '../public/fonts/Huiwen-mincho-Regular.ttf',
      ),
      output: {
        font: path.resolve(__dirname, '../public/fonts'),
        css: path.resolve(__dirname, '../public/styles/font-prod.css'),
      },
    });
  } catch (e) {
    console.error(e);
  }
}

main();
