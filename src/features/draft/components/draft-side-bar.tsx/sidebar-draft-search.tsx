import Image from 'next/image';

export default function SideBarDraftSearch() {
  return (
    <div className='flex h-10 items-center gap-3 rounded-[8px] border border-[#ccc] px-4'>
      <Image
        width={24}
        height={24}
        src={'/icons/search.svg'}
        alt='Draft Search'
        className='text-[#999]'
      />
      <input
        type='text'
        placeholder='드래프트 검색'
        className='placeholder:text-[#999]focus:border-[#000] h-[50px] w-full text-[18px] text-[#000] focus:outline-none'
      />
    </div>
  );
}
