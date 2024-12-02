import { NavLink } from 'react-router-dom'

type SidebarItemProps = {
    pathname: string
    navigateTo: string
    icon: JSX.Element
    title: string
    isActive: boolean
}

const SidebarItem = (props: SidebarItemProps) => {
    return (
        <li>
            <NavLink
                to={props.navigateTo}
                className={`mt-1 mb-1 group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodyDark1 duration-300 ease-in-out hover:bg-grayDark dark:hover:bg-meta-4 ${
                    props.isActive && 'bg-grayDark dark:bg-meta-4'
                }`}
            >
                {props.icon}
                {props.title}
            </NavLink>
        </li>
    )
}

export { SidebarItem }
