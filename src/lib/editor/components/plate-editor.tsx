'use client';

import { Plate, usePlateEditor } from 'platejs/react';
import { toast } from 'sonner';

import * as React from 'react';

import { EditorKit } from './editor-kit';
import { PlateEditorAdapter } from '../editor-event-adapter';
import { Editor, EditorContainer } from './ui/editor';

export function PlateEditor() {
  const editor = usePlateEditor({
    plugins: EditorKit,
  });
  const editorAdapter = React.useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const adapter = new PlateEditorAdapter(editor as any, 'draftId');

    // 임시 change handler 설정 (추후 mutate API 연결)
    adapter.onContentChange((request) => {
      toast(`📡 [${request.type}]`);
    });

    return adapter;
  }, [editor]);

  return (
    <Plate
      editor={editor}
      onChange={({ editor: { operations } }) => {
        editorAdapter.processOperations(operations);
      }}
    >
      <EditorContainer>
        <Editor
          placeholder={`텍스트를 입력해 주세요.\n“/” 입력하여 명령어를 사용할 수 있습니다.`}
        />
      </EditorContainer>
    </Plate>
  );
}
