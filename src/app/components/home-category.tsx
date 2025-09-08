import CategoryBloggerPick from './category-blogger-pick';
import CategoryBloletRecommend from './category-blolet-recommend';

export default function HomeCategory() {
  return (
    <aside className='shrink-0 pl-10'>
      <CategoryBloggerPick />
      <hr />
      <CategoryBloletRecommend />
    </aside>
  );
}
