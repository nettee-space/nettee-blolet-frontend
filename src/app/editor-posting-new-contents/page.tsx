'use client'
import { useState } from "react";

import EditWrapper from "./edit-wrapper";
import SideWrapper from "./side-wrapper";

export default function Edit(){
    const [sidebar, setSidebar] = useState(false);
    const openSidebar = () => {
        setSidebar(true);
    }
    const closeSidebar = () => {
        setSidebar(false);
    }
    return (
        <div className="mx-auto w-full h-screen max-w-7xl flex items-center overflow-hidden justify-between relative">
            <SideWrapper sidebar={sidebar} close={closeSidebar}/>
            <EditWrapper sidebar={sidebar} open={openSidebar}/>
        </div>
    )
}
