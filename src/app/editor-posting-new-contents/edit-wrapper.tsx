import EditContent from "./edit-content";
import EditTop from "./edit-top";
import PlateWrapper from "./plate-wrapper";

interface EditWrapperProps {
    open: () => void;
}

export default function EditWrapper ({ open }: EditWrapperProps){
    return (
        <main className='w-full h-full text-[#000]'>
            <EditTop open={open}/>
            <EditContent/>
            <PlateWrapper/>
        </main>
    )
}