'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const dummyPosts = [
  { id: 1, title: '물컵 위를 걷는 기분이 들었어.' },
  { id: 2, title: '30글자수 기준 186px 고정' },
  { id: 3, title: '안녕하세요' },
  { id: 4, title: '땡개에요 오늘 멉방은 땡초닫발' },
  { id: 5, title: '마싯게먹겠습니다~ 좋아요 구독' },
  { id: 6, title: '통통통통 사후르' },
  { id: 7, title: 'UIUX 회고' },
  { id: 8, title: '사이드 프로젝트 1탄' },
  { id: 9, title: '사이드 프로젝트 2탄' },
  { id: 10, title: '사이드 프로젝트 3탄' },
];

export default function SeriesPage() {
  const [isAddMode, setIsAddMode] = useState<boolean>(false);
  const [seriesName, setSeriesName] = useState<string>('');
  const [seriesDescription, setSeriesDescription] = useState<string>('');
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);

  const allPosts = dummyPosts.filter((post) => !selectedPosts.includes(post.id));
  const seriesPosts = dummyPosts.filter((post) => selectedPosts.includes(post.id));

  const handleAddPost = (postId: number) => {
    setSelectedPosts([...selectedPosts, postId]);
  };

  const handleRemovePost = (postId: number) => {
    setSelectedPosts(selectedPosts.filter((id) => id !== postId));
  };

  const handleSave = () => {
    setIsAddMode(false);
  };

  const handleCancel = () => {
    setIsAddMode(false);
    setSeriesName('');
    setSeriesDescription('');
    setSelectedPosts([]);
  };

  return isAddMode ? (
    <div className='mx-auto w-full max-w-5xl'>
      <div className='flex items-center justify-between text-black'>
        <h1 className='text-2xl font-bold'>시리즈 추가</h1>
        <Button
          onClick={handleSave}
          className='rounded-full bg-[#4D4D4D] px-5 py-1 font-semibold text-white hover:bg-[#3D3D3D]'
        >
          저장하기
        </Button>
      </div>

      <Separator className='my-8 bg-[#CCCCCC]' />

      <div className='mb-6'>
        <label className='mb-2 block text-sm font-medium text-black'>시리즈 배너</label>
        <div className='flex h-40 w-full cursor-pointer items-center justify-center rounded-lg border border-[#CCCCCC] bg-white p-4 transition-colors hover:bg-[#F2F2F2]'>
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
        </div>
      </div>

      <div className='mb-6'>
        <label className='mb-2 block text-sm font-medium text-black'>시리즈 이름</label>
        <Input
          value={seriesName}
          onChange={(e) => setSeriesName(e.target.value)}
          placeholder='이름을 입력해주세요. 최대 30글자'
          maxLength={30}
          className='border-[#CCCCCC] focus:border-[#4D4D4D] focus:ring-[#4D4D4D]/20'
        />
      </div>

      <div className='mb-8'>
        <label className='mb-2 block text-sm font-medium text-black'>시리즈 설명</label>
        <textarea
          value={seriesDescription}
          onChange={(e) => setSeriesDescription(e.target.value)}
          placeholder='시리즈에 대한 설명을 입력해주세요. 최대 ???자'
          className='min-h-[100px] w-full rounded-md border border-[#CCCCCC] px-3 py-2 text-sm placeholder:text-gray-500 focus:border-[#4D4D4D] focus:ring-1 focus:ring-[#4D4D4D]/20 focus:outline-none'
        />
      </div>

      <div className='mb-6'>
        <label className='mb-2 block text-sm font-medium text-black'>게시글 관리</label>

        <div className='flex flex-col items-center gap-2 sm:flex-row'>
          <div className='h-80 w-full overflow-y-auto rounded-lg border border-[#CCCCCC] bg-white sm:flex-1'>
            <div className='sticky top-0 flex items-center gap-2 border-b border-gray-200 bg-white px-4 py-3'>
              <span className='text-sm font-medium text-black'>전체 게시글</span>
              <span className='text-sm text-[#999999]'>{allPosts.length}</span>
            </div>
            {allPosts.map((post, index) => (
              <div
                key={post.id}
                className='flex items-center justify-between border-b border-gray-100 px-4 py-3 last:border-b-0'
              >
                <div className='flex items-center gap-3'>
                  <span className='text-sm text-gray-500'>{index + 1}</span>
                  <span className='text-sm text-black'>{post.title}</span>
                </div>
                <button
                  onClick={() => handleAddPost(post.id)}
                  className='text-gray-400 hover:text-gray-600'
                >
                  →
                </button>
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

          <div className='h-80 w-full overflow-y-auto rounded-lg border border-[#CCCCCC] bg-white sm:flex-1'>
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
              seriesPosts.map((post, index) => (
                <div
                  key={post.id}
                  className='flex items-center justify-between border-b border-gray-100 px-4 py-3 last:border-b-0'
                >
                  <div className='flex items-center gap-3'>
                    <span className='text-sm text-gray-500'>{index + 1}</span>
                    <span className='text-sm text-black'>{post.title}</span>
                  </div>
                  <button
                    onClick={() => handleRemovePost(post.id)}
                    className='text-gray-400 hover:text-gray-600'
                  >
                    ←
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 취소 버튼 (임시) */}
      <div className='flex justify-end gap-3'>
        <Button
          onClick={handleCancel}
          variant='outline'
          className='rounded-full border-[#CCCCCC] px-5 py-1 text-gray-600 hover:bg-gray-50'
        >
          취소
        </Button>
      </div>
    </div>
  ) : (
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
            onClick={() => setIsAddMode(true)}
            className='rounded-full bg-[#4D4D4D] px-5 py-1 font-semibold text-white hover:bg-[#3D3D3D]'
          >
            추가하기
          </Button>
        </div>
      </div>
    </div>
  );
}
