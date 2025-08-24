import { cn } from '@/lib/utils';

interface Props {
  progress: number;
}

export function ScrollProgressBar({ progress }: Props) {
  const isAtTop = progress === 0;
  const isAtBottom = progress === 100;

  return (
    <div
      className={`fixed top-20 left-0 z-40 h-1 w-full transition-all duration-300 ease-in-out ${isAtTop ? 'bg-transparent opacity-0' : 'bg-[#F2F2F2] opacity-100'} `}
    >
      <div
        className={cn(
          'h-full origin-left bg-[#6b66f4] transition-all duration-75 ease-out',
          isAtBottom ? 'rounded-none' : 'rounded-r',
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
