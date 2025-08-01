import Image from "next/image"

export default function EditorSideBar (){
    return (
        <div className="flex flex-col justify-between sm:w-[300px] w-full h-full px-[30px] text-[18px] text-[#000] leading-[30px]">
            {/* 메뉴 영역 */}
            <div>
                <div className="py-[17px] flex justify-between items-center">
                <Image width={96} height={25} src={'/icons/blolet.svg'} alt="BloletLogo" />
                </div>
                <div className="py-10">
                <button className="flex items-center gap-3">
                    <Image width={24} height={24} src={'/icons/fileadd.svg'} alt="FileAdd"/>
                    <p className="font-semibold">내 서랍으로 이동</p>
                </button>
                </div>
                <hr className="border-[#ccc] sm:w-[240px] w-[580px]" />
            </div>
            {/* 기능 영역 세로 스크롤 */}
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
            {/* 계정 관리 영역 세로 플로팅 */}
            <div className="flex items-center font-semibold py-4">
                <Image width={24} height={24} src={'/icons/profile.svg'} alt="Profile"/>
                <p>Blolet_blogiiii</p>
            </div>
            </div>
    )
}