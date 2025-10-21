'use client';

import DraftContents from './components/draft-contents';
import DraftSideBar from './components/draft-side-bar.tsx';

export default function Draft() {
  return (
    <div className='relative mx-auto flex h-dvh w-full max-w-[1920px] items-center justify-between overflow-hidden'>
      <DraftSideBar />
      <DraftContents />
    </div>
  );
}
