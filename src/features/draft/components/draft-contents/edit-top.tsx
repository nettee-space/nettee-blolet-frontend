'use client';
import clsx from 'clsx';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';

import SideBarCustomTrigger from '../draft-side-bar.tsx/sidebar-custom-trigger';
import PublishTrigger from '../publish-bottom-sheet/publish-trigger';

const uploadStatus = [
  {
    icon: '/icons/check.svg',
    text: '저장 완료',
    color: 'text-[#19BD58]',
  },
  {
    icon: '/icons/cloudupload.svg',
    text: '게시 완료',
    color: 'text-[#6B66F4]',
  },
  {
    icon: '/icons/resetdouble.svg',
    text: '저장 중...',
    color: 'text-[#4D4D4D]',
  },
  {
    icon: '/icons/x.svg',
    text: '저장 오류',
    color: 'text-[#F64646]',
  },
];

export default function EditTop() {
  const sampleStatus = '게시 완료';
  const currentStatus = uploadStatus.find((status) => status.text === sampleStatus);
  const { open } = useSidebar();
  return (
    <div
      className={clsx(
        'absolute top-0 z-50 flex h-20 w-full max-w-[1920px] items-center bg-white px-[37px]',
        open ? 'justify-end' : 'justify-between',
      )}
    >
      {!open && <SideBarCustomTrigger />}
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
  );
}
