import SideAdmin from "./side-admin";
import SideFunction from "./side-function";
import SideMenu from "./side-menu";

interface SideWrapperProps {
    close: () => void;
    sidebar?: boolean;
}

export default function SideWrapper ({ close, sidebar }:SideWrapperProps){
    return (
        <div className={sidebar === true ? " flex flex-col justify-between sm:w-[300px] w-full h-full px-[30px] text-[18px] text-[#000] leading-[30px]" : "hidden flex flex-col justify-between sm:w-[300px] w-full h-full px-[30px] text-[18px] text-[#000] leading-[30px] left-[100%] transition-all duration-300"}>
            <SideMenu close={close}/>
            <SideFunction/>
            <SideAdmin/>
        </div>
    )
}
