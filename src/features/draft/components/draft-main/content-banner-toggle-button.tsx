'use client';

import { Popover, PopoverTrigger } from '@/shared/components/ui/popover';

import UploadOptionPopover from '../uploadoptionpopover';
import { BannerUploadInput } from './draft-main';

interface ContentsBannerToggleButtonProps {
  handleBannerUpload: (input: BannerUploadInput) => void;
}

export default function ContentBannerToggleButton({
  handleBannerUpload,
}: ContentsBannerToggleButtonProps) {
  return (
    <Popover>
      <PopoverTrigger className='cursor-pointer text-[#999]'>파일 업로드 하기</PopoverTrigger>
      <UploadOptionPopover type='image' handleBannerUpload={handleBannerUpload} />
    </Popover>
  );
}
