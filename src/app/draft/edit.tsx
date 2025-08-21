'use client';
import { useState } from 'react';
import EditWrapper from './edit-wrapper';
import SideBarWrapper from './sidebar-wrapper';

export default function Edit() {
  const [sidebar, setSidebar] = useState(true);
  const openSidebar = () => {
    setSidebar(true);
  };
  const closeSidebar = () => {
    setSidebar(false);
  };
  return (
    <div className='relative mx-auto flex h-dvh w-full max-w-[1920px] items-center justify-between overflow-hidden'>
      <SideBarWrapper sidebar={sidebar} close={closeSidebar} />
      <EditWrapper sidebar={sidebar} open={openSidebar} />
    </div>
  );
}
