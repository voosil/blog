import { useState } from 'react';

import { cn } from '@/utils';

export const nav = [
  { name: '生活记录', path: 'life-log' },
  { name: '思考片段', path: 'love-wisdom' },
  { name: 'Code & Tech', path: 'code-tech' },
  { name: '关于我', path: 'about-me' },
];

export interface HeaderProps {
  onNavigate?: ({ path }: { path: string }) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const [path, setPath] = useState('');
  const handleRoute = (path: string) => {
    setPath(path);
    onNavigate && onNavigate({ path });
  };

  return (
    <>
      {nav.map(({ name, path: navPath }) => {
        return (
          <div
            className={cn(
              'p-2 rounded-sm hover:bg-zinc-900 hover:bg-opacity-80 transition-all ease-linear cursor-pointer',
              path === navPath ? 'bg-zinc-900 bg-opacity-80' : '',
            )}
            onClick={() => handleRoute(navPath)}
            key={navPath}
          >
            {name}
          </div>
        );
      })}
    </>
  );
}
