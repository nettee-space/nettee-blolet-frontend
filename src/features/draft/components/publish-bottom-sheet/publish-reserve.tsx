'use client';

export default function PublishReserve() {
  return (
    <div className='flex items-center justify-between gap-2'>
      <input type='datetime-local' />
      <button type='button' className='text-[#999]'>
        예약하기
      </button>
    </div>
  );
}
