interface TagProps {
  label: string;
}
export default function Tag({ label }: TagProps) {
  return <li className='rounded-[30px] bg-[#ebebeb] px-2 py-1'>{label}</li>;
}
