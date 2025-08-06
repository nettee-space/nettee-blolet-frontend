import Image from "next/image";

interface EditorSideBarProps {
    close: () => void
}

export default function SideMenu ({ close }: EditorSideBarProps){
    return (
            <div>
                <div className="w-full h-20 flex justify-between items-center">
                <Image width={96} height={24} src={'/icons/blolet.svg'} alt="BloletLogo" />
                <button onClick={close}>
                    <Image src={'/icons/SignIn.svg'} alt='사이드 바 열기' width={24} height={24} className=''/>
                </button>
                </div>
                <div className="py-10">
                <button className="flex items-center gap-3">
                    <Image width={24} height={24} src={'/icons/fileadd.svg'} alt="FileAdd"/>
                    <p className="font-semibold">내 서랍으로 이동</p>
                </button>
                </div>
                <hr className="border-[#ccc] sm:w-[240px] w-[580px]" />
            </div>            
    )
}
