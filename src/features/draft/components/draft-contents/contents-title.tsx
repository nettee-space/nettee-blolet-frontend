export default function ContentsTitle() {
  return (
    <section className='w-full text-[40px]'>
      <input
        className='font-bold placeholder:text-[#999]'
        placeholder='제목 없음'
        type='text'
        minLength={3}
        maxLength={100}
      />
    </section>
  );
}
