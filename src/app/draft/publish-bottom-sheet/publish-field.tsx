interface PublishFieldProps {
  label: string;
  children: React.ReactNode;
}

export default function PublishField({ label, children }: PublishFieldProps) {
  return (
    <div className='flex items-center gap-[62px]'>
      <dt className='w-30 text-[#999]'>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
