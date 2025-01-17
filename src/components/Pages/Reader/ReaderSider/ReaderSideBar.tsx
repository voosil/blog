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
    <div className='fixed h-screen flex items-center -right-[calc(50%-2rem)] top-0 w-[50%] hover:right-0 transition-all duration-700 ease-in-out'>
      <div className='w-full'>
        <div className='flex justify-between'>
          <img src={url('/icons/menu.svg')} className='w-8' />
          <div className='mr-4'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <img src={url('/icons/column.svg')} className='w-6' />
                </TooltipTrigger>
                <TooltipContent
                  side='top'
                  className='font-mono border-none bg-white'
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
    </div>
  );
}
