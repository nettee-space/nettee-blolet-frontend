import Link from 'next/link';

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
interface ArticleCardWideProps {
  article: Article;
}

export default function ArticleCardWide({ article }: ArticleCardWideProps) {
  const { title, author, time, description, link } = article;

  return (
    <Link href={link} className='flex justify-between gap-7 text-base text-[#4d4d4d]'>
      <div className='flex w-100 flex-col items-start gap-2 overflow-hidden'>
        <h2 className='w-100 truncate text-2xl font-semibold'>{title}</h2>
        <div className='flex items-center gap-[10px] leading-[16px] text-[#4d4d4d]'>
          <p className='whitespace-nowrap'>by {author}</p>
          <span className='h-[10px] w-[1px] bg-[#999]' />
          <p className='whitespace-nowrap'>{time}분</p>
        </div>
        <p className='w-100 text-wrap'>{description}</p>
      </div>
      <div className='h-50 w-85 shrink-0 overflow-hidden rounded-[20px] bg-gray-400'></div>
    </Link>
  );
}
