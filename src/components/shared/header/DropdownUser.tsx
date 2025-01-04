import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegHeart } from 'react-icons/fa'
import { ClickOutside } from '@/components/click-outside/ClickOutside'
import defaultUserImage from '@/assets/images/user/default-user.svg'
import { IoMdSettings } from 'react-icons/io'
import { BiLogOut } from 'react-icons/bi'
import { IoIosArrowDown } from 'react-icons/io'
import { useAuthStore } from '@/store/useAuthStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '@/lib/authApi'

export const DropdownUser = (): JSX.Element => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
    const { user, setIsAuthenticated, setUser } = useAuthStore()
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            setIsAuthenticated(false)
            setUser(null)
            queryClient.clear()
        }
    })

    const handleLogout = () => mutate()

    return (
        <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
            <div onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-4 cursor-pointer">
                <span className="hidden text-right lg:block">
                    <span className="block text-sm font-medium text-black dark:text-white">{user?.name}</span>
                    <span className="block text-xs">{user?.email}</span>
                </span>

                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        src={user?.img ?? defaultUserImage}
                        alt="imagen redonda"
                    />
                </div>
                <IoIosArrowDown size={20} />
            </div>

            {dropdownOpen && (
                <div
                    className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokeDark dark:bg-boxDark`}
                >
                    <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokeDark">
                        <li>
                            <Link
                                to="/dashboard/favorites-recipes"
                                onClick={() => setDropdownOpen(false)}
                                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                            >
                                <FaRegHeart size={20} />
                                Recetas Favoritas
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/settings"
                                onClick={() => setDropdownOpen(false)}
                                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                            >
                                <IoMdSettings size={20} />
                                Configuración
                            </Link>
                        </li>
                    </ul>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                    >
                        <BiLogOut size={20} />
                        Cerrar Sesión
                    </button>
                </div>
            )}
        </ClickOutside>
    )
}
