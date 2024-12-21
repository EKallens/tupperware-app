import { Outlet } from 'react-router-dom'

export const Root = (): JSX.Element => {
    return (
        <main>
            <Outlet />
        </main>
    )
}
