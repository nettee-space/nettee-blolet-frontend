'use client';
import { ChangeEvent, useState } from 'react';

import { PlateEditor } from '@/lib/editor/components/plate-editor';

import ContentsBanner from './contents-banner';
import EditContent from './edit-content';
import EditTop from './edit-top';

interface EditWrapperProps {
  open: () => void;
  sidebar?: boolean;
}

export default function DraftContents({ open, sidebar }: EditWrapperProps) {
  const [bannerImg, setBannerImg] = useState<string | undefined>(undefined);
  const handleBannerUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBannerImg(imageUrl);
    }
  };

  return (
    <div className='relative mx-auto h-full w-full text-[#000]'>
      <EditTop open={open} sidebar={sidebar} />
      <main className='h-dvh w-full overflow-y-auto pt-20'>
        <ContentsBanner bannerImg={bannerImg} />
        <article className='h-dvh w-full text-[#000]'>
          <EditContent handleBannerUpload={handleBannerUpload} />
          <hr className='mx-auto w-[calc(100%-200px)]' />
          <PlateEditor />
        </article>
      </main>
    </div>
  );
}
