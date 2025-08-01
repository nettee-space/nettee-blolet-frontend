import EditorMain from "./editor-main";
import EditorSideBar from "./editor-sidebar";

export default function EditorPage(){
    return (
        <div className="mx-auto w-full h-screen max-w-7xl flex items-center justify-between">
            <EditorSideBar/>
            <EditorMain />
        </div>
    )
}