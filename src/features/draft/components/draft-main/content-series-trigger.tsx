'use client';
import { useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import SeriesSelectCommand from './series-select-command';

export type Series = {
  value: string;
};

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

export default function ContentSeriesTrigger({
  onSeriesChange,
  selectedSeries,
}: SeriesSelectProps) {
  const [open, setOpen] = useState(false);
  const [currentSeries, setCurrentSeries] = useState(seriesList[0].value);
  const handleSelect = (currentValue: string) => {
    setOpen(false);
    setCurrentSeries(currentValue);
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
          {selectedSeries || currentSeries}
        </button>
      </PopoverTrigger>
      <PopoverContent
        aria-modal='true'
        aria-labelledby='series-title'
        side='bottom'
        className='z-999 w-145 rounded-[20px] border border-[#E6E6E6] px-5 py-4 shadow-[0_0_20px_0_rgba(0,0,0,0.10)]'
      >
        <SeriesSelectCommand seriesList={seriesList} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
}
