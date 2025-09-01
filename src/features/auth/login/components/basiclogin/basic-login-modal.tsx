import BasicLogin from './basic-login';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BasicLoginModal = ({ isOpen }: LoginModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4'>
      <BasicLogin />
    </div>
  );
};

export default BasicLoginModal;
