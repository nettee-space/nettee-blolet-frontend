'use client';

import Image from 'next/image';
import React, { useState, useRef, useCallback } from 'react';

import { PopoverContent } from '@/components/ui/popover';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import { BannerUploadInput } from './draft-contents';

interface UploadOptionPopoverProps {
  type: 'image' | 'file';
  handleBannerUpload: (input: BannerUploadInput) => void;
}

export default function UploadOptionPopover({
  type,
  handleBannerUpload,
}: UploadOptionPopoverProps) {
  const labels =
    type === 'image'
      ? { fileTab: '이미지', linkTab: '이미지 링크' }
      : { fileTab: '업로드', linkTab: '링크 임베드' };

  const [isDragging, setIsDragging] = useState(false);
  const [linkValue, setLinkValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files || []);
      if (files.length > 0) {
        handleBannerUpload({ type: 'file', files });
      }
    },
    [handleBannerUpload],
  );

  const handleLinkSubmit = useCallback(() => {
    if (linkValue.trim()) {
      handleBannerUpload({ type: 'url', url: linkValue });
      setLinkValue('');
    }
  }, [linkValue, handleBannerUpload]);

  return (
    <PopoverContent className='w-fit rounded-[20px] px-5 pt-3 pb-6'>
      <Tabs defaultValue='file' className='gap-4 border-[#e6e6e6]'>
        <TabsList className='flex h-fit w-full justify-start gap-3 bg-white p-0 text-[#999999]'>
          <TabsTrigger
            value='file'
            className='h-[30px] w-fit flex-none rounded-none border-transparent px-3 text-sm leading-6 font-normal -tracking-[0.42px] text-[#999999] data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-[#4d4d4d] data-[state=active]:font-bold data-[state=active]:text-[#4D4D4D] data-[state=active]:shadow-none'
          >
            {labels.fileTab}
          </TabsTrigger>
          <TabsTrigger
            value='link'
            className='h-[30px] w-fit flex-none rounded-none border-transparent px-3 text-sm leading-6 font-normal -tracking-[0.42px] text-[#999999] data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-[#4d4d4d] data-[state=active]:font-bold data-[state=active]:text-[#4D4D4D] data-[state=active]:shadow-none'
          >
            {labels.linkTab}
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value='file'
          className='flex flex-col items-end justify-center gap-4 text-xs font-normal'
        >
          <label
            htmlFor='file-input'
            id='drop-zone'
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex h-fit w-full items-center justify-center rounded-[10px] border px-[95px] py-11 transition-colors ${
              isDragging ? 'border-[#4d4d4d] bg-[#f9f9f9]' : 'border-[#ccc] bg-white'
            } text-[#999]`}
          >
            <span className='flex h-[30px] items-center gap-3'>
              <Image src='/icons/upload.svg' alt='upload icon' width={24} height={24} />
              <span>{isDragging ? '여기에 파일을 놓으세요' : 'Upload File'}</span>
            </span>
            <input
              ref={inputRef}
              className='hidden'
              id='file-input'
              type='file'
              accept={type === 'image' ? 'image/*' : undefined}
              onChange={(e) => {
                if (e.target.files) {
                  handleBannerUpload({ type: 'file', files: Array.from(e.target.files) });
                }
              }}
            />
          </label>
        </TabsContent>
        <TabsContent
          value='link'
          className='flex flex-col items-end justify-center gap-4 text-xs font-normal'
        >
          <input
            type='url'
            value={linkValue}
            onChange={(e) => setLinkValue(e.target.value)}
            placeholder='링크를 추가해주세요.'
            className='h-[40px] w-[330px] rounded border px-4 py-[5px]'
          />
          <span className='flex gap-[10px]'>
            <button
              onClick={() => setLinkValue('')}
              className='rounded-[50px] border border-[#ccc] px-[18px] py-[10px]'
            >
              취소
            </button>
            <button
              onClick={handleLinkSubmit}
              className='rounded-[50px] bg-[#4d4d4d] px-[18px] py-[10px] text-white'
            >
              완료
            </button>
          </span>
        </TabsContent>
      </Tabs>
    </PopoverContent>
  );
}
