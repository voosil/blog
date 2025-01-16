import { useEffect, useState } from 'react';

import { format } from 'date-fns';

import { cn } from '@repo/utils/lib';

import { getRandomHue } from '@/utils';

import { Header } from './Nav';

import type { CollectionEntry } from 'astro:content';

import './home-page.css';

type PostsCollection = CollectionEntry<'posts'>[];

export interface HomePageProps {
  posts: PostsCollection;
}

function getLatestPost(posts: CollectionEntry<'posts'>[], len: number) {
  return posts
    .sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
    )
    .slice(0, len);
}

export function HomePage({ posts }: HomePageProps) {
  const [targetPosts, setTargetPosts] = useState<PostsCollection | null>(null);
  const randomHue = getRandomHue({ max: 180 });
  const latestPosts = getLatestPost(posts, 3);

  const onNavigate = async ({ path }) => {
    const targetPosts = posts.filter((post) => post.id.startsWith(path));
    setTargetPosts(targetPosts);
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight });
    }, 500);
  }, []);

  return (
    <>
      <div className='w-full h-full flex justify-center items-center'>
        <img
          className='fixed w-[90%] h-[90%] rounded-2xl shadow-xl'
          src='/images/tuya.png'
        />
      </div>
      <div className='w-full h-full relative z-99 p-[5%] bg-gradient-to-br from-[var(--maskBgColor1)] from-0% via-[var(--maskBgColor2)] via-50% to-[var(--maskBgColor3)] to-100%'>
        <div className='flex h-full'>
          <div className='ml-32 flex flex-col justify-between mb-16'>
            <div
              className={cn(
                'relative space-y-6 transition-all linear duration-500',
                targetPosts
                  ? 'top-0 translate-y-0 mt-16'
                  : '-translate-y-[50%] top-1/2',
              )}
            >
              <div className='flex gap-16 text-2xl text-white'>
                <Header onNavigate={onNavigate} />
              </div>
              <div className='bg-slate-200 bg-opacity-50 rounded-sm text-sm p-2 text-zinc-800 space-y-2'>
                {latestPosts.map(({ id, data }) => {
                  return (
                    <a
                      className='flex justify-between w-full px-1 py-px text-zinc-200 hover:bg-[var(--maskBgColor3)] transition-colors ease duration-300'
                      href={`/post/${id}`}
                    >
                      <span>{data.title}</span>
                      <span>{format(data.date, 'eeee MM-dd')}</span>
                    </a>
                  );
                })}
              </div>
              <div className='flex gap-6 p-2'>
                <div className='w-6'>
                  <a href='https://github.com/voosil'>
                    <img src='/icons/github.svg' alt='github' />
                  </a>
                </div>
                <div className='w-6'>
                  <a href='https://space.bilibili.com/8497020'>
                    <img src='/icons/bilibili.svg' alt='bilibili' />
                  </a>
                </div>
              </div>
            </div>
            <div className='mt-32 max-h-[50%] text-zinc-100 overflow-y-auto'>
              {targetPosts && (
                <>
                  {targetPosts.length ? (
                    <div className='space-y-2'>
                      {targetPosts.map(
                        ({ id, data: { title, date } }, index) => {
                          const randomColor = `${Math.min(360, randomHue + index * 20)},70%,90%`;

                          return (
                            <a
                              className='post-list-item'
                              style={{
                                color: `hsla(${randomColor})`,
                                borderColor: `hsla(${randomColor})`,
                                animationDelay: `${Math.random() * 1.5}s`,
                              }}
                              key={id}
                              href={`/post/${id}`}
                            >
                              <span>{new Date(date).toLocaleDateString()}</span>
                              <span>{title}</span>
                            </a>
                          );
                        },
                      )}
                    </div>
                  ) : (
                    <span>Nothing to say</span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='absolute bottom-0 right-0 text-white text-sm'>
          © 2025 by Voosil
        </div>
      </div>
    </>
  );
}
