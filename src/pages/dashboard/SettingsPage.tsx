import { Breadcrumb } from '@/components/breadcrumb/Breadcrumb'
import userThree from '@/assets/images/user/account-avatar-profile-user.svg'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { IoMdMail } from 'react-icons/io'
import { FaUser } from 'react-icons/fa'
import { FaCloudArrowUp } from 'react-icons/fa6'

export const SettingsPage = (): JSX.Element => {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mx-auto max-w-170">
                <Breadcrumb pageName="Configuración" />

                <div className="grid grid-cols-5 gap-8">
                    <div className="col-span-5 xl:col-span-3">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokeDark dark:bg-boxDark">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokeDark">
                                <h3 className="font-medium text-black dark:text-white">Información personal</h3>
                            </div>
                            <div className="p-7">
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="fullName"
                                            >
                                                Nombre
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    startIcon={FaUser}
                                                    id="name"
                                                    type="text"
                                                    placeholder="Nombre"
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokeDark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    defaultValue="Brian Kallens"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="emailAddress"
                                        >
                                            Correo
                                        </label>
                                        <div className="relative">
                                            <Input
                                                startIcon={IoMdMail}
                                                id="email"
                                                type="email"
                                                placeholder="email@example.com"
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokeDark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                defaultValue="e.kallensp@gmail.com"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-4.5">
                                        <Button
                                            variant="ghost"
                                            className="flex justify-center rounded border border-stroke py-1 px-4 font-medium text-black hover:shadow-1 dark:border-strokeDark dark:text-white"
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="flex justify-center rounded bg-primary py-1 px-4 font-medium text-gray hover:bg-opacity-90"
                                        >
                                            Guardar
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-5 xl:col-span-2">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokeDark dark:bg-boxDark">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokeDark">
                                <h3 className="font-medium text-black dark:text-white">Tu foto</h3>
                            </div>
                            <div className="p-7">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                    }}
                                >
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="h-14 w-14 rounded-full">
                                            <img src={userThree} alt="User" />
                                        </div>
                                        <div>
                                            <span className="mb-1.5 text-black dark:text-white">Edita tu foto</span>
                                        </div>
                                    </div>

                                    <div
                                        id="FileUpload"
                                        className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                                        />
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-full dark:border-strokeDark dark:bg-boxDark">
                                                <FaCloudArrowUp size={24} />
                                            </span>
                                            <p>
                                                <span className="text-primary">Arrastra tu foto o haz click aquí</span>
                                            </p>
                                            <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                                            <p>(max, 800 X 800px)</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-4.5">
                                        <Button
                                            variant="ghost"
                                            className="flex justify-center rounded border border-stroke py-1 px-4 font-medium text-black hover:shadow-1 dark:border-strokeDark dark:text-white"
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="flex justify-center rounded bg-primary py-1 px-4 font-medium text-gray hover:bg-opacity-90"
                                        >
                                            Guardar
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
