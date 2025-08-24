'use client';

import type { AutoformatRule } from '@platejs/autoformat';
import {
  autoformatArrow,
  autoformatLegal,
  autoformatLegalHtml,
  autoformatMath,
  AutoformatPlugin,
  autoformatPunctuation,
  autoformatSmartQuotes,
} from '@platejs/autoformat';
import { insertEmptyCodeBlock } from '@platejs/code-block';
import { insertLink } from '@platejs/link';
import { toggleList } from '@platejs/list';
import { KEYS } from 'platejs';

const autoformatMarks: AutoformatRule[] = [
  {
    match: '***',
    mode: 'mark',
    type: [KEYS.bold, KEYS.italic],
  },
  {
    match: '__*',
    mode: 'mark',
    type: [KEYS.underline, KEYS.italic],
  },
  {
    match: '__**',
    mode: 'mark',
    type: [KEYS.underline, KEYS.bold],
  },
  {
    match: '___***',
    mode: 'mark',
    type: [KEYS.underline, KEYS.bold, KEYS.italic],
  },
  {
    match: '**',
    mode: 'mark',
    type: KEYS.bold,
  },
  {
    match: '__',
    mode: 'mark',
    type: KEYS.underline,
  },
  {
    match: '*',
    mode: 'mark',
    type: KEYS.italic,
  },
  {
    match: '_',
    mode: 'mark',
    type: KEYS.italic,
  },
  {
    match: '~~',
    mode: 'mark',
    type: KEYS.strikethrough,
  },
  {
    match: '^',
    mode: 'mark',
    type: KEYS.sup,
  },
  {
    match: '~',
    mode: 'mark',
    type: KEYS.sub,
  },
  {
    match: '==',
    mode: 'mark',
    type: KEYS.highlight,
  },
  {
    match: '≡',
    mode: 'mark',
    type: KEYS.highlight,
  },
  {
    match: '`',
    mode: 'mark',
    type: KEYS.code,
  },
];
// 마크다운 링크 형식을 처리하는 규칙
const autoformatLinks: AutoformatRule[] = [
  {
    match: ')',
    mode: 'text',
    insertTrigger: true,
    format: (editor) => {
      const block = editor.api.block();
      if (!block) {
        return;
      }

      //insertTrigger 이후 실행되도록 비동기 처리
      Promise.resolve().then(() => {
        const text = editor.api.string(block[1]);

        const linkMatch = text.match(/\[([^\]]+)\]\(([^)]+)\)$/);

        if (linkMatch && linkMatch.length >= 3) {
          const [markdownText, text, url] = linkMatch;

          for (let i = 0; i < markdownText.length; i++) {
            editor.tf.deleteBackward('character');
          }

          insertLink(editor, {
            url,
            text: text,
          });

          editor.tf.insertText(' ');
        }
      });
    },
  },
];

const autoformatBlocks: AutoformatRule[] = [
  {
    match: '# ',
    mode: 'block',
    type: KEYS.h1,
  },
  {
    match: '## ',
    mode: 'block',
    type: KEYS.h2,
  },
  {
    match: '### ',
    mode: 'block',
    type: KEYS.h3,
  },
  {
    match: '#### ',
    mode: 'block',
    type: KEYS.h4,
  },
  {
    match: '##### ',
    mode: 'block',
    type: KEYS.h5,
  },
  {
    match: '###### ',
    mode: 'block',
    type: KEYS.h6,
  },
  {
    match: '> ',
    mode: 'block',
    type: KEYS.blockquote,
  },
  {
    match: '```',
    mode: 'block',
    type: KEYS.codeBlock,
    format: (editor) => {
      insertEmptyCodeBlock(editor, {
        defaultType: KEYS.p,
        insertNodesOptions: { select: true },
      });
    },
  },
  // {
  //   match: '+ ',
  //   mode: 'block',
  //   preFormat: openNextToggles,
  //   type: KEYS.toggle,
  // },
  {
    match: ['---', '—-', '___ '],
    mode: 'block',
    type: KEYS.hr,
    format: (editor) => {
      editor.tf.setNodes({ type: KEYS.hr });
      editor.tf.insertNodes({
        children: [{ text: '' }],
        type: KEYS.p,
      });
    },
  },
];

const autoformatLists: AutoformatRule[] = [
  {
    match: ['* ', '- '],
    mode: 'block',
    type: 'list',
    format: (editor) => {
      toggleList(editor, {
        listStyleType: KEYS.ul,
      });
    },
  },
  {
    match: [String.raw`^\d+\.$ `, String.raw`^\d+\)$ `],
    matchByRegex: true,
    mode: 'block',
    type: 'list',
    format: (editor, { matchString }) => {
      toggleList(editor, {
        listRestartPolite: Number(matchString) || 1,
        listStyleType: KEYS.ol,
      });
    },
  },
  {
    match: ['[]'],
    mode: 'block',
    type: 'list',
    format: (editor) => {
      toggleList(editor, {
        listStyleType: KEYS.listTodo,
      });
      editor.tf.setNodes({
        checked: false,
        listStyleType: KEYS.listTodo,
      });
    },
  },
  {
    match: ['[x]'],
    mode: 'block',
    type: 'list',
    format: (editor) => {
      toggleList(editor, {
        listStyleType: KEYS.listTodo,
      });
      editor.tf.setNodes({
        checked: true,
        listStyleType: KEYS.listTodo,
      });
    },
  },
];

export const AutoformatKit = [
  AutoformatPlugin.configure({
    options: {
      enableUndoOnDelete: true,
      rules: [
        ...autoformatBlocks,
        ...autoformatMarks,
        ...autoformatSmartQuotes,
        ...autoformatPunctuation,
        ...autoformatLegal,
        ...autoformatLegalHtml,
        ...autoformatArrow,
        ...autoformatMath,
        ...autoformatLists,
        ...autoformatLinks,
      ].map(
        (rule): AutoformatRule => ({
          ...rule,
          query: (editor) =>
            !editor.api.some({
              match: { type: editor.getType(KEYS.codeBlock) },
            }),
        }),
      ),
    },
  }),
];
