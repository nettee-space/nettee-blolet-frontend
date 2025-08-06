import SideAdmin from "./side-admin";
import SideFunction from "./side-function";
import SideMenu from "./side-menu";

interface SideWrapperProps {
    close: () => void;
}

export default function SideWrapper ({ close }:SideWrapperProps){
    return (
        <div className="flex flex-col justify-between sm:w-[300px] w-full h-full px-[30px] text-[18px] text-[#000] leading-[30px]">
            <SideMenu close={close}/>
            <SideFunction/>
            <SideAdmin/>
        </div>
    )
}