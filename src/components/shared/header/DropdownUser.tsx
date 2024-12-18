import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegHeart } from 'react-icons/fa'
import { ClickOutside } from '@/components/click-outside/ClickOutside'
import UserOne from '@/assets/images/user/account-avatar-profile-user.svg'
import { IoMdSettings } from 'react-icons/io'
import { BiLogOut } from 'react-icons/bi'
import { IoIosArrowDown } from 'react-icons/io'

export const DropdownUser = (): JSX.Element => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)

    return (
        <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
            <div onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-4 cursor-pointer">
                <span className="hidden text-right lg:block">
                    <span className="block text-sm font-medium text-black dark:text-white">Brian Kallens</span>
                    <span className="block text-xs">Software Engineer</span>
                </span>

                <span className="h-12 w-12 rounded-full">
                    <img src={UserOne} alt="User" />
                </span>
                <IoIosArrowDown size={20} />
            </div>

            {dropdownOpen && (
                <div
                    className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokeDark dark:bg-boxDark`}
                >
                    <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokeDark">
                        <li>
                            <Link
                                to="/dashboard/save-recipes"
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
                    <Link
                        to="/auth/login"
                        className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                    >
                        <button className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                            <BiLogOut size={20} />
                            Cerrar Sesión
                        </button>
                    </Link>
                </div>
            )}
        </ClickOutside>
    )
}
