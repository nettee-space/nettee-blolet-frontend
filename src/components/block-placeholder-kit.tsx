'use client';

import { KEYS } from 'platejs';
import { BlockPlaceholderPlugin } from 'platejs/react';

export const BlockPlaceholderKit = [
  BlockPlaceholderPlugin.configure({
    options: {
      className:
        'before:absolute before:cursor-text before:text-muted-foreground/80 before:content-[attr(placeholder)] placeholder-multiline text-[18px]',
      placeholders: {
        [KEYS.p]: '초기 상태에 텍스트를 입력해 주세요. \n 입력하여 명령어를 사용할 수 있습니다.',
      },
      query: ({ path }) => {
        return path.length === 1;
      },
    },
  }),
];
