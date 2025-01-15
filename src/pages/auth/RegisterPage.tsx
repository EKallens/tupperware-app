import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Logo from '@/assets/images/logo/recipe-logo-oficial.svg'
import { motion } from 'framer-motion'
import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/store/useAuthStore'
import { useMutation } from '@tanstack/react-query'
import { register as registerUser } from '../../lib/authApi'
import { toast } from 'sonner'
import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

interface RegisterFormInputs {
    email: string
    name: string
    password: string
}

export const RegisterPage = (): JSX.Element => {
    const { register, reset, handleSubmit } = useForm<RegisterFormInputs>()
    const setUser = useAuthStore((state) => state.setUser)
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState)
    }

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            setUser({
                id: data.user.id,
                name: data.user.name,
                email: data.user.email
            })
            navigate('/auth/verify')
            reset()
        },
        onError: () => {
            toast.error('Error al registrar el usuario', {
                duration: 5000,
                position: 'top-center'
            })
        }
    })

    const onSubmit = (data: RegisterFormInputs) => {
        mutate(data)
    }

    const navigate = useNavigate()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full overflow-hidden"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="bg-white mx-auto max-w-sm">
                    <CardHeader className="space-y-1 flex flex-col text-center items-center">
                        <CardTitle>
                            <img src={Logo} alt="Logo" width={160} height={160} />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">
                                    Nombre
                                </label>
                                <Input
                                    id="name"
                                    type="text"
                                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    {...register('name', { required: true })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">
                                    Correo
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    {...register('email', { required: true })}
                                />
                            </div>
                            <div className="relative space-y-2 mb-6">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">
                                    Contraseña
                                </label>
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    {...register('password', { required: true })}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-6 inset-y-0 right-3 flex items-center"
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>

                            {isError && <p className="text-sm text-rose-600">{error.message}</p>}

                            <Button variant="primary" type="submit" className="w-full mt-10" disabled={isPending}>
                                Registrarse {isPending ? <Loader className="w-6 h-6 animate-spin" /> : null}
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Ya tienes una cuenta?{' '}
                            <Link to="/auth/login" className="underline">
                                Inicia sesión
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </motion.div>
    )
}
