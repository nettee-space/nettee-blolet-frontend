import clsx from 'clsx';

import { ReactNode } from 'react';

interface ContentsWrapperProps {
  title: string;
  children?: ReactNode;
  className?: string; // grid item 제어를 위해
}

export default function ContentsWrapper({ title, children, className }: ContentsWrapperProps) {
  return (
    <section className={clsx('flex flex-col gap-[38px]', className)}>
      <h2 className='text-2xl leading-[30px] font-bold'>{title}</h2>
      {children}
    </section>
  );
}
