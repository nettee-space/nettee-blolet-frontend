//TODO 동적 데이터 Props 전달로 개선 필요

export function TitleSection() {
  return (
    <header className='relative w-full overflow-hidden'>
      <div className='relative aspect-[1.91/1] w-full'>
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
            <h1 className='mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl'>
              효과적인 글쓰기의 기술
            </h1>
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
  );
}
