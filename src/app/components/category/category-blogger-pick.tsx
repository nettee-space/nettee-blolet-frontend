'use client';

import AddCategory from './add-category';
import CategoryList from './category-list';

const categories = [
  { id: 1, link: '/UIUX', category: 'UIUX' },
  { id: 2, link: 'bibim', category: '비빔냉면과 물냉면' },
  { id: 3, link: 'ham', category: '함흥냉면과 평양냉면' },
];

export default function CategoryBloggerPick() {
  return (
    <CategoryList title='블로거님의 관심 카테고리' list={categories}>
      <AddCategory />
    </CategoryList>
  );
}
