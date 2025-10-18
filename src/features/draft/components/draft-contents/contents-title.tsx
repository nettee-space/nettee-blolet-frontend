'use client';
import { useEffect } from 'react';

import { useDraftStore } from '@/store/useDraftStore';

export default function ContentsTitle() {
  const { title, errors, setTitle, initializeValidation } = useDraftStore();
  useEffect(() => {
    initializeValidation();
  }, [initializeValidation]);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  return (
    <section className='w-full text-[40px]'>
      <input
        className='font-bold outline-0 placeholder:text-[#999]'
        placeholder='제목 없음'
        type='text'
        minLength={3}
        maxLength={100}
        value={title}
        onChange={onChangeTitle}
      />
      {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
    </section>
  );
}
