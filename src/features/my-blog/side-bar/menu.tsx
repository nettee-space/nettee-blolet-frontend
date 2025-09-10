import CategoryList from '@/app/components/category/category-list';

const menuList = [
  { id: 1, category: '홈', link: '/' },
  { id: 2, category: '시리즈', link: '/' },
];

export default function Menu() {
  return <CategoryList title='menu' list={menuList} />;
}
