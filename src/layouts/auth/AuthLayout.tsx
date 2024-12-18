import { Outlet, useLocation } from 'react-router-dom'

export const AuthLayout = (): JSX.Element => {
    const { pathname } = useLocation()

    return (
        <div
            className={`flex items-center justify-center lg:p-30 md:p-46 sm:14 p-8 w-full h-full ${
                pathname !== '/auth/verify'
                    ? 'bg-background'
                    : 'bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600'
            }`}
        >
            <Outlet />
        </div>
    )
}
