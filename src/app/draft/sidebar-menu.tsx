'use client';

import Image from 'next/image';

export default function SideBarMenu() {
  return (
    <button className='flex items-center gap-3 pb-6'>
      <Image width={24} height={24} src={'/icons/fileadd.svg'} alt='FileAdd' />
      <p className='font-semibold'>내 서랍으로</p>
    </button>
  );
}
