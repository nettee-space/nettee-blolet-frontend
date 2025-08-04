'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface Series {
  id: string;
  blogId: string;
  title: string;
  displayOrder: number | null;
  createdAt: string;
  updatedAt: string;
}

interface SeriesResponse {
  seriesList: Series[];
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function SeriesPage() {
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/blogs/1/series`);
        if (response.ok) {
          const data: SeriesResponse = await response.json();
          setSeriesList(data.seriesList);
        } else {
          console.error('시리즈 목록을 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('API 요청 중 오류가 발생했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, []);

  const handleAddSeries = () => router.push('/admin/series/add');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className='mx-auto w-full max-w-5xl'>
      <div className='flex items-center justify-between text-black'>
        <div className='space-y-1'>
          <h1 className='text-2xl font-bold'>시리즈 관리</h1>
          <p className='text-sm'>시리즈 순서를 변경하고 주제 연결을 설정할 수 있습니다.</p>
        </div>
        {seriesList.length > 0 && (
          <Button
            onClick={handleAddSeries}
            className='rounded-full bg-[#4D4D4D] px-5 py-1 font-semibold text-white hover:bg-[#3D3D3D]'
            disabled={loading}
          >
            추가하기
          </Button>
        )}
      </div>

      <Separator className='my-8 bg-[#CCCCCC]' />

      <div className='mb-3'>
        <div className='flex items-center gap-1'>
          <span className='text-sm text-black'>전체</span>
          <span className='text-sm text-[#999999]'>{loading ? '...' : seriesList.length}</span>
        </div>
      </div>

      <div className='overflow-hidden rounded-lg border border-[#CCCCCC] bg-white text-black'>
        <div className='grid grid-cols-[40px_1fr_120px_120px_120px_140px_40px] gap-4 border-b border-gray-200 px-4 py-2 text-sm font-medium text-gray-700'>
          <div />
          <div>시리즈명</div>
          <div className='text-center'>게시글 수</div>
          <div className='text-center'>조회수</div>
          <div className='text-center'>좋아요수</div>
          <div className='text-center'>마지막 게시일</div>
          <div />
        </div>

        {loading ? (
          <div className='flex h-[300px] items-center justify-center bg-gray-50/50'>
            <div className='text-center text-gray-500'>로딩 중...</div>
          </div>
        ) : seriesList.length === 0 ? (
          <div className='flex h-[300px] items-center justify-center bg-gray-50/50'>
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
        ) : (
          <>
            {seriesList.map((series) => (
              <div
                key={series.id}
                className='grid grid-cols-[40px_1fr_120px_120px_120px_140px_40px] gap-4 border-b border-gray-100 px-4 py-3 text-sm transition-colors last:border-b-0 hover:bg-gray-50'
              >
                <div className='flex items-center justify-center'>
                  <Image
                    src='/icons/drag.svg'
                    alt='드래그'
                    width={30}
                    height={30}
                    className='text-gray-400'
                  />
                </div>
                <div className='flex items-center'>
                  <span className='font-medium text-black'>{series.title}</span>
                </div>
                <div className='flex items-center justify-center text-center text-gray-600'>99</div>
                <div className='flex items-center justify-center text-center text-gray-600'>
                  9999
                </div>
                <div className='flex items-center justify-center text-center text-gray-600'>
                  9999
                </div>
                <div className='flex items-center justify-center text-center text-gray-600'>
                  {formatDate(series.updatedAt)}
                </div>
                <div className='flex items-center justify-center'>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8 text-gray-400 hover:bg-transparent hover:text-gray-600'
                  >
                    <Image src='/icons/more.svg' alt='메뉴' width={32} height={32} />
                  </Button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
