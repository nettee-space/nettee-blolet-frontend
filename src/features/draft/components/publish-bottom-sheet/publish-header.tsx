'use client';
import { Button } from '@/components/ui/button';
import { DrawerClose, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';

export default function PublishHeader() {
  return (
    <DrawerHeader className='flex flex-row items-center justify-between gap-0 p-0'>
      <DrawerTitle id='publish-title' className='text-lg font-bold'>
        게시하기
      </DrawerTitle>
      <span className='flex items-center gap-4.5'>
        <DrawerClose asChild>
          <Button variant='outline' className='rounded-[50px]'>
            게시 취소
          </Button>
        </DrawerClose>
        <Button
          className='rounded-[50px] bg-[#4d4d4d] px-[18px] py-[10px] text-white'
          aria-label='즉시 발행'
        >
          즉시 발행
        </Button>
      </span>
    </DrawerHeader>
  );
}
