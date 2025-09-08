import Image from 'next/image';

export default function AddCategory() {
  return (
    <button className='flex items-center gap-2 px-3 py-2 text-[14px] text-[#999]'>
      <Image src='/icons/plus.svg' alt='Add Category' width={20} height={20} />
      <p>카테고리 추가하기</p>
    </button>
  );
}
