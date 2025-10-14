'use client';
import { useState } from 'react';

import PublishHeader from './publish-header';
import PublishReserve from './publish-reserve';
import PublishUrl from './publish-url';
import SeriesSelect from './series-select';
import FieldWrapper from '../field-wrapper';

export default function PublishForm() {
  const [selectedSeries, setSelectedSeries] = useState<string>('');

  return (
    <form className='mx-auto flex max-w-[1920px] min-w-[640px] flex-col gap-10 px-25 py-10'>
      <PublishHeader />
      <div className='flex flex-col gap-6 text-[#000]'>
        <FieldWrapper className='gap-[62px]' label='시리즈'>
          <SeriesSelect selectedSeries={selectedSeries} onSeriesChange={setSelectedSeries} />
        </FieldWrapper>

        <FieldWrapper className='gap-[62px]' label='발행일'>
          <PublishReserve />
        </FieldWrapper>

        <FieldWrapper className='gap-[62px]' label='URL'>
          <PublishUrl />
        </FieldWrapper>
      </div>
    </form>
  );
}
