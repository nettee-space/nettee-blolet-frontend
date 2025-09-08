'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HomeHeader() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: '블로렛 홈' },
    { href: '/my-blog', label: '내 블로그' },
    { href: '/bookmarks', label: '북마크' },
  ];
  const defaultButtonStyle = 'cursor-pointer px-5 py-2';
  const activeButtonStyle = 'rounded-full bg-[#6B66F4] text-white';

  return (
    <header className='relative mx-auto flex h-29 w-full max-w-[1920px] min-w-7xl items-center justify-between pr-[42px] pl-10'>
      <Link href={'/'}>
        <Image src={'/icons/bloletLogo.svg'} alt='blolet logo' width={135} height={32} />
      </Link>

      <nav className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5F5F5]'>
        <ul className='flex items-center gap-1 p-[10px] text-[16px]'>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${defaultButtonStyle} ${
                  pathname === link.href ? activeButtonStyle : ''
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
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
    </header>
  );
}
