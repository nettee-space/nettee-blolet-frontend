import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';

import { Series } from './series-toggle-button';

interface SeriesSelectCommandProps {
  seriesList: Series[];
  onSelect: (currentValue: string) => void;
}

export default function SeriesSelectCommand({ seriesList, onSelect }: SeriesSelectCommandProps) {
  return (
    <Command className='flex flex-col gap-6'>
      <header className='flex flex-col gap-6'>
        <span id='series-title' className='text-[#4d4d4d]'>
          시리즈 설정
        </span>
      </header>
      <CommandList>
        <CommandGroup className='p-0'>
          {seriesList.map((series) => (
            <CommandItem
              key={series.value}
              value={series.value}
              onSelect={() => onSelect(series.value)}
              className='mb-3 h-10 rounded-[10px] px-[10px] py-0 text-[18px] text-[#999] last:mb-0'
            >
              {series.value}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
