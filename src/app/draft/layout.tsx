import { SidebarProvider } from '@/components/ui/sidebar';
import DraftSideBar from '@/features/draft/components/draft-side-bar.tsx';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className='relative mx-auto h-dvh max-w-[1920px] overflow-hidden sm:w-full'>
      <SidebarProvider>
        <DraftSideBar />
        <main className='flex-1'>{children}</main>
      </SidebarProvider>
    </section>
  );
}
