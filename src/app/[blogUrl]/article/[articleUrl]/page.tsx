import { DetailTopBar } from '@/features/article/components/detail-top-bar';

export default function ArticleDetailPage() {
  return (
    <>
      <DetailTopBar />
      <div className='mx-auto min-h-screen max-w-[1280px] bg-white'>
        {/* 블로그 헤더 */}
        <header className='relative w-full overflow-hidden'>
          {/* 2:1 비율 컨테이너 */}
          <div className='relative aspect-[1.91/1] w-full'>
            {/* 배경 이미지 */}
            <div
              className='absolute inset-0 bg-cover bg-center'
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')`,
              }}
            />

            {/* 그라데이션 오버레이 */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />

            {/* 콘텐츠 오버레이 */}
            <div className='absolute inset-0 flex flex-col justify-end p-8 md:p-12'>
              <div className='max-w-4xl'>
                {/* 제목 */}
                <h1 className='mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl'>
                  효과적인 글쓰기의 기술
                </h1>

                {/* 메타 정보 */}
                <div className='flex items-center space-x-4 text-white/90'>
                  <div className='flex items-center space-x-2'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-white/20'>
                      <span className='text-sm font-medium text-white'>홍</span>
                    </div>
                    <span className='text-sm font-medium'>홍길동</span>
                  </div>
                  <span className='text-white/60'>•</span>
                  <span className='text-sm text-white/90'>2024년 5월 24일 1:35</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className='pb-20'>
          {/* 글쓰기 기본 원칙 섹션 */}
          <div className='mx-auto max-w-4xl px-8 py-12'>
            <section className='mb-16'>
              <h2 className='mb-6 text-2xl font-bold text-gray-900'>글쓰기의 기본 원칙</h2>
              <p className='mb-8 leading-relaxed text-gray-700'>
                좋은 글을 쓰기 위해서는 명확한 주제와 일관성 있는 메시지를 유지하는 것이 중요합니다.
                독자가 쉽게 이해할 수 있도록 구조적이고 논리적인 글쓰기를 시작해보세요.
              </p>
            </section>

            <section className='mb-16'>
              <h3 className='mb-4 text-xl font-semibold text-gray-900'>1. 명확한 목적 설정하기</h3>
              <p className='mb-6 leading-relaxed text-gray-700'>
                글을 쓰기 전에 무엇을 전달하고자 하는지 명확한 목적을 설정해야 합니다. 독자에게
                전달하고자 하는 핵심 메시지를 정확하게 파악하고 이를 중심으로 글의 구조를 구성해야
                합니다.
              </p>
            </section>

            <section className='mb-16'>
              <h3 className='mb-4 text-xl font-semibold text-gray-900'>2. 독자 중심의 사고</h3>
              <div className='mb-6 rounded-lg bg-blue-50 p-6'>
                <p className='leading-relaxed text-gray-700'>
                  독자가 이해하기 쉬운 구조를 만들기 위해서는 다음 사항들을 고려해야 합니다:
                </p>
                <ul className='mt-4 list-disc space-y-2 pl-6 text-gray-700'>
                  <li>독자의 배경지식 수준 고려하기</li>
                  <li>복잡한 용어나 개념에 대한 명확한 설명</li>
                  <li>독자의 관점에서 흥미로운 요소 포함</li>
                </ul>
              </div>
            </section>

            <section className='mb-16'>
              <h3 className='mb-4 text-xl font-semibold text-gray-900'>3. 구조적 글쓰기</h3>
              <p className='mb-6 leading-relaxed text-gray-700'>
                좋은 글은 명확한 구조를 가지고 있습니다. 서론-본론-결론의 기본 구조를 바탕으로 하되,
                각 단락이 유기적으로 연결되도록 구성해야 합니다.
              </p>
            </section>

            {/* 스크롤 테스트용 추가 콘텐츠 */}
            {Array.from({ length: 5 }, (_, i) => (
              <section key={i} className='mb-16'>
                <h3 className='mb-4 text-xl font-semibold text-gray-900'>
                  {i + 4}. 추가 글쓰기 팁 {i + 1}
                </h3>
                <div className='rounded-lg bg-gray-50 p-6'>
                  <p className='leading-relaxed text-gray-700'>
                    글쓰기 실력을 향상시키기 위해서는 꾸준한 연습이 필요합니다. 매일 조금씩이라도
                    글을 써보고, 다른 사람의 글을 읽으며 좋은 표현과 구조를 학습해보세요. 또한
                    피드백을 적극적으로 받아들이고 개선해 나가는 자세가 중요합니다.
                  </p>
                </div>
              </section>
            ))}
          </div>

          <div className='py-20 text-center'>
            <h2 className='mb-4 text-3xl font-bold'>글의 마무리</h2>
            <p className='text-gray-600'>
              좋은 글쓰기는 하루아침에 완성되지 않습니다. 꾸준한 노력이 핵심입니다! ✍️
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
