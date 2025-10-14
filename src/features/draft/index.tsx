'use client';
import { useState } from 'react';

import DraftContents from './components/draft-contents';
import DraftSideBar from './components/draft-side-bar.tsx';

export default function Draft() {
  const [sidebar, setSidebar] = useState(true);
  const openSidebar = () => {
    setSidebar(true);
  };
  const closeSidebar = () => {
    setSidebar(false);
  };
  return (
    <div className='relative mx-auto flex h-dvh w-full max-w-[1920px] items-center justify-between overflow-hidden'>
      <DraftSideBar sidebar={sidebar} close={closeSidebar} />
      <DraftContents sidebar={sidebar} open={openSidebar} />
    </div>
  );
}
