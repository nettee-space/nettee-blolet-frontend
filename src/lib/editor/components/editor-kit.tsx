'use client';

import { type Value, TrailingBlockPlugin } from 'platejs';
import { type TPlateEditor, useEditorRef } from 'platejs/react';

import { AlignKit } from '@/lib/editor/components/align-kit';
import { AutoformatKit } from '@/lib/editor/components/autoformat-kit';
import { BasicBlocksKit } from '@/lib/editor/components/basic-blocks-kit';
import { BasicMarksKit } from '@/lib/editor/components/basic-marks-kit';
import { BlockMenuKit } from '@/lib/editor/components/block-menu-kit';
// import { BlockPlaceholderKit } from '@/lib/editor/components/block-placeholder-kit';
import { CalloutKit } from '@/lib/editor/components/callout-kit';
import { CodeBlockKit } from '@/lib/editor/components/code-block-kit';
import { CursorOverlayKit } from '@/lib/editor/components/cursor-overlay-kit';
import { DndKit } from '@/lib/editor/components/dnd-kit';
import { DocxKit } from '@/lib/editor/components/docx-kit';
import { EmojiKit } from '@/lib/editor/components/emoji-kit';
import { FloatingToolbarKit } from '@/lib/editor/components/floating-toolbar-kit';
import { FontKit } from '@/lib/editor/components/font-kit';
import { LinkKit } from '@/lib/editor/components/link-kit';
import { ListKit } from '@/lib/editor/components/list-kit';
import { MarkdownKit } from '@/lib/editor/components/markdown-kit';
import { MediaKit } from '@/lib/editor/components/media-kit';
import { SlashKit } from '@/lib/editor/components/slash-kit';
import { TableKit } from '@/lib/editor/components/table-kit';
import { ToggleKit } from '@/lib/editor/components/toggle-kit';

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
  ...BlockMenuKit,
  // ...BlockPlaceholderKit,
];

export type MyEditor = TPlateEditor<Value, (typeof EditorKit)[number]>;

export const useEditor = () => useEditorRef<MyEditor>();
