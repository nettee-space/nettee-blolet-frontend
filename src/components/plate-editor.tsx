'use client';

import { Plate, usePlateEditor } from 'platejs/react';

import * as React from 'react';

import { EditorKit } from '@/components/editor-kit';
import { Editor, EditorContainer } from '@/components/ui/editor';

export function PlateEditor() {
  const editor = usePlateEditor({
    plugins: EditorKit,
    value,
  });



  return (
    <Plate editor={editor}>
      <EditorContainer>
        <Editor
          placeholder={
          `텍스트를 입력해 주세요.\n“/” 입력하여 명령어를 사용할 수 있습니다.`
          }
        />
      </EditorContainer>
    </Plate>
  );
}

const value: any[] = [];

