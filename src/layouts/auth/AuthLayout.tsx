import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

export const AuthLayout = (): JSX.Element => {
    return (
        <div className="flex items-center justify-center lg:p-30 md:p-46 sm:14 p-8 w-full h-full bg-background">
            <Toaster />
            <Outlet />
        </div>
    )
}
