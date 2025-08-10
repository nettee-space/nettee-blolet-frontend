'use client'
import dynamic from "next/dynamic";

import EditContent from "./edit-content";
import EditTop from "./edit-top";
interface EditWrapperProps {
    open: () => void;
    sidebar?: boolean;
}

const PlateWrapper = dynamic(() => import('@/app/editor-posting-new-contents/plate-wrapper'),{ssr:false})

export default function EditWrapper ({ open, sidebar }: EditWrapperProps){
    return (
        <div className='w-full h-full text-[#000] relative'>
            <EditTop open={open} sidebar={sidebar}/>
            <main className='w-full h-dvh overflow-y-auto pt-20 text-[#000]'>
                <EditContent/>
                <PlateWrapper/>
            </main>
        </div>
    )
}
