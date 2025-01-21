import fs from 'fs';

import { Font, FontEditor, woff2 } from 'fonteditor-core';

export async function minifyFont(
  fontFile: string,
  range: number[],
): Promise<NodeJS.ArrayBufferView> {
  await woff2.init('../../../node_modules/fonteditor-core/woff2/woff2.wasm');

  const fontBuffer = fs.readFileSync(fontFile);
  const font = Font.create(fontBuffer, {
    type: fontFile.split('.').pop() as FontEditor.FontType,
    subset: range,
    hinting: false,
    compound2simple: false,
    combinePath: false,
  });
  const fontBufferMinified = font.write({
    type: 'woff2',
  });

  return fontBufferMinified as NodeJS.ArrayBufferView;
}
