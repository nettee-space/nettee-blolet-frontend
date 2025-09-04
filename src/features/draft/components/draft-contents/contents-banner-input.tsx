'use client';

import { ChangeEvent } from 'react';

interface ContentsBannerInputProps {
  handleBannerUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}
export default function ContentsBannerInput({ handleBannerUpload }: ContentsBannerInputProps) {
  return (
    <label className='cursor-pointer text-[#999]'>
      파일 업로드 하기
      <input type='file' className='hidden' onChange={handleBannerUpload} />
    </label>
  );
}
