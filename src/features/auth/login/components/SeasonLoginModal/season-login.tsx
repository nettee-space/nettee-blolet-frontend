import Image from 'next/image';
import { useState } from 'react';

const SeasonLogin = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const handleLogin = () => {
    window.location.reload();
  };
  return (
    <div className='flex items-center justify-center'>
      <div className='w-[426px] rounded-lg border p-14'>
        {isLoginMode ? (
          <div>
            <div className='flex items-start justify-center'>
              <p className='-mt-8 text-2xl font-bold text-[#0E0E0F]'>로그인</p>
            </div>
            <div className='mt-8 flex flex-col gap-4'>
              <input
                type='email'
                placeholder='이메일을 입력하세요.'
                className='h-12 rounded-lg border p-5 text-sm font-bold tracking-[-0.03em]'
              />
              <input
                type='password'
                placeholder='비밀번호를 입력하세요.'
                className='h-12 rounded-lg border p-5 text-sm font-bold tracking-[-0.03em]'
              />
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  checked={autoLogin}
                  onChange={(e) => setAutoLogin(e.target.checked)}
                  className='h-4 w-4 rounded border border-[#37383C9C] text-[#6B66F4] focus:ring-[#6B66F4]'
                />
                <span className='text-sm font-medium text-[#6C6F78]'>자동 로그인</span>
              </div>
              <button
                className='h-12 w-full rounded-lg bg-[#6B66F4] font-bold text-white'
                onClick={handleLogin}
              >
                로그인
              </button>
            </div>
            <div className='mt-4 flex justify-center gap-3 p-1 text-sm tracking-[-0.02em]'>
              <button>이메일 찾기</button>
              <span>|</span>
              <button>비밀번호 찾기</button>
            </div>
          </div>
        ) : (
          <div>
            <Image
              src='/icons/BloletLogo.png'
              alt='블로렛 로고'
              width={140}
              height={52}
              className='mx-auto'
            />

            <div className='mt-8 flex flex-col items-center gap-4 p-3'>
              <button className='h-12 w-88 rounded-lg border bg-[#6B66F4] text-sm font-bold tracking-[-0.03em] text-white'>
                처음이신가요?
              </button>
              <button
                className='h-12 w-88 rounded-lg border text-sm font-bold tracking-[-0.03em] text-[#6B66F4]'
                onClick={() => setIsLoginMode(true)}
              >
                다시 만나 반가워요!
              </button>
            </div>

            <div className='mt-4 flex justify-center gap-3 text-sm tracking-[-0.02em] text-[#6C6F78]'>
              <button>이메일 찾기</button>
              <span>|</span>
              <button>비밀번호 찾기</button>
            </div>

            <div className='my-6 flex items-center'>
              <div className='flex-grow border-t border-gray-300'></div>
              <span className='mx-4 text-sm text-gray-500'>또는</span>
              <div className='flex-grow border-t border-gray-300'></div>
            </div>

            <div className='mt-6 flex justify-center'>
              <Image
                src='/icons/Apple.png'
                alt='Apple 로그인'
                width={40}
                height={40}
                className='mx-auto'
              />
              <Image
                src='/icons/Google.png'
                alt='Google 로그인'
                width={40}
                height={40}
                className='mx-auto'
              />
              <Image
                src='/icons/Github.png'
                alt='GIthub 로그인'
                width={40}
                height={40}
                className='mx-auto'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeasonLogin;
