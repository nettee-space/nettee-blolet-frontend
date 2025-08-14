'use client';

import EditContent from './edit-content';
import EditTop from './edit-top';
import PlateWrapper from './plate-wrapper';
interface EditWrapperProps {
  open: () => void;
  sidebar?: boolean;
}

export default function EditWrapper({ open, sidebar }: EditWrapperProps) {
  return (
    <div className='relative h-full w-full text-[#000]'>
      <EditTop open={open} sidebar={sidebar} />
      <main className='h-dvh w-full overflow-y-auto pt-20 text-[#000]'>
        <EditContent />
        <PlateWrapper />
      </main>
    </div>
  );
}
