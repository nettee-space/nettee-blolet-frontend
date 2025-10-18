import { SidebarProvider } from '@/components/ui/sidebar';
import AppSideBar from '@/features/draft/components/draft-side-bar.tsx/app-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className='relative mx-auto h-dvh max-w-[1920px] overflow-hidden sm:w-full'>
      <SidebarProvider>
        <AppSideBar />
        <main className='flex-1'>{children}</main>
      </SidebarProvider>
    </section>
  );
}
