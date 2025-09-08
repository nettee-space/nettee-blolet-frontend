import HomeCategory from './components/home-category';
import HomeContents from './components/home-contents';

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <HomeCategory />
      <HomeContents />
    </div>
  );
}
