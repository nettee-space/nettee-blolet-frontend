'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Article, dummyPosts } from '@/lib/dummy-data';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type SeriesFormData = z.infer<typeof seriesFormSchema>;

const seriesFormSchema = z.object({
  seriesName: z.string().min(1, '시리즈 이름을 입력해주세요.').max(30, '최대 30자 초과'),
  seriesDescription: z.string().optional(),
});

interface SeriesResponse {
  series: {
    id: string;
    blogId: string;
    title: string;
    description?: string;
    banner?: string;
    seriesArticleSummaryList?: Article[];
    createdAt: string;
    updatedAt: string;
  };
}

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export default function SeriesEditPage() {
  const router = useRouter();
  const params = useParams();
  const seriesId = params.id as string;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SeriesFormData>({
    resolver: zodResolver(seriesFormSchema),
    defaultValues: {
      seriesName: '',
      seriesDescription: '',
    },
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [seriesData, setSeriesData] = useState<SeriesResponse['series'] | null>(null);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [allPosts, setAllPosts] = useState<Article[]>(dummyPosts);
  const [seriesPosts, setSeriesPosts] = useState<Article[]>([]);
  const [draggedPostId, setDraggedPostId] = useState<string | null>(null);
  const [dragOverContainer, setDragOverContainer] = useState<'all' | 'series' | null>(null);
  const [selectedPostIds, setSelectedPostIds] = useState<string[]>([]);
  const [rangeSelectionAnchor, setRangeSelectionAnchor] = useState<{
    container: 'all' | 'series';
    index: number;
  } | null>(null);
  const [isDeleteImageModalOpen, setIsDeleteImageModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchSeriesData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/series/${seriesId}`);
        if (response.ok) {
          const data: SeriesResponse = await response.json();
          setSeriesData(data.series);

          // 폼 값 설정
          setValue('seriesName', data.series.title);
          setValue('seriesDescription', data.series.description);
          if (data.series.banner) setBannerPreview(data.series.banner);
          if (data.series.seriesArticleSummaryList) {
            setSeriesPosts(data.series.seriesArticleSummaryList);
            // 시리즈에 이미 포함된 게시글은 allPosts에서 제외
            const seriesArticleIds = data.series.seriesArticleSummaryList.map(
              (item) => item.articleId,
            );
            setAllPosts(dummyPosts.filter((post) => !seriesArticleIds.includes(post.articleId)));
          }
        } else {
          console.error('시리즈 데이터를 불러오는데 실패했습니다.');
          router.push('/admin/series');
        }
      } catch (error) {
        console.error('API 요청 중 오류가 발생했습니다:', error);
        router.push('/admin/series');
      } finally {
        setLoading(false);
      }
    };

    if (seriesId) fetchSeriesData();
  }, [seriesId, setValue, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImage(file);
      const previewUrl = URL.createObjectURL(file);
      setBannerPreview(previewUrl);
    }
  };

  const handleDeleteImage = () => {
    setBannerImage(null);
    setBannerPreview(null);
    setIsDeleteImageModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPostIds([]);
        setRangeSelectionAnchor(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCancel = () => {
    router.push('/admin/series');
  };

  // 게시글 (다중) 선택 클릭 핸들러
  const handlePostClick = (e: React.MouseEvent, post: Article, container: 'all' | 'series') => {
    e.preventDefault();

    const currentIndex =
      container === 'all'
        ? allPosts.findIndex((p) => p.articleId === post.articleId)
        : seriesPosts.findIndex((p) => p.articleId === post.articleId);

    // Shift 클릭: 범위 선택
    if (e.shiftKey && rangeSelectionAnchor && rangeSelectionAnchor.container === container) {
      const startIndex = Math.min(rangeSelectionAnchor.index, currentIndex);
      const endIndex = Math.max(rangeSelectionAnchor.index, currentIndex);

      const currentPosts = container === 'all' ? allPosts : seriesPosts;
      const postsInRange = currentPosts.slice(startIndex, endIndex + 1);

      const updatedSelection = postsInRange.map((post) => post.articleId);

      setSelectedPostIds(updatedSelection);
      return;
    }

    // Ctrl/Cmd 클릭: 개별 선택/해제
    if (e.ctrlKey || e.metaKey) {
      const selectedInAll = selectedPostIds.some((id) => allPosts.some((p) => p.articleId === id));
      const selectedInSeries = selectedPostIds.some((id) =>
        seriesPosts.some((p) => p.articleId === id),
      );

      if (
        (container === 'all' && selectedInSeries && !selectedInAll) ||
        (container === 'series' && selectedInAll && !selectedInSeries)
      ) {
        setSelectedPostIds([post.articleId]);
        setRangeSelectionAnchor({ container, index: currentIndex });
        return;
      }

      if (selectedPostIds.includes(post.articleId)) {
        setSelectedPostIds(selectedPostIds.filter((id) => id !== post.articleId));
      } else {
        setSelectedPostIds([...selectedPostIds, post.articleId]);
      }
      return;
    }

    // 일반 클릭: 단일 선택
    setSelectedPostIds([post.articleId]);
    setRangeSelectionAnchor({ container, index: currentIndex });
  };

  // 드래그 관련 핸들러들
  const handleDragOver = (e: React.DragEvent, container: 'all' | 'series') => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverContainer(container);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOverContainer(null);
  };

  const handleDrop = (e: React.DragEvent, targetContainer: 'all' | 'series') => {
    e.preventDefault();

    const draggedPostIdFromData = e.dataTransfer.getData('text/plain');

    const postsToMove =
      selectedPostIds.includes(draggedPostIdFromData) && selectedPostIds.length > 1
        ? selectedPostIds
        : [draggedPostIdFromData];

    if (targetContainer === 'series') {
      const postsToMoveObjects = allPosts.filter((post) => postsToMove.includes(post.articleId));
      if (postsToMoveObjects.length > 0) {
        setAllPosts(allPosts.filter((post) => !postsToMove.includes(post.articleId)));
        setSeriesPosts([...seriesPosts, ...postsToMoveObjects]);
      }
    } else if (targetContainer === 'all') {
      const postsToMoveObjects = seriesPosts.filter((post) => postsToMove.includes(post.articleId));
      if (postsToMoveObjects.length > 0) {
        setSeriesPosts(seriesPosts.filter((post) => !postsToMove.includes(post.articleId)));
        setAllPosts([...allPosts, ...postsToMoveObjects]);
      }
    }

    setSelectedPostIds([]);
    setDraggedPostId(null);
    setDragOverContainer(null);
  };

  const handleDragStart = (e: React.DragEvent, postId: string) => {
    setDraggedPostId(postId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', postId);

    if (!selectedPostIds.includes(postId)) setSelectedPostIds([postId]);
  };

  const handleDragEnd = () => {
    setDraggedPostId(null);
    setDragOverContainer(null);
  };

  const onSubmit = async (data: SeriesFormData) => {
    if (!seriesData) return;

    try {
      const seriesArticleList = seriesPosts.map((post, index) => ({
        draftId: post.draftId,
        articleId: post.articleId,
        displayOrder: index + 1,
      }));

      let bannerBase64 = '';
      if (bannerImage) {
        bannerBase64 = await convertToBase64(bannerImage);
      } else if (bannerPreview && !bannerImage) {
        // 기존 배너를 유지하는 경우
        bannerBase64 = bannerPreview;
      }

      const requestData = {
        blogId: seriesData.blogId,
        title: data.seriesName,
        description: data.seriesDescription || '',
        banner: bannerBase64,
        seriesArticleList,
      };

      console.log(requestData);

      const response = await fetch(`${BASE_URL}/series/${seriesId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log('시리즈가 성공적으로 수정되었습니다.');
        router.push('/admin/series');
      } else {
        console.error('시리즈 수정 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('API 요청 중 오류가 발생했습니다:', error);
    }
  };

  return loading ? (
    <div className='mx-auto w-full max-w-5xl'>
      <div className='flex h-[400px] items-center justify-center'>
        <div className='text-center text-gray-500'>로딩 중...</div>
      </div>
    </div>
  ) : !seriesData ? (
    <div className='mx-auto w-full max-w-5xl'>
      <div className='flex h-[400px] items-center justify-center'>
        <div className='text-center text-gray-500'>시리즈를 찾을 수 없습니다.</div>
      </div>
    </div>
  ) : (
    <div className='mx-auto w-full max-w-5xl'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex items-center justify-between text-black'>
          <h1 className='text-2xl font-bold'>시리즈 편집</h1>
          <div className='flex gap-3'>
            <Button
              type='button'
              onClick={handleCancel}
              variant='outline'
              className='rounded-full border-black px-5 py-1 text-black hover:bg-gray-50'
            >
              취소
            </Button>
            <Button
              type='submit'
              className='rounded-full bg-[#4D4D4D] px-5 py-1 font-semibold text-white hover:bg-[#3D3D3D]'
            >
              저장하기
            </Button>
          </div>
        </div>

        <Separator className='my-8 bg-[#CCCCCC]' />

        <div className='mb-6'>
          <label className='mb-2 block text-sm font-medium text-black'>시리즈 배너</label>
          <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className='hidden'
            id='banner-upload'
          />
          <label
            htmlFor='banner-upload'
            className='flex h-40 w-full cursor-pointer items-center justify-center rounded-lg border border-[#CCCCCC] bg-white transition-colors hover:bg-[#F2F2F2]'
          >
            {bannerPreview ? (
              <div className='relative h-full w-full'>
                <Image
                  src={bannerPreview}
                  alt='시리즈 배너 미리보기'
                  fill
                  className='rounded-lg object-cover'
                />
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDeleteImageModalOpen(true);
                  }}
                  className='absolute top-2 right-2 h-8 w-8 rounded-full bg-[#E6E6E9] text-gray-600 backdrop-blur-sm transition-all hover:bg-[#D0D0D3]'
                >
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M18 6L6 18M6 6l12 12' />
                  </svg>
                </Button>
              </div>
            ) : (
              <div className='text-center'>
                <div className='mb-3 flex justify-center'>
                  <Image
                    src='/icons/image-upload.svg'
                    alt='이미지 업로드'
                    width={40}
                    height={40}
                    className='text-gray-400'
                  />
                </div>
                <p className='mb-1 text-sm font-medium text-black'>
                  이미지를 업로드 하려면 클릭 또는 파일을 드래그 해주세요.
                </p>
                <p className='text-xs text-gray-400'>이미지 권장 크기 0000x0000 픽셀</p>
              </div>
            )}
          </label>
        </div>

        <div className='mb-6'>
          <div className='mb-2 flex items-center gap-x-2'>
            <label className='text-sm font-medium text-black'>시리즈 이름</label>
            {errors.seriesName && (
              <p className='text-sm font-medium text-[#F64646]'>{errors.seriesName.message}</p>
            )}
          </div>
          <Input
            {...register('seriesName')}
            placeholder='이름을 입력해주세요. 최대 30글자'
            className={`border-[#CCCCCC] focus:outline-none focus-visible:border-[#CCCCCC] focus-visible:ring-0 focus-visible:outline-none ${
              errors.seriesName && 'border-[#F64646] focus-visible:border-[#F64646]'
            }`}
          />
        </div>

        <div className='mb-8'>
          <label className='mb-2 block text-sm font-medium text-black'>시리즈 설명</label>
          <Textarea
            {...register('seriesDescription')}
            placeholder='시리즈에 대한 설명을 입력해주세요. 최대 ???자'
            className='min-h-[100px] border-[#CCCCCC] focus:outline-none focus-visible:border-[#CCCCCC] focus-visible:ring-0 focus-visible:outline-none'
          />
        </div>

        <div className='mb-6'>
          <label className='mb-2 block text-sm font-medium text-black'>게시글 관리</label>
          <div className='flex flex-col items-center gap-2 sm:flex-row'>
            <div
              className={`h-80 w-full overflow-y-auto rounded-lg border bg-white transition-all duration-200 sm:flex-1 ${
                dragOverContainer === 'all' ? 'border-[#999999]' : 'border-[#CCCCCC]'
              }`}
              onDragOver={(e) => handleDragOver(e, 'all')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'all')}
            >
              <div className='sticky top-0 flex items-center gap-2 border-b border-gray-200 bg-white px-4 py-3'>
                <span className='text-sm font-medium text-black'>전체 게시글</span>
                <span className='text-sm text-[#999999]'>{allPosts.length}</span>
              </div>
              {allPosts.map((post) => (
                <div
                  key={post.articleId}
                  draggable
                  onDragStart={(e) => handleDragStart(e, post.articleId)}
                  onDragEnd={handleDragEnd}
                  onClick={(e) => handlePostClick(e, post, 'all')}
                  className={`flex cursor-move items-center border-b border-gray-100 px-4 py-3 transition-all duration-200 last:border-b-0 ${
                    selectedPostIds.includes(post.articleId) ? 'bg-[#F2F2F2]' : 'hover:bg-gray-50'
                  } ${draggedPostId && selectedPostIds.includes(post.articleId) && 'scale-95 opacity-50'}`}
                >
                  <div className='flex items-center gap-2'>
                    <Image
                      src='/icons/drag.svg'
                      alt='드래그'
                      width={16}
                      height={16}
                      className='size-6'
                    />
                    <span className='text-sm text-black'>
                      {post.articleTitle || `게시글 ${post.articleId}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className='flex items-center justify-center'>
              <Image
                src='/icons/exchange.svg'
                alt='게시글 이동'
                width={24}
                height={24}
                className='size-8 rotate-90 sm:rotate-0'
              />
            </div>

            <div
              className={`h-80 w-full overflow-y-auto rounded-lg border bg-white transition-all duration-200 sm:flex-1 ${
                dragOverContainer === 'series' ? 'border-[#999999]' : 'border-[#CCCCCC]'
              }`}
              onDragOver={(e) => handleDragOver(e, 'series')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'series')}
            >
              <div className='sticky top-0 flex items-center gap-2 border-b border-gray-200 bg-white px-4 py-3'>
                <span className='text-sm font-medium text-black'>현재 시리즈</span>
                <span className='text-sm text-[#999999]'>{seriesPosts.length}</span>
              </div>
              {seriesPosts.length === 0 ? (
                <div className='flex h-[calc(100%-45px)] items-center justify-center text-center'>
                  <div>
                    <p className='text-sm text-[#999999]'>
                      왼쪽 글 목록을 드래그하여
                      <br />
                      시리즈에 추가해보세요
                    </p>
                  </div>
                </div>
              ) : (
                seriesPosts.map((post) => (
                  <div
                    key={post.articleId}
                    draggable
                    onDragStart={(e) => handleDragStart(e, post.articleId)}
                    onDragEnd={handleDragEnd}
                    onClick={(e) => handlePostClick(e, post, 'series')}
                    className={`flex cursor-move items-center border-b border-gray-100 px-4 py-3 transition-all duration-200 last:border-b-0 ${
                      selectedPostIds.includes(post.articleId) ? 'bg-[#F2F2F2]' : 'hover:bg-gray-50'
                    } ${
                      draggedPostId && selectedPostIds.includes(post.articleId)
                        ? 'scale-95 opacity-30'
                        : ''
                    }`}
                  >
                    <div className='flex items-center gap-2'>
                      <Image
                        src='/icons/drag.svg'
                        alt='드래그'
                        width={16}
                        height={16}
                        className='size-6'
                      />
                      <span className='text-sm text-black'>
                        {post.articleTitle || `게시글 제목 없음 ${post.articleId}`}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </form>

      {/* 이미지 삭제 확인 모달 */}
      <Dialog open={isDeleteImageModalOpen} onOpenChange={setIsDeleteImageModalOpen}>
        <DialogContent className='sm:max-w-[425px]' showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className='text-center text-lg font-medium text-black'>
              등록한 이미지를 삭제 하시겠습니까?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className='flex gap-2 pt-4'>
            <Button
              type='button'
              onClick={handleDeleteImage}
              className='flex-1 rounded-lg bg-[#F2F2F2] px-4 py-3 text-black hover:bg-[#E8E8E8]'
            >
              삭제
            </Button>
            <Button
              type='button'
              onClick={() => setIsDeleteImageModalOpen(false)}
              className='flex-1 rounded-lg bg-[#F2F2F2] px-4 py-3 text-black hover:bg-[#E8E8E8]'
            >
              취소
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
