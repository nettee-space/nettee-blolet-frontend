'use client';

import { BlockPlaceholderPlugin } from 'platejs/react';

export const BlockPlaceholderKit = [
  BlockPlaceholderPlugin.configure({
    options: {
      className:
        'before:absolute before:cursor-text before:text-muted-foreground/80 before:content-[attr(placeholder)]',

      query: ({ path }) => {
        return path.length === 1;
      },
    },
  }),
];
