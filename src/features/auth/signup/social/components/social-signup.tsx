'use client';

import { ChevronRight, Info, MoveLeft } from 'lucide-react';

import { useRouter } from 'next/navigation';

import Button from '@/shared/components/ui/button';
import Input from '@/shared/components/ui/input';

const SocialSignup = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push('/onboarding');
  };

  return (
    <div className='min-h-screen bg-white px-4 py-6 md:px-6'>
      <div className='mb-8'>
        <MoveLeft />
        <p className='flex-1 text-center text-xl font-bold'>회원가입</p>
      </div>

      {/* 폼 컨테이너 */}
      <div className='mx-auto max-w-md space-y-14'>
        {/* 이메일 */}
        <div>
          <p className='mb-2 font-bold tracking-[-0.05em] text-[#0E0E0F]'>이메일*</p>
          <Input
            type='email'
            placeholder='example@email.com'
            className='text-md h-12 w-118 tracking-[-0.05em]'
          />
        </div>
        {/* 도메인 이름 */}
        <div className='mb-20'>
          <div className='flex gap-2'>
            <p className='mb-2 font-bold tracking-[-0.05em] text-[#0E0E0F]'>도메인 이름*</p>
            <Info className='h-5 w-5' color='#1C80F3' />
          </div>
          <Input
            type='domain'
            placeholder='https://blolet.com/{username}'
            className='text-md h-12 w-118 tracking-[-0.05em]'
          />
        </div>

        {/* 약관 */}
        <div className='space-y-4'>
          {/* 모든 약관 동의 */}
          <div className='flex items-center'>
            <input type='checkbox' id='all-agree' className='h-5 w-5 border-[#878B96]' />
            <p className='text-md ml-3 font-bold text-[#0E0E0F]'>모든 약관에 동의합니다.</p>
          </div>

          <div className='flex-grow border-t border-gray-300' />

          {/* 약관 1 */}
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='h-5 w-5 rounded border-gray-300 text-[#6B66F4] focus:ring-[#6B66F4]'
                />
                <p className='ml-3 text-sm text-[#0E0E0F]'>
                  이용약관동의 <span className='text-[#E63737]'>(필수)</span>
                </p>
              </div>
              <ChevronRight className='h-4 w-4 text-[#0E0E0F]' />
            </div>
          </div>
          {/* 약관 2 */}
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='h-5 w-5 rounded border-gray-300 text-[#6B66F4] focus:ring-[#6B66F4]'
                />
                <p className='ml-3 text-sm text-[#0E0E0F]'>
                  개인정보처리방침 동의 <span className='text-[#E63737]'>(필수)</span>
                </p>
              </div>
              <ChevronRight className='h-4 w-4 text-[#0E0E0F]' />
            </div>
          </div>
          {/* 약관 3 */}
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='h-5 w-5 rounded border-gray-300 text-[#6B66F4] focus:ring-[#6B66F4]'
                />
                <p className='ml-3 text-sm text-[#0E0E0F]'>이메일 광고 수신 동의</p>
              </div>
              <ChevronRight className='h-4 w-4 text-[#0E0E0F]' />
            </div>
          </div>
          <div className='flex justify-center pt-15'>
            <Button className='h-13 w-58' onClick={handleNext}>
              다음
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSignup;
