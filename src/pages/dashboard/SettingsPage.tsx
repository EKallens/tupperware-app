import { Breadcrumb } from '@/components/breadcrumb/Breadcrumb'
import defaultUserImage from '@/assets/images/user/default-user.svg'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { FaCloudArrowUp } from 'react-icons/fa6'
import { useAuthStore } from '@/store/useAuthStore'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { updateUserSchema } from '@/schemas/user.schema'
import { updateImageUser, updateUser } from '@/lib/userApi'
import { User } from '@/interfaces/users/users.interface'
import { toast } from 'sonner'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Loader } from 'lucide-react'

export const SettingsPage = (): JSX.Element => {
    const { user, setUser } = useAuthStore()

    const userMutation = useMutation({
        mutationFn: (userInfo: Omit<User, 'isVerified'>) => updateUser(userInfo),
        onSuccess: (data) => {
            setUser({ ...user, id: data.id, name: data.name, email: data.email })
            toast.success('Usuario actualizado correctamente')
        },
        onError: () => {
            toast.error('Error al actualizar el usuario')
        }
    })

    const userImageMutation = useMutation({
        mutationFn: (file: File) => updateImageUser(user!.id, file),
        onSuccess: (data) => {
            setUser(data)
            toast.success('Imagen actualizada correctamente')
        },
        onError: () => {
            toast.error('Error al actualizar el usuario')
        }
    })

    const form = useForm({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || ''
        }
    })

    const imageForm = useForm({})

    const onSubmit = (data: Omit<User, 'isVerified' | 'id'>) => {
        if (user?.id) {
            userMutation.mutate({ ...data, id: user.id })
        }
    }

    //const onImageSubmit = (data: { file?: File }) => data.file && userImageMutation.mutate(data.file)

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            userImageMutation.mutate(e.target.files[0])
        }
    }

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
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                            <div className="w-full sm:w-1/2">
                                                <FormField
                                                    name="name"
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm font-medium text-black dark:text-white">
                                                                Nombre
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="mb-2 dark:text-black-2"
                                                                    disabled={userMutation.isPending}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                {form.formState.errors.name ? (
                                                    <span className="mb-2 text-sm text-rose-600">
                                                        {form.formState.errors.name.message}
                                                    </span>
                                                ) : null}
                                                <FormField
                                                    name="email"
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm font-medium text-black dark:text-white">
                                                                Correo
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="mb-2 dark:text-black-2"
                                                                    disabled={userMutation.isPending}
                                                                    placeholder="p.ej. correo@correo.com"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                {form.formState.errors.email ? (
                                                    <span className="mb-2 text-sm text-rose-600">
                                                        {form.formState.errors.email.message}
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-4.5">
                                            <Button
                                                type="submit"
                                                variant="primary"
                                                disabled={userMutation.isPending}
                                                className="flex justify-center rounded bg-primary py-1 px-4 font-medium text-gray hover:bg-opacity-90"
                                            >
                                                Guardar{' '}
                                                {userMutation.isPending ? (
                                                    <Loader className="ml-2 animate-spin" />
                                                ) : null}
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-5 xl:col-span-2">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokeDark dark:bg-boxDark">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokeDark">
                                <h3 className="font-medium text-black dark:text-white">Tu foto</h3>
                            </div>
                            <div className="p-7">
                                <Form {...imageForm}>
                                    <form>
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="h-14 w-14 rounded-full">
                                                <img
                                                    className="rounded-full"
                                                    src={user?.img ?? defaultUserImage}
                                                    alt="User"
                                                />
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
                                                onChange={onImageChange}
                                                disabled={userImageMutation.isPending}
                                            />
                                            <div className="flex flex-col items-center justify-center space-y-3">
                                                <span className="flex h-10 w-10 items-center justify-center rounded-full dark:border-strokeDark dark:bg-boxDark">
                                                    <FaCloudArrowUp size={24} />
                                                </span>
                                                <div>
                                                    {userImageMutation.isPending ? (
                                                        <div className="flex flex-row items-center gap-1.5">
                                                            <span className="text-primary">Subiendo imagen</span>
                                                            <Loader className="w-6 h-6 animate-spin text-primary" />
                                                        </div>
                                                    ) : (
                                                        <span className="text-primary">
                                                            Arrastra tu foto o haz click aquí
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                                                <p>(max, 800 X 800px)</p>
                                            </div>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
