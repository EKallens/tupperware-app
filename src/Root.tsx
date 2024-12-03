import { Outlet, useLocation, Navigate } from 'react-router-dom'

export const Root = (): JSX.Element => {
    const { pathname } = useLocation()

    if (pathname === '/') return <Navigate to="/dashboard" />

    return (
        <main>
            <Outlet />
        </main>
    )
}
