'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function SeriesPage() {
  const router = useRouter();

  const handleAddSeries = () => {
    router.push('/admin/series/add');
  };

  return (
    <div className='mx-auto w-full max-w-5xl'>
      <div className='space-y-1 text-black'>
        <h1 className='text-2xl font-bold'>시리즈 관리</h1>
        <p className='text-sm'>시리즈 순서를 변경하고 추가 연결을 설정할 수 있습니다.</p>
      </div>

      <Separator className='my-8 bg-[#CCCCCC]' />

      <div className='mb-3'>
        <div className='flex items-center gap-1'>
          <span className='text-sm text-black'>전체</span>
          <span className='text-sm text-[#999999]'>0</span>
        </div>
      </div>

      <div className='flex h-[400px] items-center justify-center rounded-lg border border-[#CCCCCC] bg-gray-50/50'>
        <div className='max-w-md text-center'>
          <h3 className='mb-1 text-lg font-bold text-black'>아직 시리즈를 추가하지 않았어요</h3>
          <p className='mb-6 text-sm font-medium text-black'>
            시리즈를 추가하면 작성한 글을 그룹지어 관리할 수 있어요
          </p>
          <Button
            onClick={handleAddSeries}
            className='rounded-full bg-[#4D4D4D] px-5 py-1 font-semibold text-white hover:bg-[#3D3D3D]'
          >
            추가하기
          </Button>
        </div>
      </div>
    </div>
  );
}
