import * as ReactRuntime from 'react/jsx-runtime';
import { unified } from 'unified';
import remarkBreaks from 'remark-breaks';
import remarkEmoji from 'remark-emoji';
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import rehypeReact from 'rehype-react';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeHighlightCodeLines from 'rehype-highlight-code-lines';

import { customCompSyntaxConfig } from '@/components/Markdown/config';

import type { CollectionEntry } from 'astro:content';

import '@/styles/markdown/rebirth.scss';
import '@/styles/markdown/rebirth-override.scss';
import '@/styles/markdown/code-block-polyfill.scss';
import '@/styles/markdown/panda-syntax-dark.min.css';
import '@/styles/markdown/markdown.scss';

const markdownProcessor = (markdown: string) => {
  try {
    return unified()
      .use(remarkParse)
      .use(remarkBreaks)
      .use(remarkEmoji)
      .use(remarkGfm)
      .use(remarkSmartypants)
      .use(remarkDirective)
      .use(remarkDirectiveRehype)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeSlug)
      .use(rehypeHighlight)
      .use(rehypeHighlightCodeLines, {
        showLineNumbers: true,
        lineContainerTagName: 'span',
      })
      .use(rehypeAutolinkHeadings)
      .use(rehypeReact, {
        passNode: true,
        Fragment: ReactRuntime.Fragment,
        jsx: ReactRuntime.jsx,
        jsxs: ReactRuntime.jsxs,
        components: customCompSyntaxConfig,
      })
      .processSync(markdown);
  } catch (error) {
    console.error('Error processing Markdown:', error);
    return null;
  }
};

export function MarkdownReader({ post }: { post: CollectionEntry<'posts'> }) {
  const res = markdownProcessor(post.body ?? '');

  return (
    <article id='reader' className='mt-16 relative'>
      <div className='absolute h-full bg-[#f5f4f0] w-full bg-opacity-95 backdrop-blur-md'></div>
      <div className='relative p-8 pb-32'>
        {res?.result ?? 'Sorry, something wrong...'}
      </div>
    </article>
  );
}
