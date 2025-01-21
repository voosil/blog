import fs from 'fs';
import path from 'path';

import { minifyFont } from './utils/slice-font';
import { updateCSS } from './utils/update-css';

import type { FontSubsetOptions } from './types';

const __dirname = path.resolve();

/**
 * 递归获取目录下的所有文件路径
 * @param dirPath
 * @param arrayOfFiles
 * @returns
 */
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

/**
 * Get unicode range
 * @param dirPath
 * @returns
 */
function getUnicodeRange(dirPath: string) {
  const files = getAllFiles(dirPath);
  const uniqueCharsSet = new Set<string>();

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8');
    for (const char of content) {
      uniqueCharsSet.add(char);
    }
  });

  const unicodeRange = Array.from(uniqueCharsSet).map((char) =>
    char.charCodeAt(0),
  );

  return unicodeRange;
}

export async function generateSubsetFont({
  publicDir,
  targetFolder,
  fontFile,
  output,
}: FontSubsetOptions) {
  const unicodeRange = getUnicodeRange(path.resolve(__dirname, targetFolder));
  console.log('font slicing...');

  const fontBufferMinified = await minifyFont(
    path.resolve(__dirname, fontFile),
    unicodeRange,
    'woff2',
  );

  console.log('font sliced');

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const fontName = fontFile.split('/').pop()!.split('.')[0]!;
  const fontSubsetName = fontName + '-subset';
  const fontFamily = fontSubsetName + '.woff2';
  fs.writeFileSync(path.resolve(output.font, fontFamily), fontBufferMinified);

  updateCSS(publicDir, output, fontName, fontFamily, unicodeRange);

  console.log('font subset pipeline done');
}
