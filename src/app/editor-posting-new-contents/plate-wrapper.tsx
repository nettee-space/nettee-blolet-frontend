'use client';
import * as React from 'react';

import { PlateEditor } from '@/components/plate-editor';

export default function PlateWrapper() {
  return (
    <div className='h-full w-full'>
      <PlateEditor />
    </div>
  );
}
