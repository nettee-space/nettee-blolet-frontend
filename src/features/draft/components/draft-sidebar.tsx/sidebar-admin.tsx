'use client';
import Image from 'next/image';

import { SidebarFooter } from '@/components/ui/sidebar';

export default function SideBarAdmin() {
  return (
    <SidebarFooter className='h-14 items-center gap-3 pt-4 font-semibold'>
      <Image width={24} height={24} src={'/icons/profile.svg'} alt='Profile' />
      <p>Blolet_blogiiii</p>
    </SidebarFooter>
  );
}
