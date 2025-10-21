'use client';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

import PublishForm from './publish-form';

export default function PublishTrigger() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant='default'
          className='rounded-[50px] bg-[#4d4d4d] px-[18px] py-[10px] text-[18px]/[32px]'
        >
          게시하기
        </Button>
      </DrawerTrigger>
      <DrawerContent className='z-50'>
        <PublishForm />
      </DrawerContent>
    </Drawer>
  );
}
