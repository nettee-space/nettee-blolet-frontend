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
import { BasicBlocksKit } from '@/components/basic-blocks-kit';
import { BasicMarksKit } from '@/components/basic-marks-kit';
import { BlockPlaceholderKit } from '@/components/block-placeholder-kit';
import { CalloutKit } from '@/components/callout-kit';
import { CodeBlockKit } from '@/components/code-block-kit';
import { CommentKit } from '@/components/comment-kit';
import { LinkKit } from '@/components/link-kit';
import { ListKit } from '@/components/list-kit';
import { MarkdownKit } from '@/components/markdown-kit';
import { SlashKit } from '@/components/slash-kit';
import { SuggestionKit } from '@/components/suggestion-kit';
import { TableKit } from '@/components/table-kit';
import { ToggleKit } from '@/components/toggle-kit';
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
      ...TableKit,
      ...ToggleKit,
      ...LinkKit,
      ...MarkdownKit,
      ...BlockPlaceholderKit,
      ...CodeBlockKit,
      ...BasicBlocksKit,
      ...BasicMarksKit,
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
        console.log(value)
      }}
    >
      <EditorContainer>
        <Editor placeholder={`초기 상태에 텍스트를 입력해 주세요. \n 입력하여 명령어를 사용할 수 있습니다.`} className='placeholder:text-[#999] placeholder:whitespace-pre-line pt-15 w-full h-full' />
      </EditorContainer>
    </Plate>
  );
}
