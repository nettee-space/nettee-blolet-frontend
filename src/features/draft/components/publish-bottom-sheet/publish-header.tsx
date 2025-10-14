'use client';

export default function PublishHeader() {
  return (
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
  );
}
