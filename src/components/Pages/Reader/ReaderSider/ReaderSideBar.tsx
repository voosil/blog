import type { MetadataHeading } from '@/types/astro';
import { url } from '@/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/UI/Popover';

import { MarkdownMenu } from '../MarkdownMenu';

export interface ReaderSideBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  headings: MetadataHeading[];
}

export function ReaderSideBar({ headings }: ReaderSideBarProps) {
  return (
    <div className='fixed w-[35%] top-1/2 -translate-y-1/2 -right-[calc(35%-2rem)] hover:right-0 transition-all duration-700 ease-in-out'>
      <div className='flex justify-between'>
        <img src={url('/icons/menu.svg')} className='w-8' />
        <div className='mr-4'>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <img src={url('/icons/column.svg')} className='w-6' />
              </TooltipTrigger>
              <TooltipContent
                side='top'
                className='font-mono border-none bg-[#cb525a] rounded-none text-zinc-100 mb-2'
              >
                专栏
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className='w-full bg-[#cb525a] bg-opacity-75 backdrop-blur-md text-zinc-100 px-8 py-8 max-h-[50vh] overflow-y-auto'>
        <MarkdownMenu headings={headings} />
      </div>
    </div>
  );
}
