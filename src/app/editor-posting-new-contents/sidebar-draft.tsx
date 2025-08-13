import Image from 'next/image';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
export default function SideBarDraft() {
  return (
    <div className='pb flex flex-col gap-8 pb-6 text-[#4D4D4D]'>
      <div className='flex h-10 items-center gap-3 rounded-[8px] border border-[#ccc] px-4'>
        <Image
          width={24}
          height={24}
          src={'/icons/search.svg'}
          alt='Draft Search'
          className='text-[#999]'
        />
        <input
          type='text'
          placeholder='드래프트 검색'
          className='placeholder:text-[#999]focus:border-[#000] h-[50px] w-full text-[18px] text-[#000] focus:outline-none'
        />
      </div>
      <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
          <AccordionTrigger>My Draft</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type='single' collapsible>
        <AccordionItem value='item-2'>
          <AccordionTrigger>Published</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
