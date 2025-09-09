'use client';
import Image from 'next/image';
import Link from 'next/link';

import NavList from './nav-list';

export default function Header() {
  const navLinks = [
    { id: 1, link: '/', label: '블로렛 홈' },
    { id: 2, link: '/my-blog', label: '내 블로그' },
    { id: 3, link: '/like-list', label: '좋아요 목록' },
  ];

  return (
    <header className='fixed top-0 left-0 flex h-29 w-screen items-center justify-center bg-white'>
      <div className='relative flex w-full max-w-[1920px] min-w-7xl items-center justify-between pr-[42px] pl-10'>
        <Link href={'/'}>
          <Image src={'/icons/bloletLogo.svg'} alt='blolet logo' width={135} height={32} />
        </Link>
        <nav className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5f5f5]'>
          <NavList navLinks={navLinks} />
        </nav>
        <div className='flex items-center gap-8'>
          <div>
            <Image
              src={'/icons/search.svg'}
              alt='search icon'
              width={24}
              height={24}
              className='cursor-pointer'
            />
          </div>
          <div className='flex items-center gap-3'>
            <Image
              src={'/icons/profile.svg'}
              alt='profile icon'
              width={42}
              height={42}
              className='cursor-pointer'
            />
            <p>Blolet_blogiiii</p>
          </div>
        </div>
      </div>
    </header>
  );
}
