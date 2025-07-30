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
import { CalloutPlugin } from '@platejs/callout/react';
import { SuggestionPlugin } from '@platejs/suggestion/react';
import type { Value } from 'platejs';
import { Plate, usePlateEditor } from 'platejs/react';

import * as React from 'react';


import { AutoformatKit } from '@/components/autoformat-kit';
import { CalloutKit } from '@/components/callout-kit';
import { CommentKit } from '@/components/comment-kit';
import { LinkKit } from '@/components/link-kit';
import { ListKit } from '@/components/list-kit';
import { SlashKit } from '@/components/slash-kit';
import { SuggestionKit } from '@/components/suggestion-kit';
import { BlockquoteElement } from '@/components/ui/blockquote-node';
import { CalloutElement } from '@/components/ui/callout-node';
import { Editor, EditorContainer } from '@/components/ui/editor';
import { FixedToolbar } from '@/components/ui/fixed-toolbar';
import { H1Element, H2Element, H3Element } from '@/components/ui/heading-node';
import { MarkToolbarButton } from '@/components/ui/mark-toolbar-button';
import { ToolbarButton } from '@/components/ui/toolbar';



const initialValue: Value = [
];

export default function PlateWrapper() {
  const editor = usePlateEditor({
    plugins: [
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      ...CalloutKit,
      ...AutoformatKit,
      ...SlashKit,
      ...SuggestionKit,
      ...ListKit,
      ...LinkKit,
      ...CommentKit,
      H1Plugin.withComponent(H1Element),
      H2Plugin.withComponent(H2Element),
      H3Plugin.withComponent(H3Element),
      BlockquotePlugin.withComponent(BlockquoteElement),
      CalloutPlugin.withComponent(CalloutElement),
    ],
    value: initialValue,
  });

  return (
    <Plate
      editor={editor}
      onChange={({ value }) => {
      }}
    >
      <EditorContainer>
        <Editor placeholder="Type your amazing content here..." />
      </EditorContainer>
    </Plate>
  );
}
