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

  if (!editor) return null;
const isEditorEmptyFunc = (editor: any) => {
  if (!editor.children || editor.children.length === 0) return true;
  if (
    editor.children.length === 1 &&
    editor.children[0].children.length === 1 &&
    editor.children[0].children[0].text === ''
  ) {
    return true;
  }
  return false;
}

  const isEditorEmpty = isEditorEmptyFunc(editor);

  return (
    <Plate editor={editor}>
      <EditorContainer>
        <Editor
          placeholder={
            isEditorEmpty
              ? `텍스트를 입력해 주세요.\n“/” 입력하여 명령어를 사용할 수 있습니다.`
              : ''
          }
        />
      </EditorContainer>
    </Plate>
  );
}

const value: any[] = [];

