import Image from "next/image"

export default function SideFunction (){
    return (
            <div className="flex flex-col gap-[32px] h-full pt-[40px] border-b">
                <div className="flex items-center gap-3.5">
                <Image width={24} height={24} src={'/icons/minimizetext.svg'} alt="MinimizeText"/>
                <p>맞춤법 검사</p>
                </div>
                <div className="flex items-center gap-3.5 text-[#F64646]">
                <Image width={24} height={24} src={'/icons/trash.svg'} alt="Trash"/>
                <p>글 삭제하기</p>
                </div>
            </div>
    )
}