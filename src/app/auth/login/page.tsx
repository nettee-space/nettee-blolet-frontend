'use client';

import { useState } from 'react';

import BasicLoginModal from '@/app/features/auth/login/components/BasicLoginModal/basic-login-modal';
import SeasonLoginModal from '@/app/features/auth/login/components/SeasonLoginModal/season-login-modal';

const LoginPage = () => {
  const [showSeasonLoginModal, setShowSeasonLoginModal] = useState(false);
  const [showBasicLoginModal, setShowBasicLoginModal] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowSeasonLoginModal(true)}
        className='rounded bg-blue-500 px-4 py-2 text-white'
      >
        기간제 로그인
      </button>
      <SeasonLoginModal
        isOpen={showSeasonLoginModal}
        onClose={() => setShowSeasonLoginModal(false)}
      />
      <div>
        <p>빈공간</p>
      </div>
      <button
        onClick={() => setShowBasicLoginModal(true)}
        className='rounded bg-blue-500 px-4 py-2 text-white'
      >
        기본 로그인
      </button>
      <BasicLoginModal isOpen={showBasicLoginModal} onClose={() => setShowBasicLoginModal(false)} />
    </div>
  );
};

export default LoginPage;
