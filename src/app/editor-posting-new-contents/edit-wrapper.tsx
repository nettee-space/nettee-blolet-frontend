import EditContent from "./edit-content";
import EditTop from "./edit-top";
import PlateWrapper from "./plate-wrapper";

interface EditWrapperProps {
    open: () => void;
    sidebar?: boolean;
}

export default function EditWrapper ({ open, sidebar }: EditWrapperProps){
    return (
        <main className='w-full h-full text-[#000]'>
            <EditTop open={open} sidebar={sidebar}/>
            <EditContent/>
            <PlateWrapper/>
        </main>
    )
}
