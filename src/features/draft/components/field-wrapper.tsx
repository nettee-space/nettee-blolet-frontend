'use client';

interface FieldWrapperProps {
  label?: string;
  children: React.ReactNode;
  className?: string; // gap이나 스타일을 커스터마이징
}

export default function FieldWrapper({ label, children, className = '' }: FieldWrapperProps) {
  return (
    <section className={`flex items-center justify-start ${className}`}>
      {label && <h2 className='w-30 text-[#999]'>{label}</h2>}
      <div className='flex-1'>{children}</div>
    </section>
  );
}
