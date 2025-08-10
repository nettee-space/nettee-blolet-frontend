import Image from "next/image";

interface EditTopProps {
    open: () => void;
    sidebar?: boolean;
}

const uploadStatus = [
  {
    icon: '/icons/check.svg',
    text:'저장 완료',
    color: 'text-[#19BD58]'
  },
  {
    icon: '/icons/cloudupload.svg',
    text:'게시 완료',
    color: 'text-[#6B66F4]'
  },
  {
    icon: '/icons/resetdouble.svg',
    text:'저장 중...',
    color: 'text-[#4D4D4D]'
  },
  {
    icon: '/icons/x.svg',
    text:'저장 오류',
    color: 'text-[#F64646]'
  },
]

export default function EditTop({ open, sidebar }: EditTopProps){
    const sampleStatus = '게시 완료';
    const currentStatus = uploadStatus.find(status => status.text === sampleStatus );

    return (
        <div className={sidebar ? 'w-full max-w-[1920px] h-20 px-[37px] flex justify-end items-center absolute top-0 z-50 bg-white' : 'w-full  h-20 px-[37px] max-w-[1920px] flex justify-between items-center fixed top-0 z-50 bg-white'}>
        <button onClick={open} className={sidebar ? 'hidden' : 'flex items-center'}>
          <Image src={'/icons/SignIn.svg'} alt='사이드 바 열기' width={24} height={24} className='rotate-180'/>
        </button>
        <div className='flex items-center gap-[32px]'>
          {currentStatus && (
            <div className="flex items-center gap-3">
              <Image src={currentStatus.icon} alt='상태 아이콘' width={20} height={20} />
              <p className={currentStatus.color}>{currentStatus.text}</p>
            </div>
          )}
          <div className='flex items-center gap-[18px]'>
            <button className='px-[18px] py-[10px] rounded-[50px] bg-[#ffffff] text-[#000] border border-[#ccc]'>미리보기</button>
            <button className='px-[18px] py-[10px] bg-[#4d4d4d] text-[#ffffff] rounded-[50px]'>게시하기</button>
          </div>
        </div>
      </div>
    )
}
