'use client';

import { PlateEditor } from '@/lib/editor/components/plate-editor';
export default function PlateWrapper() {
  return (
    <div className='h-full w-full'>
      <PlateEditor />
    </div>
  );
}
