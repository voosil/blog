---
title: 'Blog coding log'
date: '2025-01-13 21:01'
# banner: /images/tuya-3.png
---

# Markdown 自定义

## Usage

### Block

#### Highlight Block

```markdown
::hb[This is a highlight block]

:::hb{.hb-tip}
This is a highlight block
:::
```

::hb[This is a highlight block]

:::hb{.hb-tip}
This is a tip block
:::

#### Side Note

```markdown
there is a side note:sn[this is first side note] 👉

there is another side note:sn[this is second side note] 👉

there is a margin note 👉 :mn[this is margin note(no number)]
```

there is a side note:sn[this is first side note] 👉

there is another side note:sn[this is second side note] 👉

there is a margin note 👉 :mn[this is margin note(no number)]

### Card

#### Link Previewer

```markdown
::slink{url='https://music.163.com/album?id=142967215&uct2=U2FsdGVkX19Lhf6AStyW9XtzzUVxzzuXSBgTGfM730M='}
```

::slink{url='https://music.163.com/album?id=142967215&uct2=U2FsdGVkX19Lhf6AStyW9XtzzUVxzzuXSBgTGfM730M='}

## 实现

### unified 生态

unified: <https://github.com/unifiedjs/unified>
生态中包括三种形式内容的转换，对应三个开源社区：remark (markdown), rehype (HTML), and retext (natural language)
三种文本内容形式可以相互转换：

```text
| ........................ process ........................... |
| .......... parse ... | ... run ... | ... stringify ..........|

          +--------+                     +----------+
Input ->- | Parser | ->- Syntax Tree ->- | Compiler | ->- Output
          +--------+          |          +----------+
                              X
                              |
                       +--------------+
                       | Transformers |
                       +--------------+
```

### syntax trees

> The syntax trees used in unified are unist nodes. A tree represents a whole document and each node is a plain JavaScript object with a type field. The semantics of nodes and the format of syntax trees is defined by other projects:
>
> - esast — JavaScript
> - hast — HTML
> - mdast — markdown
> - nlcst — natural language
> - xast — XML

### pipline

markdown => remark-parse => mdast => remark-directive+remark-directive-rehype => 解析自定义语法并转换mdast => remark-rehype => mdast to hast => rehype-react => use react to render hast

### Tips

1. preact 不支持Server Component，涉及到有异步请求的组件，需要使用react，或者选择将整个Reader作为客户端组件；
2. Astro 配置 rehype-react 不生效（原因未知，在rehype-react中log未执行），最后选择手动实现，成本并不高。

# Learned

## 1. Rehpye-React "Hast to Component"

在实现side note组件时遇到一个问题：
在hast中只有一对p节点：

```js
const hast = {
  type: 'root',
  children: [
    {
      type: 'element',
      tagName: 'p',
      properties: {},
      children: [
        {
          type: 'text',
          value: 'there is a ',
          position: {
            start: {
              line: 1,
              column: 1,
              offset: 0,
            },
            end: {
              line: 1,
              column: 12,
              offset: 11,
            },
          },
        },
        {
          type: 'element',
          tagName: 'strong',
          properties: {},
          children: [
            {
              type: 'text',
              value: 'side note',
              position: {
                start: {
                  line: 1,
                  column: 14,
                  offset: 13,
                },
                end: {
                  line: 1,
                  column: 23,
                  offset: 22,
                },
              },
            },
          ],
          position: {
            start: {
              line: 1,
              column: 12,
              offset: 11,
            },
            end: {
              line: 1,
              column: 25,
              offset: 24,
            },
          },
        },
        {
          type: 'text',
          value: ' 👉 ',
          position: {
            start: {
              line: 1,
              column: 25,
              offset: 24,
            },
            end: {
              line: 1,
              column: 29,
              offset: 28,
            },
          },
        },
        {
          type: 'element',
          tagName: 'sn',
          properties: {},
          children: [],
          position: {
            start: {
              line: 1,
              column: 29,
              offset: 28,
            },
            end: {
              line: 1,
              column: 32,
              offset: 31,
            },
          },
        },
        {
          type: 'text',
          value: ' fff',
          position: {
            start: {
              line: 1,
              column: 32,
              offset: 31,
            },
            end: {
              line: 1,
              column: 36,
              offset: 35,
            },
          },
        },
      ],
      position: {
        start: {
          line: 1,
          column: 1,
          offset: 0,
        },
        end: {
          line: 1,
          column: 36,
          offset: 35,
        },
      },
    },
  ],
  position: {
    start: {
      line: 1,
      column: 1,
      offset: 0,
    },
    end: {
      line: 1,
      column: 36,
      offset: 35,
    },
  },
};
```

