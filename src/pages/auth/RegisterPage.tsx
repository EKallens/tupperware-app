import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Logo from '@/assets/images/logo/recipe-logo-oficial.svg'
import { motion } from 'framer-motion'
import { FaUnlock } from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'
import { FaUser } from 'react-icons/fa'
import { useState } from 'react'
import { Loader } from 'lucide-react'

export const RegisterPage = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = () => {
        setIsLoading(true)
        setTimeout(() => {
            navigate('/auth/verify')
            setIsLoading(false)
        }, 2000)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full overflow-hidden"
        >
            <Card className="bg-white mx-auto max-w-sm">
                <CardHeader className="space-y-1 flex flex-col text-center items-center">
                    <CardTitle>
                        <img src={Logo} alt="Logo" width={160} height={160} />
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        Ingresa tu nombre, correo y contraseña para crear una cuenta nueva
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Input startIcon={FaUser} id="name" type="text" placeholder="nombre" required />
                        </div>
                        <div className="space-y-2">
                            <Input
                                startIcon={IoMdMail}
                                id="email"
                                type="email"
                                placeholder="email@example.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                startIcon={FaUnlock}
                                id="password"
                                type="password"
                                placeholder="*********"
                                required
                            />
                        </div>
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                            onClick={handleSubmit}
                        >
                            Registrarse {isLoading ? <Loader className="w-6 h-6 animate-spin" /> : null}
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
        </motion.div>
    )
}
