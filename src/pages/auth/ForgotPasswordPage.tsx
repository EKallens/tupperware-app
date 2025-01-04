import { motion } from 'framer-motion'
import { ArrowLeft, Loader, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { forgotPassword } from '@/lib/authApi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema } from '@/schemas/auth.schema'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { toast } from 'sonner'

export const ForgotPasswordPage = () => {
    const form = useForm<{ email: string }>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: ''
        }
    })

    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: forgotPassword,
        onSuccess: () => {
            toast.success('Correo enviado')
        },
        onError: (error) => {
            toast.error(error?.message, { position: 'bottom-center' })
        }
    })

    const handleSubmit = (values: { email: string }) => {
        mutate(values.email)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-black backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
        >
            <div className="p-8">
                <div className="flex items-center mb-6">
                    <Mail className="h-8 w-8 text-white mr-4" />
                    <h2 className="text-3xl font-bold text-center text-primary bg-clip-text">Restablecer Contraseña</h2>
                </div>

                <Form {...form}>
                    {!isSuccess ? (
                        <form onSubmit={form.handleSubmit(handleSubmit)}>
                            <p className="text-gray-300 mb-6 text-center text-sm">
                                Ingresa tu correo y te enviaremos un link para restablecer tu contraseña
                            </p>
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="mb-2"
                                                disabled={isPending}
                                                placeholder="p.ej. correo@correo.com"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            {form.formState.errors.email ? (
                                <span className="mb-2 text-sm text-rose-600">Debes ingresar un correo válido</span>
                            ) : null}

                            <Button variant="primary" className="w-full mt-4">
                                Enviar correo {isPending ? <Loader className="ml-2 animate-spin" /> : null}
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center">
                            <p className="text-gray-300 mb-6">
                                Se envió un correo a {form.getValues().email}. Sigue las instrucciones para restablecer
                                tu contraseña.
                            </p>
                        </div>
                    )}
                </Form>
            </div>

            <div className="px-8 py-4 bg-gray-900 flex justify-center">
                <Link to={'/login'} className="text-sm text-white hover:underline flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Volver
                </Link>
            </div>
        </motion.div>
    )
}
