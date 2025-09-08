import ContentsRecommendArticle from './contents-recommend-article';
import ContentsRecommendBlogger from './contents-recommend-blogger';
import ContentsTrends from './contents-trends';

export default function HomeContents() {
  return (
    <main className='grid grow grid-cols-2 px-25'>
      <ContentsTrends />
      <ContentsRecommendBlogger />
      <ContentsRecommendArticle />
    </main>
  );
}
