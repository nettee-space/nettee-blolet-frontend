'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';

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

const getMenuGroups = (blogUrl: string) => [
  {
    label: null,
    items: [
      {
        icon: '/icons/home.svg',
        label: '내 블로그 홈',
        alt: 'Home',
        href: `/${blogUrl}`,
      },
      {
        icon: '/icons/dashboard.svg',
        label: '대시보드',
        alt: 'Dashboard',
        href: `/${blogUrl}/dashboard`,
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
        href: `/${blogUrl}/series`,
      },
      {
        icon: '/icons/post.svg',
        label: '게시글 관리',
        alt: 'Post',
        href: `/${blogUrl}/posts`,
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
        href: `/${blogUrl}/comments`,
      },
      {
        icon: '/icons/setting.svg',
        label: '댓글 설정',
        alt: 'Setting',
        href: `/${blogUrl}/comment-settings`,
      },
    ],
  },
  {
    label: '관리 및 도구',
    items: [
      {
        icon: '/icons/account-management.svg',
        label: '계정관리',
        alt: 'Account Management',
        href: `/${blogUrl}/account`,
      },
      {
        icon: '/icons/setting.svg',
        label: '블로그 설정',
        alt: 'Blog Setting',
        href: `/${blogUrl}/settings`,
      },
      {
        icon: '/icons/tool.svg',
        label: '도구',
        alt: 'Tools',
        href: `/${blogUrl}/tools`,
      },
    ],
  },
];

const getBreadcrumbMap = (
  blogUrl: string,
): Record<string, { parent?: string; current: string }> => ({
  [`/${blogUrl}`]: { current: '내 블로그 홈' },
  [`/${blogUrl}/dashboard`]: { current: '대시보드' },
  [`/${blogUrl}/series`]: { current: '시리즈 관리' },
  [`/${blogUrl}/series/add`]: { parent: '시리즈 관리', current: '시리즈 추가' },
  [`/${blogUrl}/series/edit/[id]`]: { parent: '시리즈 관리', current: '시리즈 편집' },
  [`/${blogUrl}/posts`]: { current: '게시글 관리' },
  [`/${blogUrl}/comments`]: { current: '댓글 관리' },
  [`/${blogUrl}/comment-settings`]: { current: '댓글 설정' },
  [`/${blogUrl}/profile`]: { current: '계정관리' },
  [`/${blogUrl}/settings`]: { current: '블로그 설정' },
  [`/${blogUrl}/tools`]: { current: '도구' },
});

const normalizePath = (path: string, blogUrl: string): string => {
  // /blogUrl/series/edit/4 → /blogUrl/series/edit/[id]
  if (path.match(new RegExp(`^/${blogUrl}/series/edit/\\d+$`))) {
    return `/${blogUrl}/series/edit/[id]`;
  }

  return path;
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();

  const blogUrl = params.blogUrl as string;
  const breadcrumbMap = getBreadcrumbMap(blogUrl);
  const normalizedPath = normalizePath(pathname, blogUrl);
  const breadcrumb = breadcrumbMap[normalizedPath];
  const menuGroups = getMenuGroups(blogUrl);

  return (
    <SidebarProvider>
      <div className='flex h-screen w-full'>
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
                        const isActive = item.href.endsWith(`/${blogUrl}`)
                          ? pathname === item.href
                          : pathname.startsWith(item.href);
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

        <SidebarInset>
          <header className='flex shrink-0 items-center gap-2 p-8'>
            <SidebarTrigger className='-ml-1' />

            {breadcrumb && (
              <nav className='ml-4 flex items-center text-sm text-gray-500'>
                {breadcrumb.parent && (
                  <>
                    <span>{breadcrumb.parent}</span>
                    <span className='mx-2'>{'>'}</span>
                  </>
                )}
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
