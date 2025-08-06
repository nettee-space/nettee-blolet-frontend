import Image from "next/image"

export default function SideAdmin () {
    return (
        <div className="flex items-center font-semibold py-4">
                <Image width={24} height={24} src={'/icons/profile.svg'} alt="Profile"/>
                <p>Blolet_blogiiii</p>
            </div>
    )
}