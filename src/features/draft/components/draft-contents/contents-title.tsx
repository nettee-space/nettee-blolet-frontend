import { useDraftStore } from '@/store/useDraftStore';

export default function ContentsTitle() {
  const title = useDraftStore((state) => state.values.title);
  const updateTitle = useDraftStore((state) => state.updateTitle);
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTitle(e.target.value);
  };
  return (
    <section className='w-full text-[40px]'>
      <input
        className='font-bold placeholder:text-[#999]'
        placeholder='제목 없음'
        type='text'
        minLength={3}
        maxLength={100}
        value={title}
        onChange={onChangeTitle}
      />
    </section>
  );
}
