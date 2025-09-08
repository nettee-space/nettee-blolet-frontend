import BloletNews from './blolet-news';
import RecommendArticle from './recommend-article';
import TrendsList from './trends-list';

export default function HomeContents() {
  return (
    <main className='flex flex-col gap-y-20 px-25'>
      <div className='flex gap-x-15'>
        <TrendsList />
        <BloletNews />
      </div>
      <RecommendArticle />
    </main>
  );
}
