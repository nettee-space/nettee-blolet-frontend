export interface Article {
  seriesId: string;
  articleId: string;
  draftId: string;
  articleTitle: string | null;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export const dummyPosts: Article[] = [
  {
    seriesId: '',
    articleId: '1',
    draftId: '1',
    articleTitle: '물컵 위를 걷는 기분이 들었어.',
    displayOrder: 1073741824,
    createdAt: '2025-08-05T12:33:17.862Z',
    updatedAt: '2025-08-05T12:33:17.862Z',
  },
  {
    seriesId: '',
    articleId: '2',
    draftId: '2',
    articleTitle: '30글자수 기준 186px 고정',
    displayOrder: 1073741824,
    createdAt: '2025-08-05T12:33:17.862Z',
    updatedAt: '2025-08-05T12:33:17.862Z',
  },
  {
    seriesId: '',
    articleId: '3',
    draftId: '3',
    articleTitle: '안녕하세요',
    displayOrder: 1073741824,
    createdAt: '2025-08-05T12:33:17.862Z',
    updatedAt: '2025-08-05T12:33:17.862Z',
  },
  {
    seriesId: '',
    articleId: '4',
    draftId: '4',
    articleTitle: '땡개에요 오늘 멉방은 땡초닫발',
    displayOrder: 1073741824,
    createdAt: '2025-08-05T12:33:17.862Z',
    updatedAt: '2025-08-05T12:33:17.862Z',
  },
  {
    seriesId: '',
    articleId: '5',
    draftId: '5',
    articleTitle: '마싯게먹겠습니다~ 좋아요 구독',
    displayOrder: 1073741824,
    createdAt: '2025-08-05T12:33:17.862Z',
    updatedAt: '2025-08-05T12:33:17.862Z',
  },
  {
    seriesId: '',
    articleId: '6',
    draftId: '6',
    articleTitle: '통통통통 사후르',
    displayOrder: 1073741824,
    createdAt: '2025-08-05T12:33:17.862Z',
    updatedAt: '2025-08-05T12:33:17.862Z',
  },
  {
    seriesId: '',
    articleId: '7',
    draftId: '7',
    articleTitle: 'UIUX 회고',
    displayOrder: 1073741824,
    createdAt: '2025-08-05T12:33:17.862Z',
    updatedAt: '2025-08-05T12:33:17.862Z',
  },
  {
    seriesId: '',
    articleId: '8',
    draftId: '8',
    articleTitle: '사이드 프로젝트 1탄',
    displayOrder: 1073741824,
    createdAt: '2025-08-05T12:33:17.862Z',
    updatedAt: '2025-08-05T12:33:17.862Z',
  },
  {
    seriesId: '',
    articleId: '9',
    draftId: '9',
    articleTitle: '사이드 프로젝트 2탄',
    displayOrder: 1073741824,
    createdAt: '2025-08-05T12:33:17.862Z',
    updatedAt: '2025-08-05T12:33:17.862Z',
  },
  {
    seriesId: '',
    articleId: '10',
    draftId: '10',
    articleTitle: '사이드 프로젝트 3탄',
    displayOrder: 1073741824,
    createdAt: '2025-08-05T12:33:17.862Z',
    updatedAt: '2025-08-05T12:33:17.862Z',
  },
];
