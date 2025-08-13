import Image from 'next/image';

interface SideBarTopProps {
  close: () => void;
}

export default function SideBarTop({ close }: SideBarTopProps) {
  return (
    <div className='flex w-full items-center justify-between pb-8'>
      <Image width={100} height={26} src={'/icons/blolet.svg'} alt='BloletLogo' />
      <button onClick={close}>
        <Image src={'/icons/SignIn.svg'} alt='사이드 바 열기' width={24} height={24} className='' />
      </button>
    </div>
  );
}
