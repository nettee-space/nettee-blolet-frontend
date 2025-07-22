import Image from 'next/image';
import {
  SidebarProvider,
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
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

const menuGroups = [
  {
    label: null,
    items: [
      { icon: '/icons/home.svg', label: '내 블로그 홈', alt: 'Home', hasHover: true },
      { icon: '/icons/dashboard.svg', label: '대시보드', alt: 'Dashboard', hasHover: false },
    ],
  },
  {
    label: '콘텐츠 관리',
    items: [
      { icon: '/icons/series.svg', label: '시리즈 관리', alt: 'Series', hasHover: false },
      { icon: '/icons/post.svg', label: '게시글 관리', alt: 'Post', hasHover: false },
    ],
  },
  {
    label: '통계',
    items: [{ icon: '/icons/calc.svg', label: '통계 보기', alt: 'Statistics', hasHover: false }],
  },
  {
    label: '댓글 관리',
    items: [
      { icon: '/icons/comment.svg', label: '댓글 관리', alt: 'Comment', hasHover: false },
      { icon: '/icons/setting.svg', label: '댓글 설정', alt: 'Setting', hasHover: false },
    ],
  },
  {
    label: '꾸미기',
    items: [{ icon: '/icons/theme.svg', label: '태마 편집', alt: 'Theme', hasHover: false }],
  },
  {
    label: '관리 및 도구',
    items: [
      { icon: '/icons/setting.svg', label: '마이페이지', alt: 'My Page', hasHover: false },
      { icon: '/icons/setting.svg', label: '블로그 설정', alt: 'Blog Setting', hasHover: false },
      { icon: '/icons/plugin.svg', label: '플러그인', alt: 'Plugin', hasHover: false },
    ],
  },
];

function AdminSidebar() {
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
                  {group.items.map((item, itemIndex) => (
                    <SidebarMenuItem key={itemIndex}>
                      <SidebarMenuButton className={item.hasHover ? 'hover:bg-[#F2F2F2]' : ''}>
                        <Image
                          src={item.icon}
                          alt={item.alt}
                          width={16}
                          height={16}
                          className='size-5'
                        />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
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
  return (
    <SidebarProvider>
      <div className='flex h-screen w-full'>
        <AdminSidebar />
        <SidebarInset>
          <header className='flex h-16 shrink-0 items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <div className='ml-auto'>{/* 헤더 컨텐츠 */}</div>
          </header>
          <div className='flex flex-1 flex-col gap-4 p-4'>{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
