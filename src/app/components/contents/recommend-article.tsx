import ArticleCard from './article-card';
import ContentsWrapper from './contents-wrapper';

const article = [
  {
    id: 1,
    thumbnailUrl: '/path/to/thumbnail1.jpg',
    author: '안경을 얹어라',
    time: 5,
    title: '블로그를 잘 쓰는 방법! 바로~ 많이 쓰기',
    description: '파워블로거의 꿀팁 대방출',
    tags: ['글쓰기', '블로그', '파워블로거'],
    link: '/blog/how-to-write-well',
  },
  {
    id: 2,
    thumbnailUrl: '/path/to/thumbnail2.jpg',
    author: '코딩소년',
    time: 7,
    title: 'React 개발자가 반드시 알아야 할 5가지',
    description: '프론트엔드 개발 필수 지식 정리',
    tags: ['React', 'JavaScript', 'Frontend'],
    link: '/blog/react-must-know',
  },
  {
    id: 3,
    thumbnailUrl: '/path/to/thumbnail3.jpg',
    author: '디자인마스터',
    time: 4,
    title: '디자인 감각을 키우는 3가지 방법',
    description: '초보도 쉽게 따라하는 디자인 팁',
    tags: ['디자인', 'UI/UX', '크리에이티브'],
    link: '/blog/design-tips',
  },
  {
    id: 4,
    thumbnailUrl: '/path/to/thumbnail4.jpg',
    author: '데이터드리븐',
    time: 6,
    title: '데이터 분석으로 블로그 글 최적화하기',
    description: '구글 애널리틱스를 활용한 콘텐츠 전략',
    tags: ['데이터분석', 'SEO', '콘텐츠마케팅'],
    link: '/blog/data-driven-blog',
  },
  {
    id: 5,
    thumbnailUrl: '/path/to/thumbnail5.jpg',
    author: '여행작가',
    time: 3,
    title: '여행 블로그 글쓰기: 사진과 글의 황금비율',
    description: '읽는 재미와 보는 재미를 동시에!',
    tags: ['여행', '블로그', '사진'],
    link: '/blog/travel-writing',
  },
  {
    id: 6,
    thumbnailUrl: '/path/to/thumbnail6.jpg',
    author: '커피애호가',
    time: 4,
    title: '카페 리뷰 블로그를 시작하는 방법',
    description: '커피와 카페 분위기를 글로 담는 꿀팁',
    tags: ['카페', '리뷰', '블로그'],
    link: '/blog/cafe-review-tips',
  },
  {
    id: 7,
    thumbnailUrl: '/path/to/thumbnail7.jpg',
    author: '테크리뷰어',
    time: 8,
    title: 'AI 시대에 블로그는 여전히 유효할까?',
    description: 'ChatGPT와 함께하는 블로그 전략',
    tags: ['AI', '블로그', '미래'],
    link: '/blog/blog-in-ai-era',
  },
  {
    id: 8,
    thumbnailUrl: '/path/to/thumbnail8.jpg',
    author: '건강전도사',
    time: 5,
    title: '헬스 블로그 운영으로 얻은 3가지 장점',
    description: '운동과 글쓰기의 시너지 효과',
    tags: ['헬스', '운동', '블로그'],
    link: '/blog/fitness-blog-benefits',
  },
];

export default function RecommendArticle() {
  return (
    <ContentsWrapper title='블로기님을 위한 추천 아티클'>
      <article className='grid w-full grid-cols-4 gap-x-7 gap-y-[70px]'>
        {article.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </article>
    </ContentsWrapper>
  );
}
