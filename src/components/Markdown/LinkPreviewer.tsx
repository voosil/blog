import ogs from 'open-graph-scraper';

import type { OgObject } from 'open-graph-scraper/types';

const fetchData = async (url: string, timeout = 2500) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        priority: 'u=0, i',
        'sec-ch-ua':
          '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      signal: controller.signal,
    });
    return res;
  } catch (err) {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
};

export interface NormalizedOgObject {
  title: string;
  url: string;
  imageUrl: string;
  desc: string;
}
export function ogDataNormalizer(
  $: OgObject,
  $url: string,
): Partial<NormalizedOgObject> {
  const title = $.ogTitle ?? $.dcTitle ?? $.twitterTitle;
  const url = $.ogUrl ?? $url;
  const imageUrl = $.ogImage ?? $.twitterImage;
  const desc = $.ogDescription ?? $.dcDescription ?? $.twitterDescription;

  return { title, url, imageUrl: imageUrl?.[0].url, desc };
}

export async function getOgData(url: string) {
  if (!url) return null;

  const res = await fetchData(url);
  if (!res) return null;

  const html = await res.text();
  const data = await ogs({ html });
  return ogDataNormalizer(data.result, url);
}

export function FallbackLinkPreviewer({ url }: { url: string }) {
  return (
    <div className='p-2 bg-zinc-50 italic'>
      <a href={url} target='_blank'>
        {url}
      </a>
    </div>
  );
}

export interface LinkPreviewerProps {
  data: Partial<NormalizedOgObject>;
}

export function LinkPreviewer({ data: $ }: LinkPreviewerProps) {
  return (
    <a
      href={$.url}
      target='_blank'
      className='link-previewer bg-[#e0e5cb] flex gap-2 p-4 my-8 rounded-md shadow-md space-x-1 hover:shadow-lg hover:bg-[var(--maskBgColor1)] transition-all ease-in'
    >
      {$.imageUrl && (
        <img
          src={$.imageUrl}
          className='max-h-20 max-w-20 object-cover rounded-md'
          referrerPolicy='no-referrer'
        />
      )}
      <div className='underline-init'>
        <div className='text-lg font-bold'>{$.title}</div>
        <div className='text-sm font-light underline pb-2'>{$.url}</div>
        <div className='text-sm line-clamp-2'>{$.desc}</div>
      </div>
    </a>
  );
}

export async function LinkPreviewerSSRComponent({ url }: { url: string }) {
  const ogData = await getOgData(url);

  if (!ogData) return <FallbackLinkPreviewer url={url} />;
  return <LinkPreviewer data={ogData} />;
}
