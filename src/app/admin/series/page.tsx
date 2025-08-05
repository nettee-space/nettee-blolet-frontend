'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

export default function SeriesPage() {
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [seriesToDelete, setSeriesToDelete] = useState<string | null>(null);

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

  const confirmDeleteSeries = (seriesId: string) => {
    setSeriesToDelete(seriesId);
    setIsDeleteModalOpen(true);
    setOpenPopoverId(null);
  };

  const handleDeleteSeries = async () => {
    if (!seriesToDelete) return;

    try {
      const response = await fetch(`${BASE_URL}/series/${seriesToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setSeriesList(seriesList.filter((series) => series.id !== seriesToDelete));
        console.log('시리즈가 성공적으로 삭제되었습니다.');
      } else {
        console.error('시리즈 삭제 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('API 요청 중 오류가 발생했습니다:', error);
    }

    setIsDeleteModalOpen(false);
    setSeriesToDelete(null);
  };

  const handleAddSeries = () => router.push('/admin/series/add');

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
        <div className='grid h-12 grid-cols-[40px_1fr_120px_120px_120px_140px_40px] items-center gap-4 border-b border-[#CCCCCC] px-4 text-sm font-medium text-gray-700'>
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
                className='grid h-12 grid-cols-[40px_1fr_120px_120px_120px_140px_40px] gap-4 border-b border-[#CCCCCC] px-4 text-sm transition-colors last:border-b-0'
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
                  <Popover
                    open={openPopoverId === series.id}
                    onOpenChange={(open) => setOpenPopoverId(open ? series.id : null)}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8 text-gray-400 hover:bg-[#F2F2F2]'
                      >
                        <Image src='/icons/more.svg' alt='메뉴' width={32} height={32} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className='w-[120px] px-2 py-3 shadow-[0px_0px_4px_0px_#00000040]'
                      align='end'
                    >
                      <div className='flex flex-col gap-y-1.5'>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-8 justify-start gap-1 px-2 text-sm font-normal text-black hover:bg-gray-50'
                          onClick={() => {
                            setOpenPopoverId(null);
                            router.push(`/admin/series/edit/${series.id}`);
                          }}
                        >
                          <Image src='/icons/edit.svg' alt='편집' width={16} height={16} />
                          편집
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-8 justify-start gap-1 px-2 text-sm font-normal text-[#F64646] hover:bg-gray-50 hover:text-[#F64646]'
                          onClick={() => confirmDeleteSeries(series.id)}
                        >
                          <Image src='/icons/trash.svg' alt='삭제' width={16} height={16} />
                          삭제
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className='sm:max-w-[350px]' showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className='text-center text-lg font-medium text-black'>
              시리즈를 삭제하시겠습니까?
            </DialogTitle>
          </DialogHeader>
          <div className='text-center text-sm font-normal text-black'>
            시리즈만 삭제되며, 해당 시리즈 포함된 글은 삭제되지 않습니다. 삭제된 시리즈는 복구할 수
            없습니다.
          </div>
          <DialogFooter className='flex gap-2 pt-1'>
            <Button
              type='button'
              onClick={handleDeleteSeries}
              className='h-12 flex-1 rounded-lg bg-[#F2F2F2] px-4 text-sm font-medium text-black hover:bg-[#E8E8E8]'
            >
              삭제
            </Button>
            <Button
              type='button'
              onClick={() => setIsDeleteModalOpen(false)}
              className='h-12 flex-1 rounded-lg bg-[#F2F2F2] px-4 text-sm font-medium text-black hover:bg-[#E8E8E8]'
            >
              취소
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
