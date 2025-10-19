'use client';

import { Popover, PopoverTrigger } from '@/shared/components/ui/popover';

import UploadOptionPopover from '../../uploadoptionpopover';

export default function ContentsBannerToggleButton() {
  return (
    <Popover>
      <PopoverTrigger className='cursor-pointer text-[#999]'>파일 업로드 하기</PopoverTrigger>
      <UploadOptionPopover type='image' />
    </Popover>
  );
}
