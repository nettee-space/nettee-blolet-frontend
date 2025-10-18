import Image from 'next/image';

import { useSidebar } from '@/components/ui/sidebar';

export default function SideBarToggleButton() {
  const { toggleSidebar } = useSidebar();

  return (
    <button onClick={toggleSidebar}>
      <Image src={'/icons/SignIn.svg'} alt='사이드 바 열기' width={24} height={24} />
    </button>
  );
}
