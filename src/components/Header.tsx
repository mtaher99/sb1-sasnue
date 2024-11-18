import React from 'react';
import { Clock } from 'lucide-react';
import { Logo } from './Logo';

export function Header() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 py-3 px-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Clock className="w-4 h-4" />
          <time className="text-sm font-medium" dir="ltr">
            {time.toLocaleTimeString()}
          </time>
        </div>
      </div>
    </header>
  );
}