// /components/NavList.tsx

'use client';

import clsx from 'clsx';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLink = {
  id: number;
  label: string;
  link: string;
};

interface NavListProps {
  navLinks: NavLink[];
}

export default function NavList({ navLinks }: NavListProps) {
  const pathname = usePathname();

  const activeClasses = 'bg-[#6B66F4] text-white';

  return (
    <ul className='flex items-center gap-1 px-[10px] py-[7px] text-base'>
      {navLinks.map((nav) => {
        const isActive = nav.link === '/' ? pathname === nav.link : pathname.startsWith(nav.link);

        return (
          <li
            key={nav.id}
            className={clsx('cursor-pointer rounded-full px-5 py-2 transition-colors', {
              [activeClasses]: isActive,
            })}
          >
            <Link href={nav.link}>{nav.label}</Link>
          </li>
        );
      })}
    </ul>
  );
}
