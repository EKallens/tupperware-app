import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema } from '@/schemas/auth.schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { resetPassword } from '@/lib/authApi'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

export const ResetPasswordPage = () => {
    const { token } = useParams()
    const navigate = useNavigate()

    const form = useForm<{ password: string; confirmPassword: string }>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    })

    const { mutate, isPending } = useMutation({
        mutationFn: (password: string) => resetPassword(token!, password),
        onSuccess: () => {
            toast.success(
                'La contraseña se ha cambiado correctamente. Ahora serás redirigido a la página de inicio de sesión'
            )
            setTimeout(() => {
                navigate('/auth/login')
            }, 2000)
        },
        onError: (error) => {
            toast.error(error.message, {
                position: 'top-center'
            })
        }
    })

    const handleSubmit = async (values: { password: string; confirmPassword: string }) => {
        mutate(values.password)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full backdrop-filter backdrop-blur-xl bg-white rounded-2xl shadow-xl overflow-hidden"
        >
            <div className="p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="mb-4">
                                    <FormLabel className="text-black">Nueva contraseña</FormLabel>
                                    <FormControl>
                                        <Input className="mb-2" disabled={isPending} type="password" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {form.formState.errors.password ? (
                            <span className="mb-2 text-sm text-rose-600">{form.formState.errors.password.message}</span>
                        ) : null}

                        <FormField
                            name="confirmPassword"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="mb-4">
                                    <FormLabel className="text-black">Repite la contraseña</FormLabel>
                                    <FormControl>
                                        <Input className="mb-2" disabled={isPending} type="password" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {form.formState.errors.confirmPassword ? (
                            <span className="mb-2 text-sm text-rose-600">
                                {form.formState.errors.confirmPassword.message}
                            </span>
                        ) : null}

                        <Button variant="primary" className="w-full mt-4">
                            Cambiar Contraseña {isPending ? <Loader className="animate-spin" /> : null}
                        </Button>
                    </form>
                </Form>
                <div className="flex justify-center">
                    <Link className="mt-4" to="/auth/login">
                        <span className="cursor-pointer">Volver al Inicio</span>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}
