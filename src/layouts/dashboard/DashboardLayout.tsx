import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '@/components/shared/header/Header'
import { Sidebar } from '@/components/shared/sidebar/Sidebar'

export const DashboardLayout = (): JSX.Element => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

    return (
        <div className="dark:bg-boxDark2 dark:text-bodyDark">
            <div className="flex h-screen overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
