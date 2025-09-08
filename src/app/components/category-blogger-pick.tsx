'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import AddCategory from './add-category';

const categories = [
  { id: 1, link: '/UIUX', category: 'UIUX' },
  { id: 2, link: 'bibim', category: '비빔냉면과 물냉면' },
  { id: 3, link: 'ham', category: '함흥냉면과 평양냉면' },
];

export default function CategoryBloggerPick() {
  const pathname = usePathname();
  const activeCategory = 'bg-[#F2F2F2]';
  return (
    <section className='pb-6 text-[14px]'>
      <h2 className='pl-2 text-[13px] text-[#999]'>블로거님의 관심 카테고리</h2>
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
      <AddCategory />
    </section>
  );
}
