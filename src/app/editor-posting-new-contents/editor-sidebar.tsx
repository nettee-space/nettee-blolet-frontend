import Image from "next/image";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
const menuGroups = [
    {
        icon: '/icons/FileAdd.svg',
        label: '내 서랍으로',
    },
    {
        label: null,
        items: [
            {
                icon: '/icons/MinimizeText.svg',
                label: '맞춤법 검사',
                alt: 'MinimizeText'
            },
            {
                icon: '/icons/Trash.svg',
                label: "글 삭제하기",
                alt: 'Trash'
            },
        ]
    },
]

export default function EditorSidebar() {
    return (
        <Sidebar className="sm:w-[300px] w-full">
            <SidebarHeader />
            <SidebarContent>
                {menuGroups.map((group, groupIndex) => (
                    <div key={groupIndex} className="mb-4">
                        {group.label && (
                            <div className="flex items-center gap-2 mb-2">
                                <Image src={group.icon} alt={group.label} width={20} height={20} />
                                <p className="text-sm font-medium">{group.label}</p>
                            </div>
                        )}
                        {group.items?.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer">
                                <Image src={item.icon} alt={item.alt || item.label} width={16} height={16} />
                                <span className="text-sm">{item.label}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}

