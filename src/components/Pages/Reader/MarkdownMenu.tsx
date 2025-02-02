import { cn } from '@/utils';
import type { MetadataHeading } from '@/types/astro';

/**
 * 获取heading分组
 * @param headings
 */
function getHeadingGroups(headings: MetadataHeading[]) {
  const groups: MetadataHeading[][] = [];
  let currentGroup: MetadataHeading[] = [];
  let currentDepth = 0;
  for (const heading of headings) {
    if (heading.depth >= currentDepth) {
      currentGroup.push(heading);
      currentDepth = heading.depth;
    } else {
      groups.push(currentGroup);
      currentGroup = [heading];
      currentDepth = heading.depth;
    }
  }

  groups.push(currentGroup);
  return groups;
}

export function MarkdownMenu({ headings }: { headings: MetadataHeading[] }) {
  const headingGroups = getHeadingGroups(headings);
  const minDepth = Math.min(...headings.map((heading) => heading.depth));

  if (!headings.length) {
    return <>No Headings</>;
  }

  return (
    <div className='flex flex-col gap-2'>
      {headingGroups.map((group, index) => (
        <div key={index} className='flex flex-col gap-1'>
          {group.map((heading, index) => {
            const relativeDepth = heading.depth - minDepth;

            return (
              <a
                key={index}
                href={`#${heading.slug}`}
                className={cn(
                  'text-lg hover:text-zinc-800 dark:text py-1 transition-colors ease-linear',
                  !relativeDepth && 'font-bold',
                )}
                style={{ paddingLeft: `${relativeDepth * 16}px` }}
              >
                {heading.text}
              </a>
            );
          })}
        </div>
      ))}
    </div>
  );
}
