import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet, useLocation, Navigate } from 'react-router-dom'

export const Root = (): JSX.Element => {
    const queryClient = new QueryClient()
    const { pathname } = useLocation()

    if (pathname === '/') return <Navigate to="/dashboard" />

    return (
        <QueryClientProvider client={queryClient}>
            <main>
                <Outlet />
            </main>
        </QueryClientProvider>
    )
}
