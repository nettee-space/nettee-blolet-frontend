import EmailOTP from './email-otp';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailOTPModal = ({ isOpen }: LoginModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4'>
      <EmailOTP />
    </div>
  );
};

export default EmailOTPModal;
