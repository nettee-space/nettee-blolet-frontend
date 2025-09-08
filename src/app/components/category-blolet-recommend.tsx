'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const categories = [
  { id: 1, link: '/UIUX', category: 'AI' },
  { id: 2, link: 'bibim', category: '부승관과 부라보콘' },
  { id: 3, link: 'ham', category: '펭귄과 팽현숙' },
  { id: 4, link: 'ham', category: '나 평생 빵만 먹고 싶어' },
  { id: 5, link: 'ham', category: '나 평생 밥만 먹고 싶어' },
  { id: 6, link: 'ham', category: '바이브 코딩' },
  { id: 7, link: 'ham', category: 'Gnarly' },
  { id: 8, link: 'ham', category: 'Bobatea' },
  { id: 9, link: 'ham', category: 'Javascript' },
];

export default function CategoryBloletRecommend() {
  const pathname = usePathname();
  const activeCategory = 'bg-[#F2F2F2]';
  return (
    <section className='pt-6 text-[14px]'>
      <h2 className='pl-2 text-[13px] text-[#999]'>블로렛이 추천하는 카테고리</h2>
      <ul className='text-black'>
        {categories.map((cat) => (
          <li
            className={`rounded-[8px] px-3 py-[10px] ${pathname === cat.link ? activeCategory : ''}`}
            key={cat.id}
          >
            <Link href={cat.link}>{cat.category}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
