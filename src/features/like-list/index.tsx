import ArticleCard from '@/app/components/contents/article-card';

const article = [
  {
    id: 1,
    thumbnailUrl: '/images/demonslayer/tanjiro-nezuko.jpg',
    author: '카마도 탄지로',
    time: 5,
    title: '물의 호흡 기초: 10일 루틴으로 감각 깨우기',
    description: '기초 체력과 호흡 리듬부터 검의 흐름까지, 초심자를 위한 루틴 정리',
    tags: ['귀멸의칼날', '물의호흡', '수련'],
    link: '/blog/water-breathing-basics',
  },
  {
    id: 2,
    thumbnailUrl: '/images/demonslayer/zenitsu.jpg',
    author: '아가츠마 젠이츠',
    time: 7,
    title: '벽력일섬: 한 번에 끝내는 낙뢰 스텝',
    description: '두려움을 에너지로 바꾸는 법과 실전에서의 타이밍 잡기',
    tags: ['번개의호흡', '전투팁', '멘탈'],
    link: '/blog/thunderclap-and-flash',
  },
  {
    id: 3,
    thumbnailUrl: '/images/demonslayer/inosuke.jpg',
    author: '하시비라 이노스케',
    time: 4,
    title: '짐승의 감각 키우기: 숲에서 배우는 거리감',
    description: '본능을 단련하는 지형 활용법과 양손검 그립 변형',
    tags: ['짐승의호흡', '전투감각', '그립'],
    link: '/blog/beast-instinct-training',
  },
  {
    id: 4,
    thumbnailUrl: '/images/demonslayer/giyu.jpg',
    author: '토미오카 기유',
    time: 6,
    title: '호흡은 흐름이다: 물처럼 절제하는 검술',
    description: '불필요한 동작을 덜어내는 흐름 제어와 무심의 자세',
    tags: ['주', '물의호흡', '검술철학'],
    link: '/blog/flow-like-water',
  },
  {
    id: 5,
    thumbnailUrl: '/images/demonslayer/kyojuro.jpg',
    author: '렌고쿠 쿄쥬로',
    time: 3,
    title: '불꽃의 마음가짐: 뜨겁게, 그러나 흔들림 없이',
    description: '전투 전 루틴과 체온·호흡을 끌어올리는 집중법',
    tags: ['불의호흡', '집중', '루틴'],
    link: '/blog/flame-heartset',
  },
  {
    id: 6,
    thumbnailUrl: '/images/demonslayer/shinobu.jpg',
    author: '코쵸우 시노부',
    time: 4,
    title: '독과 검: 가벼운 검으로 만드는 확실한 결과',
    description: '독 조합, 주입 타이밍, 경량 검술의 이점',
    tags: ['곤충의호흡', '독사용', '테크닉'],
    link: '/blog/poison-and-precision',
  },
  {
    id: 7,
    thumbnailUrl: '/images/demonslayer/muzan.jpg',
    author: '키부츠지 무잔',
    time: 8,
    title: '밤의 지배자: 약점 없는 구조 만들기',
    description: '조직 운영, 정보 단절, 리스크 제어의 3원칙',
    tags: ['상현', '전략', '리스크관리'],
    link: '/blog/architect-of-the-night',
  },
  {
    id: 8,
    thumbnailUrl: '/images/demonslayer/nezuko.jpg',
    author: '카마도 네즈코',
    time: 5,
    title: '혈귀술 화혈: 팀을 살리는 순간 폭발력',
    description: '화염 강화, 상황별 사용 각도, 연계 예시 모음',
    tags: ['혈귀술', '지원형전투', '연계'],
    link: '/blog/blood-demon-art-flame',
  },
];

export default function LikeList() {
  return (
    <article className='mx-auto'>
      <ul className='mx-auto grid w-fit grid-cols-4 gap-x-4 gap-y-[70px]'>
        {article.map((art) => (
          <li key={art.id}>
            <ArticleCard article={art} />
          </li>
        ))}
      </ul>
    </article>
  );
}
