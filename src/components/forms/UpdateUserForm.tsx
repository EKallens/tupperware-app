import { toast } from 'sonner'
import { Loader } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { useMutation } from '@tanstack/react-query'
import { User } from '@/interfaces/users/users.interface'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateUserSchema } from '@/schemas/user.schema'
import { updateUser } from '@/lib/userApi'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const UpdateUserForm = () => {
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

    const form = useForm({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || ''
        }
    })

    const onSubmit = (data: Omit<User, 'isVerified' | 'id'>) => {
        if (user?.id) {
            userMutation.mutate({ ...data, id: user.id })
        }
    }

    return (
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
                                                        className="mb-2"
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
                                                        className="mb-2"
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
                                    Guardar {userMutation.isPending ? <Loader className="ml-2 animate-spin" /> : null}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}
