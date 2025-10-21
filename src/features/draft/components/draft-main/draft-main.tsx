'use client';
import { useState } from 'react';

import { PlateEditor } from '@/lib/editor/components/plate-editor';

import ContentBanner from './content-banner';
import ContentMetaForm from './content-meta-form';

export type BannerUploadInput = { type: 'file'; files: File[] } | { type: 'url'; url: string };

export default function DraftMain() {
  const [bannerImg, setBannerImg] = useState<string | undefined>(undefined);

  const handleBannerUpload = (input: BannerUploadInput) => {
    if (input.type === 'file') {
      const [file] = input.files;
      if (file) setBannerImg(URL.createObjectURL(file));
      return;
    }

    if (input.type === 'url') {
      setBannerImg(input.url);
    }
  };

  return (
    <div className='mx-auto h-full w-full text-[#000]'>
      <ContentBanner bannerImg={bannerImg} />
      <article className='h-full w-full text-[#000]'>
        <form>
          <ContentMetaForm handleBannerUpload={handleBannerUpload} />
          <hr className='mx-auto w-[calc(100%-200px)]' />
          <PlateEditor />
        </form>
      </article>
    </div>
  );
}
