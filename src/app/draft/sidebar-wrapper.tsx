'use client';
import SideBarAdmin from './sidebar-admin';
import SideBarDraft from './sidebar-draft';
import SideBarFunction from './sidebar-function';
import SideBarMenu from './sidebar-menu';
import SideBarTop from './sidebar-top';

interface SideWrapperProps {
  close: () => void;
  sidebar?: boolean;
}

export default function SideBarWrapper({ close, sidebar }: SideWrapperProps) {
  const baseClass =
    'flex h-full w-full flex-col justify-between border-[#ccc] px-[30px] py-[32px] text-[18px] leading-[30px] text-[#000] sm:w-[300px] transition-all duration-300';

  const hiddenClass = 'left-[100%] hidden';

  return (
    <div className={`${baseClass} ${sidebar ? '' : hiddenClass}`}>
      <SideBarTop close={close} />
      <div className='flex h-full w-full flex-col gap-6 divide-y divide-[#ccc]'>
        <SideBarMenu />
        <SideBarDraft />
        <SideBarFunction />
        <SideBarAdmin />
      </div>
    </div>
  );
}
