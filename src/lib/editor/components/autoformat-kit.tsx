'use client';

import type { AutoformatRule } from '@platejs/autoformat';
import { insertLink } from '@platejs/link';
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
import { toggleList } from '@platejs/list';
import { KEYS, RangeApi } from 'platejs';

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
// todo 링크 마크다운 커스텀
// export const autoformatLinks: AutoformatRule[] = [
//   {
//     mode: 'text',
//     match: [')'], // ')' 입력 시 format 실행
//     format: (editor) => {
//       const block = editor.api.block();
//       const text = block?.[0]?.children[0]?.text as string;

//       // [텍스트](URL) 패턴 감지
//       const linkMatch = text.match(/\[([^\]]+)\]\(([^)]+)/);

//       if (!block?.[0]?.children[0]?.text.length) {
//         console.log('변경 안됨');
//         return;
//       }

//       if (linkMatch && linkMatch.length >= 3) {
//         editor.api.block()[0].children[0].text = '';
//         insertLink(editor, {
//           url: linkMatch?.[2] || '',
//           text: linkMatch?.[1] || '',
//         });
//       } else {
//         editor.api.block()[0].children[0].text = text + ')';
//       }
//     },
//   },
// ];

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
        // ...autoformatLinks,
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
