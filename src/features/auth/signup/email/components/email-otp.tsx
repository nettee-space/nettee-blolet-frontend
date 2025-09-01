import { Mail } from 'lucide-react';

import React, { useRef, useState } from 'react';

import Button from '@/shared/components/ui/button';

const EmailOTP: React.FC = () => {
  const handleLogin = () => {
    window.location.reload();
  };
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className='flex items-center justify-center rounded-lg bg-white'>
      <div className='w-[440px] rounded-lg border p-6'>
        {/* 헤더 */}
        <div className='flex gap-2 pt-1'>
          <Mail />
          <p className='font-bold tracking-[-0.05em] text-[#0E0E0F]'>이메일 계정 확인 안내</p>
        </div>
        <p className='flex justify-center p-6 text-xs font-bold tracking-[-0.03em] text-[#6C6F78]'>
          blolet2025@blolet.com으로 인증 요청이 전송되었습니다.
        </p>
        {/* middle box */}
        <div className='h-46 rounded-lg bg-[#F3F4F5]'>
          <p className='flex justify-center pt-4 text-sm font-bold tracking-[-0.03em] text-[#000000]'>
            요청하신 이메일 계정 확인을 위해 이동해 주세요.
          </p>
          {/* OTP Box */}
          {/* white box block */}
          <div className='flex justify-center pt-4'>
            {/* white box */}
            <div className='flex h-18 w-[360px] items-center justify-center gap-2 rounded-lg bg-white pt-4 pb-4'>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type='text'
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className='h-10 w-10 rounded-md border-2 border-gray-300 text-center text-lg font-bold focus:border-blue-500 focus:outline-none'
                  maxLength={1}
                />
              ))}
            </div>
          </div>
          <p className='ml-4 pt-4 text-xs font-bold tracking-[-0.03em] text-[#6C6F78]'>
            · 링크는 24시간 동안 유효하며, 1회만 사용할 수 있습니다.
          </p>
          <p className='ml-4 text-xs font-bold tracking-[-0.03em] text-[#6C6F78]'>
            · 이메일이 도착하지 않았다면 스팸 폴더를 확인해주세요.
          </p>
        </div>

        {/* button */}
        <div className='mt-8 ml-30 flex gap-2'>
          <Button variant='secondary' className='w-32'>
            이메일 재요청
          </Button>
          <Button className='w-32' onClick={handleLogin}>
            완료
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailOTP;
