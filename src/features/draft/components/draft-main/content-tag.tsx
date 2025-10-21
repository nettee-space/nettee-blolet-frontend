'use client';

interface ContentsTagProps {
  tags: string[];
}
export default function ContentsTag({ tags }: ContentsTagProps) {
  return (
    <div className='flex items-center justify-between gap-2.5'>
      {tags.map((tag) => (
        <span key={tag} className='rounded-[7px] bg-[#f1f1f1] px-2.5'>
          {tag}
        </span>
      ))}
      <button className='rounded-[7px] border px-2.5 text-[#999]'>+ add new tag</button>
    </div>
  );
}
