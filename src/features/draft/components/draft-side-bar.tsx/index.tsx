'use client';

import { Sidebar, SidebarContent } from '@/components/ui/sidebar';

import SideBarAdmin from './sidebar-admin';
import SideBarDraft from './sidebar-draft';
import SideBarFunction from './sidebar-function';
import SideBarHeader from './sidebar-header';
import SideBarMenu from './sidebar-menu';
import SidebarSearchInput from './sidebar-search-input';

export default function DraftSideBar() {
  return (
    <Sidebar className='absolute top-0 z-60 flex h-dvh w-full flex-col justify-between gap-12 border-none bg-[#F9F9F9] px-[30px] pb-[32px] text-[18px] leading-[30px] text-[#000] sm:w-[300px]'>
      <SideBarHeader />
      <SidebarContent className='flex w-full flex-1 flex-col gap-6 overflow-hidden border-b'>
        <SideBarMenu />
        <hr />
        <SidebarSearchInput />
        <div className='flex flex-col gap-8'>
          <SideBarDraft />
          <SideBarDraft />
        </div>
        <hr />
        <SideBarFunction />
      </SidebarContent>

      <SideBarAdmin />
    </Sidebar>
  );
}
