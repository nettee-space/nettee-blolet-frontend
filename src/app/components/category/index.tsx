import CategoryBloggerPick from './category-blogger-pick';
import CategoryBloletRecommend from './category-blolet-recommend';

export default function HomeCategory() {
  return (
    <aside className='flex shrink-0 flex-col gap-6 pl-10'>
      <CategoryBloggerPick />
      <hr />
      <CategoryBloletRecommend />
    </aside>
  );
}
