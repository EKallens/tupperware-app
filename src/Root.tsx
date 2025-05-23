import { Navigate, Outlet, useLocation } from 'react-router-dom'
import React from "react";

export const Root = (): React.JSX.Element => {
    const { pathname } = useLocation()

    if (pathname === '/') return <Navigate to="/dashboard" replace />

    return (
        <main>
            <Outlet />
        </main>
    )
}
