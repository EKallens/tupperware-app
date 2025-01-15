import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Logo from '@/assets/images/logo/recipe-logo-oficial.svg'
import GoogleLogo from '@/assets/images/logo/google.svg'
import { motion } from 'framer-motion'
import { Loader } from 'lucide-react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/store/useAuthStore'
import { useMutation } from '@tanstack/react-query'
import { login } from '@/lib/authApi'
import { useState } from 'react'

interface LoginFormInputs {
    email: string
    password: string
}

export const LoginPage = (): JSX.Element => {
    const { register, handleSubmit, reset } = useForm<LoginFormInputs>()
    const setUser = useAuthStore((state) => state.setUser)
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState)
    }

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setUser({
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                isVerified: data.user.isVerified
            })
            setIsAuthenticated(true)
            navigate('/dashboard')
            reset()
        }
    })

    const onSubmit = (data: LoginFormInputs) => {
        mutate(data)
    }

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
                                    Correo
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    {...register('email', { required: true })}
                                />
                            </div>
                            <div className="relative space-y-2">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">
                                    Contraseña
                                </label>
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className="pr-10 w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    {...register('password', { required: true })}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 top-6 right-0 px-2"
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>

                            {isError && <p className="text-sm text-rose-600">{error.message}</p>}

                            <div className="mt-4 mb-4 text-right text-primary text-sm">
                                <Link to="/auth/forgot" className="underline">
                                    Olvidaste la contraseña?
                                </Link>
                            </div>

                            <Button variant="primary" type="submit" className="w-full" disabled={isPending}>
                                Iniciar sesión {isPending ? <Loader className="w-6 h-6 animate-spin" /> : null}
                            </Button>
                        </div>

                        <div className="relative py-4 mb-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-b border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white px-3 text-sm text-gray-500">O inicia sesión con</span>
                            </div>
                        </div>
                        <Button
                            className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                            type="button"
                        >
                            <img src={GoogleLogo} alt="Google" width={30} height={30} />
                            Google
                        </Button>
                        <div className="mt-4 mb-4 text-center text-sm">
                            No tienes una cuenta?{' '}
                            <Link to="/auth/register" className="underline">
                                Regístrate
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </motion.div>
    )
}
