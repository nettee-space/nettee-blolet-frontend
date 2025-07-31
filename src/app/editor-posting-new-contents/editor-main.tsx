'use client';

import * as React from 'react';
import { useState } from 'react';

import PlateWrapper from './plate-wrapper';




export default function EditorMain() {
  const [tags, setTags] = useState([]);

  return (
    <main className='sm:w-[calc(100%-300px)] w-full text-[#000]'>
      <div>
        <button></button>
        <div>
          <div></div>
          <button>미리보기</button>
          <button>게시하기</button>
        </div>
      </div>
      <div className='w-full h-fit flex flex-col items-center justify-center gap-15'>
        <div className='w-full text-[40px]'>
          <input className="placeholder:text-[#999]" placeholder='제목 없음' type='text'/>
        </div>
        <div className='w-full text-[18px]'>
          <ul className='w-full flex flex-col items-start gap-6'>
            <li className='flex justify-start items-center gap-[50px]'>
              <label className='text-[#999] w-30'>대표 이미지 설정</label>
              <input className="placeholder:text-[#999]" placeholder='파일 업로드 하기' type='file' />
            </li>
            <li className='flex justify-start items-center gap-[50px]'>
              <label className='text-[#999] w-30'>시리즈</label>
              <input className="placeholder:text-[#999]" placeholder='비어 있음' type='text'/>
            </li>
            <li className='flex justify-start items-center gap-[50px]'>
              <label className='text-[#999] w-30'>Tag</label>
              <div className="flex gap-2 flex-wrap">
                {tags.map(tag => (
                  <span key={tag} className="p-2.5 bg-gray-200 border rounded-[7px]">{tag}</span>
                ))}
              </div>
              <button>+ add new tag</button>
            </li>
          </ul>
        </div>
      </div>
      <div className='w-full min-h-[600px]'>
        <PlateWrapper/>
      </div>
      
    </main>
    
  );
}
