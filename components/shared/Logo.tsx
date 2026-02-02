import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo = ({ className, size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-lg tracking-[0.15em]',
    md: 'text-2xl tracking-[0.2em]',
    lg: 'text-4xl tracking-[0.25em]',
    xl: 'text-6xl tracking-[0.3em]',
  };

  return (
    <div className={cn("flex items-center font-black select-none", sizeClasses[size], className)}>
      <span className="text-[#BA0101]">E</span>
      <span className="text-gray-900 dark:text-white ml-[0.3em]">X</span>
      <span className="text-gray-900 dark:text-white ml-[0.3em]">A</span>
    </div>
  );
};

export default Logo;
