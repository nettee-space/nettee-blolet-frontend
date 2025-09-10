'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

type List = {
  id: number;
  link: string;
  category: string;
};

interface CategoryListProps {
  title: string;
  list: List[];
  children?: ReactNode;
}

export default function CategoryList({ title, list, children }: CategoryListProps) {
  return (
    <section className='text-sm'>
      <h2 className='pl-3 text-[13px] text-gray-400'>{title}</h2>
      <ul className='py-5 text-black'>
        {list.map((cat) => (
          <li
            key={cat.id}
            className='w-fit rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-100'
          >
            <Link href={cat.link} className='block w-53'>
              {cat.category}
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </section>
  );
}
