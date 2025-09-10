import Link from 'next/link';

import Tag from './tag';

type Article = {
  id: number;
  thumbnailUrl: string;
  author: string;
  time: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
};
interface ArticleCardProps {
  article: Article;
}
export default function ArticleCard({ article }: ArticleCardProps) {
  const { author, time, title, description, tags, link } = article;
  return (
    <Link href={link} className='grid grid-cols-1 gap-4 text-xs text-[#4d4d4d]'>
      <div className='h-50 w-85 overflow-hidden rounded-[20px] bg-gray-400'></div>
      <div className='grid grid-cols-1 gap-1'>
        <div>
          <div className='flex items-center gap-[10px] leading-[16px] text-[#4d4d4d]'>
            <p>by {author}</p>
            <span className='h-[10px] w-[1px] bg-[#999]' />
            <p>{time}분</p>
          </div>
          <h3 className='text-[16px] leading-[30px] font-semibold text-[#000]'>{title}</h3>
          <p className='text-[12px] leading-[16px]'>{description}</p>
        </div>
      </div>
      <div>
        <ul className='flex gap-2 text-xs'>
          {tags.map((tag, id) => (
            <Tag key={id} label={tag} />
          ))}
        </ul>
      </div>
    </Link>
  );
}
