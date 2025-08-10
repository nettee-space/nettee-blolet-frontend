import Image from "next/image";

export default function SideDraft() {
    return (
        <div>
            <div>
                <Image width={24} height={24} src={'/icons/search.svg'} alt="Draft Search" />
                <input type="text" placeholder="드래프트 검색" className="w-full h-[50px] px-3 text-[18px] text-[#000] border-b border-[#ccc] focus:outline-none focus:border-[#000]" />
            </div>
        </div>
    )
}
