'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

export interface GridBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  gridSize?: number;
  gridColor?: string;
  darkGridColor?: string;
  showFade?: boolean;
  fadeIntensity?: number;
  children?: React.ReactNode;
}

export const GridBackground = ({
  className,
  children,
  gridSize = 20,
  gridColor = '#e4e4e7',
  darkGridColor = '#262626',
  showFade = true,
  fadeIntensity = 20,
  ...props
}: GridBackgroundProps) => {
  const [currentGridColor, setCurrentGridColor] = useState(gridColor);

  useEffect(() => {
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDarkModeActive =
      document.documentElement.classList.contains('dark') || prefersDarkMode;
    setCurrentGridColor(isDarkModeActive ? darkGridColor : gridColor);

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.attributeName === 'class') {
          const updatedIsDarkModeActive =
            document.documentElement.classList.contains('dark');
          setCurrentGridColor(
            updatedIsDarkModeActive ? darkGridColor : gridColor,
          );
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return function () {
      return observer.disconnect();
    };
  }, [gridColor, darkGridColor]);

  return (
    <div
      className={cn(
        'absolute flex min-h-screen w-screen items-center justify-center bg-white dark:bg-black',
        className,
      )}
      {...props}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundSize: gridSize + 'px ' + gridSize + 'px',
          backgroundImage:
            'linear-gradient(to right, ' +
            currentGridColor +
            ' 1px, transparent 1px), ' +
            'linear-gradient(to bottom, ' +
            currentGridColor +
            ' 1px, transparent 1px)',
        }}
      />

      {showFade && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white dark:bg-black"
          style={{
            maskImage:
              'radial-gradient(ellipse at center, transparent ' +
              fadeIntensity +
              '%, black)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, transparent ' +
              fadeIntensity +
              '%, black)',
          }}
        />
      )}

      <div className="relative z-20 min-h-screen w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default GridBackground;
