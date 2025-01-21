export interface FontSubsetOptions {
  /** build output path 用于作为其他文件的base dir*/
  publicDir: string;
  /** 需要子集化的文件夹路径 */
  targetFolder: string;
  /** 需要子集化的字体文件 */
  fontFile: string;
  /** output folder */
  output: FontSubsetOutput;
}

export interface FontSubsetOutput {
  font: string;
  css: string;
}
