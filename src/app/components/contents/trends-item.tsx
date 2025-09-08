import Image from 'next/image';
import Link from 'next/link';

type Trends = {
  title: string;
  rank: number;
  link: string;
};

interface TrendsItemProps {
  Item: Trends;
}

export default function TrendsItem({ Item }: TrendsItemProps) {
  const { title, rank, link } = Item;
  return (
    <li className='border-b border-[#ccc] pb-3'>
      <Link href={link} className='flex w-full items-center justify-between'>
        <div className='flex gap-1'>
          <p>{rank}</p>
          <p>{title}</p>
        </div>
        <Image src={'/icons/nav.svg'} alt='navigation to link' width={16} height={16} />
      </Link>
    </li>
  );
}
