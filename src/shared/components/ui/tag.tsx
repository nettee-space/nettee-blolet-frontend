import { cn } from '@/lib/utils';

interface TagProps {
  label: string;
  className?: string;
}
export default function Tag({ label, className }: TagProps) {
  return <li className={(cn('rounded-[30px] bg-[#ebebeb] px-2 py-1'), className)}>{label}</li>;
}
