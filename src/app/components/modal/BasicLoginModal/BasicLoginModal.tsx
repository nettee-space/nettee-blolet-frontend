import BasicLogin from './Basiclogin';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BasicLoginModal = ({ isOpen }: LoginModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm'>
      <BasicLogin />
    </div>
  );
};

export default BasicLoginModal;
