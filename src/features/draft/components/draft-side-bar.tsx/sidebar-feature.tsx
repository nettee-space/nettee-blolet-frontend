'use client';

import Image from 'next/image';

export default function SideBarFeature() {
  return (
    <div className='flex h-full flex-col gap-[32px]'>
      <div className='flex items-center gap-3.5'>
        <Image width={24} height={24} src={'/icons/minimizetext.svg'} alt='MinimizeText' />
        <p>맞춤법 검사</p>
      </div>
    </div>
  );
}
