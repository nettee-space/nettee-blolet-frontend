'use client';

import CategoryList from './category-list';

const categories = [
  { id: 1, link: '/UIUX', category: 'AI' },
  { id: 2, link: 'bibim', category: '부승관과 부라보콘' },
  { id: 3, link: 'ham', category: '펭귄과 팽현숙' },
  { id: 4, link: 'ham', category: '나 평생 빵만 먹고 싶어' },
  { id: 5, link: 'ham', category: '나 평생 밥만 먹고 싶어' },
  { id: 6, link: 'ham', category: '바이브 코딩' },
  { id: 7, link: 'ham', category: 'Gnarly' },
  { id: 8, link: 'ham', category: 'Bobatea' },
  { id: 9, link: 'ham', category: 'Javascript' },
];

export default function CategoryBloletRecommend() {
  return <CategoryList title='블로렛이 추천하는 카테고리' list={categories} />;
}
