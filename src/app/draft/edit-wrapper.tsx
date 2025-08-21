'use client';
import { ChangeEvent, useState } from 'react';
import EditContent from './edit-content';
import EditTop from './edit-top';
import MainBanner from './main-banner';
import PlateWrapper from './plate-wrapper';
interface EditWrapperProps {
  open: () => void;
  sidebar?: boolean;
}

export default function EditWrapper({ open, sidebar }: EditWrapperProps) {
  const [bannerImg, setBannerImg] = useState<string | undefined>(undefined);
  const handleBannerUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBannerImg(imageUrl);
    }
  };

  return (
    <div className='relative h-full w-full text-[#000]'>
      <EditTop open={open} sidebar={sidebar} />
      <main className='h-dvh w-full overflow-y-auto pt-20'>
        <MainBanner bannerImg={bannerImg} className='h-66' />
        <div className='h-dvh w-full text-[#000]'>
          <EditContent handleBannerUpload={handleBannerUpload} />
          <PlateWrapper />
        </div>
      </main>
    </div>
  );
}
