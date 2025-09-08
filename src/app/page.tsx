import HomeCategory from './components/category';
import HomeContents from './components/contents';

export default function Home() {
  return (
    <div className='mx-auto flex w-full max-w-[1920px] min-w-7xl items-start justify-between pt-[165px]'>
      <HomeCategory />
      <HomeContents />
    </div>
  );
}
