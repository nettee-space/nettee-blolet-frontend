import Menu from './menu';

export default function MyBlogSideBar() {
  return (
    <aside className='fixed flex shrink-0 flex-col gap-6 pl-10'>
      <Menu />
    </aside>
  );
}
