'use client';

import PublishHeader from './publish-header';
import PublishReserve from './publish-reserve';
import PublishUrl from './publish-url';
import FieldWrapper from '../field-wrapper';

export default function PublishForm() {
  return (
    <form className='mx-auto flex w-full max-w-[1920px] min-w-[640px] flex-col gap-10 px-25 py-10'>
      <PublishHeader />
      <div className='flex flex-col gap-6 text-[#000]'>
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
