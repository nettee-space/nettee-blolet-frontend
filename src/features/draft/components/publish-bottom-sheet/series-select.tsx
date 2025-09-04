'use client';
import Image from 'next/image';
import { useState } from 'react';

import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Series {
  value: string;
}

const seriesList: Series[] = [
  {
    value: '어디 출신',
  },
  {
    value: '미시시피',
  },
  {
    value: '부모님은',
  },
  {
    value: '완전 부자',
  },
];

interface SeriesSelectProps {
  onSeriesChange?: (value: string) => void;
  selectedSeries?: string;
}

export default function SeriesSelect({ onSeriesChange, selectedSeries }: SeriesSelectProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (currentValue: string) => {
    setOpen(false);
    onSeriesChange?.(currentValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className='w-145 text-left'
          aria-expanded={open}
          aria-haspopup='listbox'
          aria-label='시리즈 선택'
        >
          {selectedSeries || seriesList[0].value}
        </button>
      </PopoverTrigger>
      <PopoverContent
        aria-modal='true'
        aria-labelledby='series-title'
        side='top'
        className='w-145 rounded-t-[10px] rounded-b-[0px] border border-[#E6E6E6] px-5 py-4 shadow-[0_0_20px_0_rgba(0,0,0,0.10)]'
      >
        <Command className='flex flex-col gap-6'>
          <header className='flex flex-col gap-6'>
            <div className='flex w-full items-center justify-between text-[#4d4d4d]'>
              <h2 id='series-title'>시리즈 설정</h2>
              <button className='flex items-center gap-[10px] text-[#999]' aria-label='시리즈 추가'>
                <Image src={'/icons/plus.svg'} alt='' width={20} height={20} />
                <span>시리즈 추가</span>
              </button>
            </div>
          </header>
          <CommandList>
            <CommandGroup className='p-0'>
              {seriesList.map((series) => (
                <CommandItem
                  key={series.value}
                  value={series.value}
                  onSelect={handleSelect}
                  className='mb-3 h-10 rounded-[10px] px-[10px] py-0 text-[18px] text-[#999] last:mb-0'
                >
                  {series.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