但是渲染结果为：

```html
<p>
  there is a
  <strong>side note</strong>
</p>
<aside class="sidenote"><span class="sidenote-number-override">14</span></aside>
👉 fff
<p></p>
```

这就导致无法行内使用sidenote，问了GPT，他给出的答案是：

> HTML 的规范要求，`<p>` 标签不能包含块级元素。
> 如果 rehype-react 检测到某些节点（如 `<aside>`）可能是块级元素，就会将它从父 `<p>` 中分离开。
> 这导致 `<aside>` 被提升到 `<p>` 外部，同时 `<p>` 会被关闭，而后续的内容（如 👉 fff）又被放入一个新的 `<p>` 中。

具体的还要结合remark-directive的语法，有块级元素，也有内联元素，在设计实现组件的时候需要考虑组件的使用场景、需要支持的功能。

## 2. OpenGraph Protocol

::slink{url="https://ogp.me/"}

[**Link Previewer**](#link-previewer) 依赖OpenGraph Protocol进行实现，结合解析插件OGS：<https://github.com/jshemas/openGraphScraper>

插件使用上也遇到一点问题，以B站的链接为例，我直接拷贝了header但是总会拿到验证码页面数据，但直接fetch没有问题，插件支持`html`字段直接用fetch的返回结果，有空再定位问题原因。

## 3. Astro

最终用到的：

1. Markdown Collections： Markdown File loader
2. Routing：file system based routing
3. SSR
4. Multi-framework integration（React）
5. Performance Optimize（Code Spliting / Island）
6. View Transitions

跟直接用Nextjs感觉没差，只是Astro上手要简单点（Markdonw Loader 和 Plugin 配置简单），然后相对轻量。

### deploy（Github Pages）

::slink{url="https://docs.astro.build/en/guides/deploy/github/"}

然后就是关于base路径的配置，按照[文档所述](https://docs.astro.build/en/guides/deploy/github/#base)，按理应该处理所有 `<a>` `<img>` 等的路径，但是只替换了 js&css的路径。

索性手动替换了，后续有空看看什么原因。

### 4. Font Subset

（还没做）
中文字体太大了，通过 unicode-range + 三方工具将字体集拆分为多个子集，按需使用。

  1. <https://github.com/qincore/font-subset>
  2. <https://the-sustainable.dev/a-guide-to-subsetting-fonts/>
  3. <https://tie.pub/blog/font-subset/>

# "Unexpected"

## 随机颜色

我本来打算在首页做个滤镜+随机渐变色的效果，预期每次刷新页面会有不同的色彩表现，等到部署完成后，发现刷新没有更新颜色才反应过来是SSR。还是有比较强的客户端渲染的惯性思维，而且在本地开发的时候每次保存都会刷新页面，产生不同的色彩效果，让这种思维惯性更强了。
不过刚好创造一个我觉得更有价值的效果：每次应用更新（功能/内容）会有不同的色彩表现——这个表现可以传达应用以及内容更新了信息，不需要手动做任何额外的UI变更，而且，比起每次刷新就变更色彩，有时间跨度的改变更有惊喜感。

# TODO

## Feature

- [ ] 1. ALL Posts & 每个Nav下的所有Posts
- [ ] 2. 专栏相关功能
- [ ] 3. Label/Tags
- [ ] 4. 支持夜晚模式
- [ ] 5. 设计、更换favicon
- [ ] 6. 添加og-meta

## Optimize

- [ ] 1. font-subset
- [ ] 2. 图片优化
- [ ] 3. Better Responsive Design
