'use client';

import clsx from 'clsx';

import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';

import PlateWrapper from './plate-wrapper';

const uploadStatus = [
  {
    icon: '/icons/check.svg',
    text:'저장 완료',
    color: 'text-[#19BD58]'
  },
  {
    icon: '/icons/cloudupload.svg',
    text:'게시 완료',
    color: 'text-[#6B66F4]'
  },
  {
    icon: '/icons/resetdouble.svg',
    text:'저장 중...',
    color: 'text-[#4D4D4D]'
  },
  {
    icon: '/icons/x.svg',
    text:'저장 오류',
    color: 'text-[#F64646]'
  },
]


export default function EditorMain() {
  const [tags, setTags] = useState(['프론트엔드', 'React', 'Javascript']);
  const sampleStatus = '게시 완료';
  const currentStatus = uploadStatus.find(status => status.text === sampleStatus );
  return (
    <main className='sm:w-[calc(100%-300px)] w-full h-full text-[#000]'>
      <div className='w-full h-20 px-[37px] flex justify-between items-center'>
        <button>
          <Image src={'/icons/SignIn.svg'} alt='사이드 바 열기' width={24} height={24} className='rotate-180'/>
        </button>
        <div className='flex items-center gap-[32px]'>
          {currentStatus && (
            <div className="flex items-center gap-3">
              <Image src={currentStatus.icon} alt='상태 아이콘' width={20} height={20} />
              <p className={currentStatus.color}>{currentStatus.text}</p>
            </div>
          )}
          <div className='flex items-center gap-[18px]'>
            <button className='px-[18px] py-[10px] rounded-[50px] bg-[#ffffff] text-[#000] border border-[#ccc]'>미리보기</button>
            <button className='px-[18px] py-[10px] bg-[#4d4d4d] text-[#ffffff] rounded-[50px]'>게시하기</button>
          </div>
        </div>
      </div>
      <div className='w-full h-fit flex flex-col items-center justify-center gap-15 pb-15 border-b border-[#e6e6e6]'>
        <div className='w-full text-[40px]'>
          <input className="placeholder:text-[#999] font-bold" placeholder='제목 없음' type='text'/>
        </div>
        <div className='w-full text-[18px]'>
          <ul className='w-full flex flex-col items-start gap-6 font-normal leading-[30px]'>
            <li className='flex justify-start items-center gap-[50px]'>
              <label className='text-[#999] w-30 whitespace-nowrap text-start'>대표 이미지 설정</label>
              <label className="cursor-pointer text-[#999]">
                파일 업로드 하기
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      console.log('선택된 파일:', file.name);
                    }
                  }}
                />
              </label>
            </li>
            <li className='flex justify-start items-center gap-[50px]'>
              <label className='text-[#999] w-30'>시리즈</label>
              <input className="placeholder:text-[#999]" placeholder='비어 있음' type='text'/>
            </li>
            <li className='flex justify-start items-center gap-[50px]'>
              <label className='text-[#999] w-30'>Tag</label>
              <div className='flex items-center justify-between gap-2.5'>
                {tags.map(tag => (
                  <span key={tag} className="px-2.5 bg-[#f1f1f1] rounded-[7px]">{tag}</span>
                ))}
                <button className='text-[#999] border px-2.5 rounded-[7px]'>+ add new tag</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <PlateWrapper/>
    </main>
    
  );
}
