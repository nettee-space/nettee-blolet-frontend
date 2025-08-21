'use client';

import * as React from 'react';

import { BoldIcon, Code2Icon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from 'lucide-react';
import { KEYS } from 'platejs';
import { useEditorReadOnly } from 'platejs/react';

import { InlineEquationToolbarButton } from './equation-toolbar-button';
import { FontColorToolbarButton } from './font-color-toolbar-button';
import { LinkToolbarButton } from './link-toolbar-button';
import { MarkToolbarButton } from './mark-toolbar-button';
import { ToolbarGroup } from './toolbar';
import { TurnIntoToolbarButton } from './turn-into-toolbar-button';
import { BaselineIcon, PaintBucketIcon } from 'lucide-react';

export function FloatingToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <>
      {!readOnly && (
        <>
          <ToolbarGroup>
            <TurnIntoToolbarButton />
            <MarkToolbarButton nodeType={KEYS.bold} tooltip='Bold (⌘+B)'>
              <BoldIcon />
            </MarkToolbarButton>
            <MarkToolbarButton nodeType={KEYS.italic} tooltip='Italic (⌘+I)'>
              <ItalicIcon />
            </MarkToolbarButton>
            <MarkToolbarButton nodeType={KEYS.underline} tooltip='Underline (⌘+U)'>
              <UnderlineIcon />
            </MarkToolbarButton>
            <MarkToolbarButton nodeType={KEYS.strikethrough} tooltip='Strikethrough (⌘+⇧+M)'>
              <StrikethroughIcon />
            </MarkToolbarButton>
            <MarkToolbarButton nodeType={KEYS.code} tooltip='Code (⌘+E)'>
              <Code2Icon />
            </MarkToolbarButton>
            <InlineEquationToolbarButton />
            <LinkToolbarButton />
            <FontColorToolbarButton nodeType={KEYS.color} tooltip='Text color'>
              <BaselineIcon />
            </FontColorToolbarButton>
            <FontColorToolbarButton nodeType={KEYS.backgroundColor} tooltip='Background color'>
              <PaintBucketIcon />
            </FontColorToolbarButton>{' '}
          </ToolbarGroup>
        </>
      )}

      {/* <ToolbarGroup>{!readOnly && <MoreToolbarButton />}</ToolbarGroup> */}
    </>
  );
}
