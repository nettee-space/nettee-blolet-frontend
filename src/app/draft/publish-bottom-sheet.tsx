'use client';
import { useState } from 'react';

import SeriesSelect from './series-select';

export default function PublishBottomSheet() {
  const [selectedSeries, setSelectedSeries] = useState<string>('');

  const handleSeriesChange = (value: string) => {
    setSelectedSeries(value);
  };

  return (
    <section
      className='fixed bottom-0 left-0 w-screen bg-white'
      aria-labelledby='publish-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='mx-auto flex max-w-[1920px] min-w-[640px] flex-col gap-10 py-10 pr-10 pl-25'>
        <header className='flex items-center justify-between'>
          <h2 id='publish-title' className='text-lg font-bold'>
            게시하기
          </h2>
          <button
            type='button'
            className='rounded-[50px] bg-[#4d4d4d] px-[18px] py-[10px] text-white'
            aria-label='게시하기'
          >
            게시하기
          </button>
        </header>

        <dl className='flex flex-col justify-start gap-6 text-[#000]'>
          {/* 시리즈 선택 */}
          <div className='flex items-center gap-[62px]'>
            <dt className='w-30 text-[#999]'>시리즈</dt>
            <dd>
              <SeriesSelect onSeriesChange={handleSeriesChange} selectedSeries={selectedSeries} />
            </dd>
          </div>

          {/* 발행일 */}
          <div className='flex items-center gap-[62px]'>
            <dt className='w-30 text-[#999]'>발행일</dt>
            <dd className='flex items-center gap-5'>
              <time dateTime='2025-12-31T12:59'>2025년 12월 31일 수요일 12시 59분</time>
              <button type='button' className='text-[#999]'>
                예약하기
              </button>
            </dd>
          </div>

          {/* URL */}
          <div className='flex items-center gap-[62px]'>
            <dt className='w-30 text-[#999]'>URL</dt>
            <dd>
              <p className='bg-transparent text-inherit'>https://kimnaebipumpitup.com/blolet</p>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
