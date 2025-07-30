import EditorMain from "./editor-main";
import EditorSidebar from "./editor-sidebar";

export default function EditorPage(){
    return (
        <div className="mx-auto w-full max-w-7xl">
            <EditorSidebar/>
            <EditorMain />
        </div>
    )
}