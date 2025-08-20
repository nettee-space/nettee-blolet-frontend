'use client';

import * as React from 'react';
import { useState } from 'react';
interface EditContentProps {
  handleBannerUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EditContent({ handleBannerUpload }: EditContentProps) {
  const [tags, setTags] = React.useState(['프론트엔드', 'React', 'Javascript']);
  const handleMaxLength = (e: React.FormEvent<HTMLInputElement>, maxLength: number) => {
    const inputElement = e.target as HTMLInputElement;
    const { value } = inputElement;
    if (value.length > maxLength) {
      inputElement.value = value.substr(0, maxLength);
    }
  };
  return (
    <div className='flex h-fit w-full flex-col items-center justify-center gap-15 border-b border-[#e6e6e6] pt-20 pb-15'>
      <div className='w-full text-[40px]'>
        <input
          className='font-bold placeholder:text-[#999]'
          placeholder='제목 없음'
          type='text'
          onInput={(e) => {
            handleMaxLength(e, 30);
          }}
        />
      </div>
      <div className='w-full text-[18px]'>
        <ul className='flex w-full flex-col items-start gap-6 leading-[30px] font-normal'>
          <li className='flex items-center justify-start gap-[50px]'>
            <label className='w-30 text-start whitespace-nowrap text-[#999]'>
              대표 이미지 설정
            </label>
            <label className='cursor-pointer text-[#999]'>
              파일 업로드 하기
              <input type='file' className='hidden' onChange={handleBannerUpload} />
            </label>
          </li>
          <li className='flex items-center justify-start gap-[50px]'>
            <label className='w-30 text-[#999]'>시리즈</label>
            <input className='placeholder:text-[#999]' placeholder='비어 있음' type='text' />
          </li>
          <li className='flex items-center justify-start gap-[50px]'>
            <label className='w-30 text-[#999]'>Tag</label>
            <div className='flex items-center justify-between gap-2.5'>
              {tags.map((tag) => (
                <span key={tag} className='rounded-[7px] bg-[#f1f1f1] px-2.5'>
                  {tag}
                </span>
              ))}
              <button className='rounded-[7px] border px-2.5 text-[#999]'>+ add new tag</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
