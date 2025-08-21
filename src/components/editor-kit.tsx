'use client';

import { type Value, TrailingBlockPlugin } from 'platejs';
import { type TPlateEditor, useEditorRef } from 'platejs/react';

import { AlignKit } from '@/components/align-kit';
import { AutoformatKit } from '@/components/autoformat-kit';
import { BasicBlocksKit } from '@/components/basic-blocks-kit';
import { BasicMarksKit } from '@/components/basic-marks-kit';
import { BlockMenuKit } from '@/components/block-menu-kit';
import { BlockPlaceholderKit } from '@/components/block-placeholder-kit';
import { CalloutKit } from '@/components/callout-kit';
import { CodeBlockKit } from '@/components/code-block-kit';
import { CursorOverlayKit } from '@/components/cursor-overlay-kit';
import { DndKit } from '@/components/dnd-kit';
import { DocxKit } from '@/components/docx-kit';
import { EmojiKit } from '@/components/emoji-kit';
import { FloatingToolbarKit } from '@/components/floating-toolbar-kit';
import { FontKit } from '@/components/font-kit';
import { LinkKit } from '@/components/link-kit';
import { ListKit } from '@/components/list-kit';
import { MarkdownKit } from '@/components/markdown-kit';
import { MediaKit } from '@/components/media-kit';
import { SlashKit } from '@/components/slash-kit';
import { TableKit } from '@/components/table-kit';
import { ToggleKit } from '@/components/toggle-kit';

export const EditorKit = [
  // Elements
  ...BasicBlocksKit,
  ...CodeBlockKit,
  ...TableKit,
  ...ToggleKit,
  ...MediaKit,
  ...CalloutKit,
  ...LinkKit,
  // Marks
  ...BasicMarksKit,
  ...FontKit,

  // Block Style
  ...ListKit,
  ...AlignKit,

  // Editing
  ...SlashKit,
  ...AutoformatKit,
  ...CursorOverlayKit,
  ...BlockMenuKit,
  ...DndKit,
  ...EmojiKit,
  TrailingBlockPlugin,

  // Parsers
  ...DocxKit,
  ...MarkdownKit,
  ...FloatingToolbarKit,
  ...BlockPlaceholderKit,
];

export type MyEditor = TPlateEditor<Value, (typeof EditorKit)[number]>;

export const useEditor = () => useEditorRef<MyEditor>();
