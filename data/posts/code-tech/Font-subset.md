---
title: "Font Subset"
date: "2025-01-21 16:58"
---
## 基本思路（步骤）

1. 获取所有需要子集化的字符；
2. 根据字符集，生成字体文件和对应css；
3. 实现dev & production 无感知切换;

::hb[<https://github.com/voosil/blog/tree/main/packages/font-subset>]

### 1. 获取所有需要子集化的字符

由于我只需要将post渲染为本地字体，所以遍历data/posts获取所有文件路径并读取即可。递归遍历或者使用三方库（glob）都行。然后获取Unicode编码。

支持多个文件入口更好，我这里只实现了单个入口。

### 2. 根据字符集，生成字体文件和对应css

参考：<https://github.com/qincore/font-subset/blob/master/src/utils/silceFont.ts>

### 3. 实现dev & production 无感知切换

简单来说就是要解决怎么加载生成的css：在dev环境怎么加载，在production环境怎么加载。

做法是将字体加载的样式单独放到css文件中，在两个环境下分别加载对应的样式文件：`font-dev.css` vs `font-prod.css`，font-prod.css由font-subset构建脚本自动生成，根据环境上下文来确定加载哪个样式文件。

为了方便引入，将生成的字体文件和样式文件都放到public下。

```astro
---
const isDev = import.meta.env.MODE === 'development';
---
<link
  rel='stylesheet'
  href={isDev ? url('/styles/font-dev.css') : url('/styles/font-prod.css')}
/>

```

## 走的弯路

### insert css into index.html

第一次尝试是先编译然后再执行脚本将样式插入index.html（我以为是类似React的index.html）。Astro 默认采用的是 SSG 模式，index.html 只是主页入口，post页面在post文件夹下。

## 优化&fix

1. 兼容 woff
2. 兼容 otf
3. 继续拆分字体文件：根据字符集范围拆分，比如0-255拆分为0-127和128-255，这样生成的字体文件可以更小。
4. 缓存更新：目前生成的字体文件名称一样，没有hash，都会命中缓存。
根据Unicode算hash：

```ts
const hash = crypto
  .createHash('md5')
  // 排序保证位置变化不影响结果
  .update(unicodeRange.sort((a, b) => a - b).join(''))
  .digest('hex')
  .slice(0, 8);
const fontSubsetName = `${fontName}-subset_${hash}`;
```

这样，字符集变化可以拉取新字体文件，如果没有变化就直接使用缓存。
