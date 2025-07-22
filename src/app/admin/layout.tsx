'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

const menuGroups = [
  {
    label: null,
    items: [
      {
        icon: '/icons/home.svg',
        label: '내 블로그 홈',
        alt: 'Home',
        href: '/admin',
      },
      {
        icon: '/icons/dashboard.svg',
        label: '대시보드',
        alt: 'Dashboard',
        href: '/admin/dashboard',
      },
    ],
  },
  {
    label: '콘텐츠 관리',
    items: [
      {
        icon: '/icons/series.svg',
        label: '시리즈 관리',
        alt: 'Series',
        href: '/admin/series',
      },
      {
        icon: '/icons/post.svg',
        label: '게시글 관리',
        alt: 'Post',
        href: '/admin/posts',
      },
    ],
  },
  {
    label: '통계',
    items: [
      {
        icon: '/icons/calc.svg',
        label: '통계 보기',
        alt: 'Statistics',
        href: '/admin/stats',
      },
    ],
  },
  {
    label: '댓글 관리',
    items: [
      {
        icon: '/icons/comment.svg',
        label: '댓글 관리',
        alt: 'Comment',
        href: '/admin/comments',
      },
      {
        icon: '/icons/setting.svg',
        label: '댓글 설정',
        alt: 'Setting',
        href: '/admin/comment-settings',
      },
    ],
  },
  {
    label: '꾸미기',
    items: [
      {
        icon: '/icons/theme.svg',
        label: '태마 편집',
        alt: 'Theme',
        href: '/admin/themes',
      },
    ],
  },
  {
    label: '관리 및 도구',
    items: [
      {
        icon: '/icons/setting.svg',
        label: '마이페이지',
        alt: 'My Page',
        href: '/admin/profile',
      },
      {
        icon: '/icons/setting.svg',
        label: '블로그 설정',
        alt: 'Blog Setting',
        href: '/admin/settings',
      },
      {
        icon: '/icons/plugin.svg',
        label: '플러그인',
        alt: 'Plugin',
        href: '/admin/plugins',
      },
    ],
  },
];

const breadcrumbMap: Record<string, { current: string }> = {
  '/admin': { current: '내 블로그 홈' },
  '/admin/dashboard': { current: '대시보드' },
  '/admin/series': { current: '시리즈 관리' },
  '/admin/posts': { current: '게시글 관리' },
  '/admin/stats': { current: '통계 보기' },
  '/admin/comments': { current: '댓글 관리' },
  '/admin/comment-settings': { current: '댓글 설정' },
  '/admin/themes': { current: '태마 편집' },
  '/admin/profile': { current: '마이페이지' },
  '/admin/settings': { current: '블로그 설정' },
  '/admin/plugins': { current: '플러그인' },
};

function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className='mb-2 px-8 pt-8'>
        <div className='flex items-center gap-2.5'>
          <Image
            src='/icons/profile.svg'
            alt='Profile'
            width={48}
            height={48}
            className='size-12'
          />
          <div>
            <h2 className='text-xl font-semibold'>Blolet_blogiiii</h2>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className='px-8 py-3'>
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            {groupIndex === 1 && <Separator className='my-2 bg-[#CCCCCC]' />}
            <SidebarGroup>
              {group.label && (
                <SidebarGroupLabel className='text-[13px] text-[#999999]'>
                  {group.label}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item, itemIndex) => {
                    const isActive = pathname === item.href;
                    return (
                      <SidebarMenuItem key={itemIndex}>
                        <SidebarMenuButton
                          asChild
                          className={`hover:bg-[#F2F2F2] ${isActive ? 'bg-[#F2F2F2]' : ''}`}
                        >
                          <Link href={item.href}>
                            <Image
                              src={item.icon}
                              alt={item.alt}
                              width={16}
                              height={16}
                              className='size-5'
                            />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const breadcrumb = breadcrumbMap[pathname];

  return (
    <SidebarProvider>
      <div className='flex h-screen w-full'>
        <AdminSidebar />
        <SidebarInset>
          <header className='flex shrink-0 items-center gap-2 p-8'>
            <SidebarTrigger className='-ml-1' />

            {breadcrumb && (
              <nav className='ml-4 flex items-center text-sm text-gray-500'>
                <span>{breadcrumb.current}</span>
              </nav>
            )}
          </header>
          <div className='flex flex-1 flex-col gap-4 px-8 py-4'>{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
