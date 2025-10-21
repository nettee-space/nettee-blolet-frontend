'use client';

import { Sidebar, SidebarContent } from '@/components/ui/sidebar';

import SideBarAddToDrafts from './sidebar-add-to-drafts';
import SideBarAdmin from './sidebar-admin';
import SideBarDraftList from './sidebar-draft-list';
import SidebarDraftSearch from './sidebar-draft-search';
import SideBarFeature from './sidebar-feature';
import SideBarHeader from './sidebar-header';
import SideBarPublishedList from './sidebar-published-list';

export default function AppSideBar() {
  return (
    <Sidebar className='fixed top-0 z-50 flex h-full w-full flex-col justify-between gap-12 border-none bg-[#F9F9F9] px-[30px] pb-[32px] text-[18px] leading-[30px] text-[#000] sm:w-[300px]'>
      <SideBarHeader />
      <SidebarContent className='flex w-full flex-1 flex-col gap-6 overflow-hidden border-b'>
        <SideBarAddToDrafts />
        <hr />
        <SidebarDraftSearch />
        <div className='flex flex-col gap-8'>
          <SideBarDraftList />
          <SideBarPublishedList />
        </div>
        <hr />
        <SideBarFeature />
      </SidebarContent>

      <SideBarAdmin />
    </Sidebar>
  );
}
