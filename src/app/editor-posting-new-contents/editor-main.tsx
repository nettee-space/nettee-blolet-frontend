'use client';

import {
  BlockquotePlugin,
  BoldPlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  ItalicPlugin,
  UnderlinePlugin,
} from '@platejs/basic-nodes/react';
import { SlashInputPlugin, SlashPlugin } from '@platejs/slash-command/react';
import type { Value } from 'platejs';
import {
  Plate,
  usePlateEditor,
} from 'platejs/react';

import * as React from 'react';

import { BasicMarksKit } from '@/components/basic-marks-kit';
import { CodeBlockKit } from '@/components/code-block-kit';
import { SlashKit } from '@/components/slash-kit';
import { BlockquoteElement } from '@/components/ui/blockquote-node';
import { Editor, EditorContainer } from '@/components/ui/editor';
import { FixedToolbar } from '@/components/ui/fixed-toolbar';
import { H1Element, H2Element, H3Element } from '@/components/ui/heading-node';
import { MarkToolbarButton } from '@/components/ui/mark-toolbar-button';
import { ToolbarButton } from '@/components/ui/toolbar';


const initialValue: Value = [
  {
    children: [{ text: 'Title' }],
    type: 'h3',
  },
  {
    children: [{ text: 'This is a quote.' }],
    type: 'blockquote',
  },
  {
    children: [
      { text: 'With some ' },
      { bold: true, text: 'bold' },
      { text: ' text for emphasis!' },
    ],
    type: 'p',
  },
];

export default function EditorMain() {
  const editor = usePlateEditor({
    plugins: [
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      H1Plugin.withComponent(H1Element),
      H2Plugin.withComponent(H2Element),
      H3Plugin.withComponent(H3Element),
      BlockquotePlugin.withComponent(BlockquoteElement),
      ...SlashKit,
      ...CodeBlockKit,
      ...BasicMarksKit,
    ],
    value: () => {
      const savedValue = localStorage.getItem('installation-next-demo');
      return savedValue ? JSON.parse(savedValue) : initialValue;
    },
  });

  return (
    <main className='sm:w-[calc(100%-300px)] w-full'>
        <Plate
        editor={editor}
        onChange={({ value }) => {
            localStorage.setItem('installation-next-demo', JSON.stringify(value));
        }}
        >
        <EditorContainer>
            <Editor placeholder="Type your amazing content here..." />
        </EditorContainer>
        </Plate>
    </main>
    
  );
}
