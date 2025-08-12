'use client';

import * as React from 'react';

import { Plate, usePlateEditor, useEditorState } from 'platejs/react';

import { EditorKit } from '@/components/editor-kit';
import { Editor, EditorContainer } from '@/components/ui/editor';
import { EmptyText } from 'platejs';
import { isEmpty } from 'slate';
export function PlateEditor() {
  const editor = usePlateEditor({
    plugins: EditorKit,
    value,
  });
  const isEditorEmpty = isEmpty(value)
  return (
    <Plate editor={editor}>
      <EditorContainer>
        <Editor 
        placeholder={isEditorEmpty ?  `텍스트를 입력해 주세요. \n “/” 입력하여 명령어를 사용할 수 있습니다.`: ''}
        />
      </EditorContainer>
    </Plate>
  );
}

const value = [
  
];
