import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const Root = (): JSX.Element => {
    const { pathname } = useLocation()

    if (pathname === '/') return <Navigate to="/dashboard" replace />

    return (
        <main>
            <Outlet />
        </main>
    )
}
