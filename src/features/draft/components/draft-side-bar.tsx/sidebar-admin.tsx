'use client';
import Image from 'next/image';

export default function SideBarAdmin() {
  return (
    <div className='flex h-10 items-center gap-3 font-semibold'>
      <Image width={24} height={24} src={'/icons/profile.svg'} alt='Profile' />
      <p>Blolet_blogiiii</p>
    </div>
  );
}
