'use client';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import Image from 'next/image';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';

import SideBarToggleButton from '../draft-sidebar.tsx/sidebar-toggle-button';
import PublishTrigger from '../publish-bottom-sheet/publish-trigger';

const uploadStatus = [
  { icon: '/icons/check.svg', text: '저장 완료', color: 'text-[#19BD58]' },
  { icon: '/icons/cloudupload.svg', text: '게시 완료', color: 'text-[#6B66F4]' },
  { icon: '/icons/resetdouble.svg', text: '저장 중...', color: 'text-[#4D4D4D]' },
  { icon: '/icons/x.svg', text: '저장 오류', color: 'text-[#F64646]' },
];

export default function DraftHeader() {
  const sampleStatus = '게시 완료';
  const currentStatus = uploadStatus.find((status) => status.text === sampleStatus);
  const { open } = useSidebar();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={twMerge(
        clsx(
          'sticky top-0 z-50 flex h-20 w-full items-center justify-center bg-white transition-all duration-100',
          scrolled && 'bg-white/50 backdrop-blur-[25px]',
        ),
      )}
    >
      <div
        className={clsx(
          'z-50 flex h-full w-full max-w-[1920px] px-[37px] transition-all duration-300',
          open ? 'justify-end' : 'justify-between',
        )}
      >
        {!open && <SideBarToggleButton />}
        <div className='flex items-center gap-[32px]'>
          {currentStatus && (
            <div className='flex items-center gap-3'>
              <Image src={currentStatus.icon} alt='상태 아이콘' width={20} height={20} />
              <p className={currentStatus.color}>{currentStatus.text}</p>
            </div>
          )}
          <div className='flex items-center gap-[18px] text-[18px]/[32px] font-medium'>
            <Button
              variant='outline'
              className='rounded-[50px] px-[18px] py-[10px] text-[18px]/[32px]'
            >
              미리보기
            </Button>
            <PublishTrigger />
          </div>
        </div>
      </div>
    </header>
  );
}
