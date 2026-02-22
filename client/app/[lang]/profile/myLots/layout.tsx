import SidebarLots from "@/components/profile/sidebarLots";


export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex justify-start items-center h-full w-full">
        <SidebarLots />
        {children}
    </div>
  )
}
