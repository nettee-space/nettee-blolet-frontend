'use client';

import { useWindowScrollProgress } from '@/lib/hooks/use-window-scroll-progress';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

import { ScrollProgressBar } from './scroll-progress-bar';

export function DetailTopBar() {
  const progress = useWindowScrollProgress();
  const isAtTop = progress === 0;

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-50 flex h-20 items-center justify-center transition-all duration-300 ease-in-out ${
          isAtTop ? 'bg-transparent' : 'bg-white/95 shadow-sm backdrop-blur-sm'
        } `}
      >
        <div className='relative flex h-16 w-full max-w-[1280px] items-center justify-between px-6'>
          {/* 로고 */}
          <div className='flex items-center'>
            <span className='text-lg font-bold text-gray-900'>blolet</span>
          </div>

          {/* 메뉴 - 중앙 고정 */}
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    'flex w-85 items-center gap-5 overflow-hidden rounded-full border border-gray-200/40 shadow-md',
                    isAtTop ? 'bg-gray-200/40' : 'bg-white',
                  )}
                >
                  <span className='m-0.5 rounded-full bg-[#6b66f4] px-4 py-2 text-sm font-medium text-white'>
                    시리즈
                  </span>
                  <span className='group grow px-4 py-2 text-center text-sm font-medium text-gray-700'>
                    글쓰기 가이드
                  </span>
                  <span className='px-3'>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      className='ml-2 transition-transform group-data-[state=open]:rotate-180'
                    >
                      <path
                        d='M4 6L8 10L12 6'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className='w-85 rounded-2xl p-5 shadow-xl'
                align='center'
                sideOffset={16}
              >
                <ul>
                  <li className='group flex cursor-pointer flex-col gap-1 rounded-xl p-2.5 transition-colors hover:bg-[#F4F4F4]'>
                    <h3 className='text-base font-semibold text-gray-900'>
                      글쓰기의 시작: 이펙트하기
                    </h3>
                    <p className='text-sm text-gray-400'>2024년 5월 10일</p>
                  </li>
                  <li className='group flex cursor-pointer flex-col gap-1 rounded-xl p-2.5 transition-colors hover:bg-[#F4F4F4]'>
                    <h3 className='line-clamp-1 text-base font-semibold text-gray-900'>
                      독창적인 글쓰기의 기술: 독자를 모으는 방법 독창적인 글쓰기의 기술: 독자를
                      모으는 방법
                    </h3>
                    <p className='text-sm text-gray-400'>2024년 5월 10일</p>
                  </li>
                  <li className='group flex cursor-pointer flex-col gap-1 rounded-xl p-2.5 transition-colors hover:bg-[#F4F4F4]'>
                    <h3 className='text-base font-semibold text-gray-900'>
                      글쓰기 블록 극복하기: 작가의 고민해결법
                    </h3>
                    <p className='text-sm text-gray-400'>2024년 5월 10일</p>
                  </li>
                  <li className='group flex cursor-pointer flex-col gap-1 rounded-xl p-2.5 transition-colors hover:bg-[#F4F4F4]'>
                    <h3 className='text-base font-semibold text-gray-900'>
                      편집의 기술: 완성도 높은 글로 다듬기
                    </h3>
                    <p className='text-sm text-gray-400'>2024년 5월 10일</p>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>

          {/* 액션 그룹 */}
          <div className='flex items-center space-x-3'>
            <button className='flex items-center space-x-1.5 text-sm text-gray-600 transition-colors hover:text-gray-900'>
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
              >
                <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
              </svg>
              <span>330</span>
            </button>
            <button className='flex items-center space-x-1.5 text-sm text-gray-600 transition-colors hover:text-gray-900'>
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
              >
                <path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' />
              </svg>
              <span>330</span>
            </button>
            <button className='p-1.5 text-gray-600 transition-colors hover:text-gray-900'>
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
              >
                <polygon points='13,2 3,14 12,14 11,22 21,10 12,10 13,2' />
              </svg>
            </button>
            <button className='p-1.5 text-gray-600 transition-colors hover:text-gray-900'>
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
              >
                <circle cx='12' cy='12' r='1' />
                <circle cx='19' cy='12' r='1' />
                <circle cx='5' cy='12' r='1' />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* 프로그래스 바 */}
      <ScrollProgressBar progress={progress} />
    </>
  );
}
