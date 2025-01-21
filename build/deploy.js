import path from 'path';

import { generateSubsetFont } from '../packages/font-subset/lib';

function main() {
  try {
    generateSubsetFont({
      distRoot: path.resolve(__dirname, '../dist'),
      targetFolder: './post',
      fontFile: './fonts/Huiwen-mincho-Regular.ttf',
      output: path.resolve(__dirname, '../dist/fonts'),
    });
  } catch (e) {
    console.error(e);
  }
}

main();
