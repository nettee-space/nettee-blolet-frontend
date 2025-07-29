'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

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
  const [allPosts, setAllPosts] = useState(dummyPosts);
  const [seriesPosts, setSeriesPosts] = useState<typeof dummyPosts>([]);
  const [draggedPostId, setDraggedPostId] = useState<number | null>(null); // 현재 드래그되고 있는 게시글 id
  const [dragOverContainer, setDragOverContainer] = useState<'all' | 'series' | null>(null); // 마우스가 어떤 드롭 영역 위에 있는지(전체 게시글 또는 현재 시리즈)
  const [selectedPostIds, setSelectedPostIds] = useState<number[]>([]); // 다중 선택된 게시글 ID들
  const [rangeSelectionAnchor, setRangeSelectionAnchor] = useState<{
    container: 'all' | 'series';
    index: number;
  } | null>(null); // Shift 클릭 범위 선택의 기준점(고정점) 정보

  // ESC 키로 전체 선택 해제
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

  // 게시글 (다중) 선택 클릭 핸들러
  const handlePostClick = (
    e: React.MouseEvent,
    post: (typeof dummyPosts)[0],
    container: 'all' | 'series',
  ) => {
    e.preventDefault();

    const currentIndex =
      container === 'all'
        ? allPosts.findIndex((p) => p.id === post.id)
        : seriesPosts.findIndex((p) => p.id === post.id);

    // console.log(currentIndex);
    // console.log(rangeSelectionAnchor);

    // Shift 클릭: 범위 선택
    if (e.shiftKey && rangeSelectionAnchor && rangeSelectionAnchor.container === container) {
      // 범위의 시작과 끝 인덱스 계산
      const startIndex = Math.min(rangeSelectionAnchor.index, currentIndex);
      const endIndex = Math.max(rangeSelectionAnchor.index, currentIndex);

      // 범위 내 게시글들 추출
      const currentPosts = container === 'all' ? allPosts : seriesPosts;
      const postsInRange = currentPosts.slice(startIndex, endIndex + 1);

      // 기존 선택에 범위 내 게시글들 추가 (중복 방지)
      const updatedSelection: number[] = [];
      postsInRange.forEach((post) => {
        if (!updatedSelection.includes(post.id)) updatedSelection.push(post.id);
      });

      setSelectedPostIds(updatedSelection);
      return;
    }

    // Ctrl/Cmd 클릭: 개별 선택/해제
    if (e.ctrlKey || e.metaKey) {
      // Ctrl/Cmd 누른 상태에서 이미 선택되어 있는 게시글을 클릭하면 선택 해제
      if (selectedPostIds.includes(post.id)) {
        setSelectedPostIds(selectedPostIds.filter((id) => id !== post.id));
      } else {
        // Ctrl/Cmd 누른 상태에서 이미 선택되어 있지 않은 게시글을 클릭하면 선택
        setSelectedPostIds([...selectedPostIds, post.id]);
      }
      return;
    }

    // 일반 클릭 또는 Shift 첫 클릭 시 실행: 단일 선택
    setSelectedPostIds([post.id]);
    setRangeSelectionAnchor({ container, index: currentIndex });
  };

  // 드래그 중 마우스가 어떤 드롭 영역 위에 있는지 업데이트
  const handleDragOver = (e: React.DragEvent, container: 'all' | 'series') => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverContainer(container);
  };

  // 드래그된 게시글이 드롭 영역을 벗어날 때 호출
  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOverContainer(null);
  };

  // 드래그된 게시글을 드롭 영역에 놓을 때 호출
  const handleDrop = (e: React.DragEvent, targetContainer: 'all' | 'series') => {
    e.preventDefault();

    const draggedPostIdFromData = Number(e.dataTransfer.getData('text/plain'));

    // 이동할 게시글 결정: 다중 선택 vs 단일 이동
    // 조건 1: 드래그된 게시글이 선택된 게시글 중 하나여야 함
    // 조건 2: 선택된 게시글이 2개 이상이어야 함 (다중 선택 상태)
    // → 두 조건 모두 만족하면 선택된 모든 게시글을 이동
    // → 그렇지 않으면 드래그된 게시글만 단독 이동
    const postsToMove =
      selectedPostIds.includes(draggedPostIdFromData) && selectedPostIds.length > 1
        ? selectedPostIds
        : [draggedPostIdFromData];

    // 전체 게시글에서 현재 시리즈로 이동
    if (targetContainer === 'series') {
      // 1. 이동할 게시글들을 전체 게시글 목록에서 찾기
      const postsToMoveObjects = allPosts.filter((post) => postsToMove.includes(post.id));
      if (postsToMoveObjects.length > 0) {
        // 2. 전체 게시글 목록에서 이동할 게시글들 제거
        setAllPosts(allPosts.filter((post) => !postsToMove.includes(post.id)));
        // 3. 시리즈 목록에 이동할 게시글들 추가
        setSeriesPosts([...seriesPosts, ...postsToMoveObjects]);
      }
      // 시리즈에서 전체 게시글로 이동
    } else if (targetContainer === 'all') {
      // 1. 이동할 게시글들을 시리즈 목록에서 찾기
      const postsToMoveObjects = seriesPosts.filter((post) => postsToMove.includes(post.id));
      if (postsToMoveObjects.length > 0) {
        // 2. 시리즈 목록에서 이동할 게시글들 제거
        setSeriesPosts(seriesPosts.filter((post) => !postsToMove.includes(post.id)));
        // 3. 전체 게시글 목록에 이동할 게시글들 추가
        setAllPosts([...allPosts, ...postsToMoveObjects]);
      }
    }

    setSelectedPostIds([]);
    setDraggedPostId(null);
    setDragOverContainer(null);
  };

  // 드래그 시작 핸들러
  const handleDragStart = (e: React.DragEvent, postId: number) => {
    setDraggedPostId(postId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', postId.toString());

    // 다중 선택된 상태에서 선택되지 않은 게시글을 드래그하면 기존 선택 해제
    if (!selectedPostIds.includes(postId)) setSelectedPostIds([postId]);
  };

  // 드래그 종료 핸들러
  const handleDragEnd = () => {
    setDraggedPostId(null);
    setDragOverContainer(null);
  };

  const handleCancel = () => {
    setIsAddMode(false);
    setSeriesName('');
    setSeriesDescription('');
    setAllPosts(dummyPosts);
    setSeriesPosts([]);
    setSelectedPostIds([]);
    setRangeSelectionAnchor(null);
  };

  const handleSave = () => setIsAddMode(false);

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
          <div
            className={`h-80 w-full overflow-y-auto rounded-lg border bg-white transition-all duration-200 sm:flex-1 ${
              dragOverContainer === 'all'
                ? 'border-blue-400 bg-blue-50 shadow-lg'
                : 'border-[#CCCCCC]'
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
                key={post.id}
                draggable
                onDragStart={(e) => handleDragStart(e, post.id)}
                onDragEnd={handleDragEnd}
                onClick={(e) => handlePostClick(e, post, 'all')}
                className={`flex cursor-move items-center border-b border-gray-100 px-4 py-3 transition-all duration-200 last:border-b-0 ${
                  draggedPostId === post.id
                    ? 'scale-95 opacity-50'
                    : selectedPostIds.includes(post.id)
                      ? 'border-blue-200 bg-blue-100'
                      : 'hover:bg-gray-50'
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
                  <span
                    className={`text-sm ${selectedPostIds.includes(post.id) ? 'font-medium text-blue-800' : 'text-black'}`}
                  >
                    {post.title}
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
              dragOverContainer === 'series'
                ? 'border-green-400 bg-green-50 shadow-lg'
                : 'border-[#CCCCCC]'
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
                  key={post.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, post.id)}
                  onDragEnd={handleDragEnd}
                  onClick={(e) => handlePostClick(e, post, 'series')}
                  className={`flex cursor-move items-center border-b border-gray-100 px-4 py-3 transition-all duration-200 last:border-b-0 ${
                    draggedPostId === post.id
                      ? 'scale-95 opacity-50'
                      : selectedPostIds.includes(post.id)
                        ? 'border-green-200 bg-green-100'
                        : 'hover:bg-gray-50'
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
                    <span
                      className={`text-sm ${selectedPostIds.includes(post.id) ? 'font-medium text-green-800' : 'text-black'}`}
                    >
                      {post.title}
                    </span>
                  </div>
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
