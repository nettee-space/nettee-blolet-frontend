import SeasonLogin from './season-login';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SeasonLoginModal = ({ isOpen }: LoginModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4'>
      <SeasonLogin />
    </div>
  );
};

export default SeasonLoginModal;
