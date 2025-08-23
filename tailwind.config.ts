import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  theme: {
    extend: {
      boxShadow: {
        '1': '0px 1px 2px 0px #0000004d, 0px 1px 3px 1px #00000026',
        '2': '0px 1px 2px 0px #0000004d, 0px 2px 6px 2px #00000026',
        '3': '0px 1px 3px 0px #0000004d, 0px 4px 8px 3px #00000026',
        '4': '0px 1px 5px 0px #0000004d, 0px 5px 20px 6px #00000026',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, addComponents, addUtilities }) {
      addVariant('firefox', '@supports (-moz-appearance: none)');
      addVariant(
        'chrome',
        '@supports (-webkit-appearance: none) and (not (-moz-appearance: none))',
      );
      addVariant(
        'safari',
        '@media not all and (min-resolution: 0.001dpcm) and (-webkit-min-device-pixel-ratio: 0)',
      );
      addVariant('retina', '@media (min-resolution: 2dppx)');
      addVariant('hdpi', '@media (min-resolution: 192dpi)');
      addVariant('touch', '@media (pointer: coarse)');
      addVariant('no-touch', '@media (pointer: fine)');
      addComponents({
        '.clip-100': {
          clipPath: 'circle(farthest-side at 100%)',
        },
        '.clip-50': {
          clipPath: 'circle(farthest-side at 50% 100%)',
        },
        '.mun-card': {
          position: 'relative',
          borderRadius: '12px',
          transition:
            'opacity 0.15s ease-out, top 0.2s cubic-bezier(0.345,0.115,0.135,1.42), bottom 0.15s ease-out, left 0.2s cubic-bezier(0.345,0.115,0.135,1.42), right 0.15s ease-out',

          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '3px',
            opacity: '0',
            boxShadow: '0px 1px 3px 0px #0000004d, 0px 4px 8px 3px #00000026',
            zIndex: '-1',
            transition: 'inherit',
            borderRadius: '18px',
            padding: '5px',
          },

          '&:hover': {
            '&::before': {
              opacity: '1',
              inset: '-8px',
            },
          },
        },
      });
      addUtilities({
        '.scroll-thin': {
          scrollbarWidth: 'thin',
        },
        '.writing-mode-vertical-lr': {
          writingMode: 'vertical-lr',
        },
        '.writing-mode-vertical-rl': {
          writingMode: 'vertical-rl',
        },
      });
    }),
  ],
} satisfies Config;
