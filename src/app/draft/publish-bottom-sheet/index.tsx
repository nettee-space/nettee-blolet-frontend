'use client';
import { useState } from 'react';

import PublishField from './publish-field';
import PublishHeader from './publish-header';
import PublishReserve from './publish-reserve';
import PublishSeriesSelect from './publish-series-select';
import PublishUrl from './publish-url';

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
        {/* 게시하기 바텀 시트 헤더 */}
        <PublishHeader />

        <dl className='flex flex-col justify-start gap-6 text-[#000]'>
          {/* 시리즈 선택 */}
          <PublishField label='시리즈'>
            <PublishSeriesSelect
              onSeriesChange={handleSeriesChange}
              selectedSeries={selectedSeries}
            />
          </PublishField>
          {/* 예약하기 */}
          <PublishField label='발행일'>
            <PublishReserve />
          </PublishField>
          {/* URL 설정 */}
          <PublishField label='URL'>
            <PublishUrl />
          </PublishField>
        </dl>
      </div>
    </section>
  );
}
