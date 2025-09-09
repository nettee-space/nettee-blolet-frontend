import MyBlogSideBar from '@/features/my-blog/my-blog-side-bar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='mx-auto flex w-full max-w-[1920px] min-w-7xl items-start pt-[165px]'>
      <MyBlogSideBar />
      <article className='flex flex-1 items-center justify-center'>{children}</article>
    </div>
  );
}
