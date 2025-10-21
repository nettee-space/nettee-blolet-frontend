import Image from 'next/image';
import Link from 'next/link';

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

export default function SidebarDraftItem({ draftName }: { draftName: string }) {
  return (
    <SidebarMenuItem className='w-full'>
      <SidebarMenuButton className='w-full p-0'>
        <Link
          href={'#'}
          className='flex h-[37px] w-full items-center gap-2 rounded-[5px] p-2 text-lg text-black hover:bg-[#E6E6E6]'
        >
          <Image src='/icons/file.svg' alt='file icon' width={20} height={20} />
          <span>{draftName}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
