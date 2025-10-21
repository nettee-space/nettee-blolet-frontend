'use client';
import { useEffect } from 'react';

import { useDraftStore } from '@/store/useDraftStore';

export default function PublishUrl() {
  const { path, errors, setPath, initializeValidation } = useDraftStore();

  useEffect(() => {
    initializeValidation();
  }, [initializeValidation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPath(e.target.value);
  };

  return (
    <div className='relative flex w-full items-center justify-between overflow-hidden rounded-md'>
      <input
        className='w-full px-2 outline-none focus:bg-[#F3F4F5]'
        type='text'
        name='path'
        value={path}
        onChange={handleInputChange}
        onBlur={handleInputChange}
      />
      {errors.path && (
        <p className='pointer-events-none absolute right-2 text-nowrap text-[#E63737]'>
          {errors.path}
        </p>
      )}
    </div>
  );
}
