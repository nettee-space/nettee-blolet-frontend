'use client';

import * as React from 'react';
import { useState } from 'react';

export default function EditContent() {
  const [tags, setTags] = useState(['프론트엔드', 'React', 'Javascript']);

  return (
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
  );
}
