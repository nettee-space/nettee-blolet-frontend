'use client';

import { Info, MoveLeft } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Button from '@/shared/components/ui/button';
import Input from '@/shared/components/ui/input';

const Onboarding = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interests = [
    'AI 트랜드',
    '로봇/드론/XR',
    '프론트엔드',
    '백엔드',
    '클라우드·인프라',
    '데이터베이스',
    '테크리트 현업문화',
    'IT 취업·면접',
    '투자 소식',
    '비지니스 인사이트',
    'UX/UI',
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((item) => item !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

  const router = useRouter();

  const handleNext = () => {
    router.push('/');
  };

  return (
    <div className='min-h-screen bg-white px-4 py-6 md:px-6'>
      <div className='mb-8'>
        <MoveLeft />
        <p className='flex-1 text-center text-xl font-bold'>프로필 설정</p>
      </div>

      {/* 폼 컨테이너 */}
      <div className='mx-auto max-w-md space-y-14'>
        {/* 닉네임 */}
        <div>
          <div className='flex gap-2'>
            <p className='mb-2 font-bold tracking-[-0.05em] text-[#0E0E0F]'>닉네임*</p>
            <Info className='h-5 w-5' color='#1C80F3' />
          </div>
          <Input
            type='nickname'
            placeholder='사용할 이름을 작성해 주세요'
            className='text-md h-12 w-118 tracking-[-0.05em]'
          />
        </div>

        {/* 직업 */}
        <div className='mb-20'>
          <p className='mb-2 font-bold tracking-[-0.05em] text-[#0E0E0F]'>직업*</p>
          <Input type='job' placeholder='보류?' className='text-md h-12 w-118 tracking-[-0.05em]' />
        </div>

        {/* 관심분야 */}
        <div>
          <p className='mb-2 font-bold tracking-[-0.05em] text-[#0E0E0F]'>관심분야</p>
          <div className='flex flex-wrap gap-2'>
            {interests.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  selectedInterests.includes(interest)
                    ? 'border-[#6B66F4] bg-white text-[#6B66F4] hover:bg-[#6B66F4]/20'
                    : 'border-[#CFD1D5] bg-white text-[#6C6F78] hover:border-[#6B66F4] hover:bg-[#6B66F4]/20 hover:text-[#6B66F4]'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
        <div className='flex justify-center gap-4 pt-8'>
          <Button variant='secondary' className='h-13 w-57 border-[#6B66F4]' onClick={handleNext}>
            다음에 하기
          </Button>
          <Button className='h-13 w-57' onClick={handleNext}>
            완료
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
