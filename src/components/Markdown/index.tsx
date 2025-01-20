import React from 'react';

import { cn } from '@/utils';

/**
 * 有编号的侧边栏笔记和代码块
 * :::sn :::
 */
let id = 1;
export function SideNote({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className='sidenote-label-override'>{id}</span>
      <span className='sidenote'>
        <span className='sidenote-number-override'>{id++}</span>
        {children}
      </span>
    </>
  );
}

/**
 * 有编号的侧边栏笔记和代码块
 * :::mn :::
 */
export function MarginNote({ children }: { children: React.ReactNode }) {
  return <span className='marginnote'>{children}</span>;
}

interface HighlightBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * 高亮块
 * :::hb :::
 */
export function HighlightBlock({
  children,
  className,
  ...props
}: HighlightBlockProps) {
  return (
    <div
      className={cn(
        'bg-[#cb525a] px-8 py-6 border-4 border-zinc-100 border-double border-spacing-4 my-4 text-zinc-100 shadow-md rounded-md highlight-block ',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
