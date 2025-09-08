import ContentsWrapper from './contents-wrapper';
import TrendsItem from './trends-item';

const trends = [
  { rank: 1, title: '뜨거운 광선 쏟아져 앗 따끔해', link: '/' },
  { rank: 2, title: '눈부셔 살짝 찌푸린 눈 선글래스', link: '/' },
  { rank: 3, title: '얼음을 깨문 입 속 와작 얼얼해', link: '/' },
  { rank: 4, title: '하늘은 파랗다 못해 투명해져', link: '/' },
];
export default function TrendsList() {
  return (
    <ContentsWrapper title='주간 블로렛 트렌드' className='flex-1'>
      <article>
        <ul className='flex flex-col gap-5'>
          {trends.map((trend, id) => (
            <TrendsItem key={id} Item={trend} />
          ))}
        </ul>
      </article>
    </ContentsWrapper>
  );
}
