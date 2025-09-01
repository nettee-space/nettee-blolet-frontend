'use client';
import React, { useState } from 'react';

import BasicLoginModal from '@/features/auth/login/components/basiclogin/basic-login-modal';
import SeasonLoginModal from '@/features/auth/login/components/seasonlogin/season-login-modal';
import Button from '@/shared/components/ui/button';

const LoginPage: React.FC = () => {
  const [showSeasonLoginModal, setShowSeasonLoginModal] = useState(false);
  const [showBasicLoginModal, setShowBasicLoginModal] = useState(false);

  return (
    <div className='space-y-8 p-8'>
      <div className='flex flex-col items-center gap-4'>
        <Button
          onClick={() => setShowSeasonLoginModal(true)}
          className='bg-blue-500 hover:bg-blue-600'
        >
          기간제 로그인
        </Button>

        <SeasonLoginModal
          isOpen={showSeasonLoginModal}
          onClose={() => setShowSeasonLoginModal(false)}
        />

        <div className='py-8'>
          <p className='text-center text-gray-500'>빈공간</p>
        </div>

        <Button
          onClick={() => setShowBasicLoginModal(true)}
          className='bg-blue-500 hover:bg-blue-600'
        >
          기본 로그인
        </Button>

        <BasicLoginModal
          isOpen={showBasicLoginModal}
          onClose={() => setShowBasicLoginModal(false)}
        />
      </div>
    </div>
  );
};

export default LoginPage;
