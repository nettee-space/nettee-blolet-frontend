'use client';

import Image from 'next/image';

import { SidebarHeader } from '@/components/ui/sidebar';

import SideBarCustomTrigger from './sidebar-custom-trigger';

export default function SideBarHeader() {
  return (
    <SidebarHeader className='flex h-20 w-full items-center justify-between'>
      <Image width={100} height={26} src={'/icons/blolet.svg'} alt='BloletLogo' />
      <SideBarCustomTrigger />
    </SidebarHeader>
  );
}
