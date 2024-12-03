import { Outlet } from 'react-router-dom'

export const AuthLayout = (): JSX.Element => {
    return (
        <div className="flex items-center justify-center lg:p-30 md:p-46 sm:14 p-8 w-full">
            <Outlet />
        </div>
    )
}
