import { SidebarProvider } from '@/components/ui/sidebar';
import DraftHeader from '@/features/draft/components/draft-main/draft-header';
import AppSideBar from '@/features/draft/components/draft-sidebar.tsx/app-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className='h-dvh w-full'>
      <SidebarProvider className='h-full w-full'>
        <AppSideBar />
        <div className='w-full'>
          <DraftHeader />
          <main className='mx-auto h-full w-full max-w-[1920px]'>{children}</main>
        </div>
      </SidebarProvider>
    </section>
  );
}
