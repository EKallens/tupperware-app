import { useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { IoClose, IoHome } from 'react-icons/io5'
import { FaTags } from 'react-icons/fa6'
import { ImSpoonKnife } from 'react-icons/im'
import { IoMdSettings } from 'react-icons/io'
import Logo from '@/assets/images/logo/recipe-logo-oficial.png'
import { appName } from '@/utils/constants'
import { SidebarItem } from './SidebarItem'
import { useOpenSidebar } from '@/hooks/use-open-sidebar'

export const Sidebar = () => {
    const location = useLocation()
    const { pathname } = location

    const { isOpen, setOpen } = useOpenSidebar()

    const trigger = useRef<any>(null)
    const sidebar = useRef<any>(null)

    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!sidebar.current || !trigger.current) return
            if (!isOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return
            setOpen(false)
        }
        document.addEventListener('click', clickHandler)
        return () => document.removeEventListener('click', clickHandler)
    })

    useEffect(() => {
        const keyHandler = ({ key }: KeyboardEvent) => {
            if (!isOpen || key !== 'Escape') return
            setOpen(false)
        }
        document.addEventListener('keydown', keyHandler)
        return () => document.removeEventListener('keydown', keyHandler)
    })

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-in-out dark:bg-boxDark lg:static lg:translate-x-0 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <div className="flex items-center justify-center py-6">
                <NavLink className="flex flex-row items-center justify-center" to="">
                    <img className="hidden lg:flex" src={Logo} alt="Logo" width={80} height={83} />
                    <span className="font-bold uppercase ml-2">{appName}</span>
                </NavLink>

                <button
                    ref={trigger}
                    onClick={() => setOpen(!isOpen)}
                    aria-controls="sidebar"
                    aria-expanded={isOpen}
                    className="block lg:mr-0 lg:hidden"
                >
                    <IoClose className="ml-9" size={20} />
                </button>
            </div>

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-in-out">
                <nav className="mt-1 py-1 px-4 lg:mt-4 lg:px-6">
                    <>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            <SidebarItem
                                navigateTo=""
                                pathname={pathname}
                                icon={<IoHome size={20} />}
                                title="Inicio"
                                isActive={pathname === '/dashboard'}
                            />
                            <SidebarItem
                                navigateTo="/dashboard/recipes"
                                pathname={pathname}
                                icon={<ImSpoonKnife size={20} />}
                                title="Gestionar recetas"
                                isActive={pathname === '/dashboard/recipes'}
                            />
                            <SidebarItem
                                navigateTo="/dashboard/tags"
                                pathname={pathname}
                                icon={<FaTags size={20} />}
                                title="Etiquetas"
                                isActive={pathname === '/dashboard/tags'}
                            />
                            <SidebarItem
                                navigateTo="/dashboard/settings"
                                pathname={pathname}
                                icon={<IoMdSettings size={20} />}
                                title="Configuración cuenta"
                                isActive={pathname === '/dashboard/settings'}
                            />
                        </ul>
                    </>
                </nav>
            </div>
        </aside>
    )
}
