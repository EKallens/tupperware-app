import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Logo from '@/assets/images/logo/recipe-logo-oficial.svg'
import GoogleLogo from '@/assets/images/logo/google.svg'
import Icons from '@/components/icons/Icons'

export const LoginPage = () => {
    return (
        <Card className="bg-white mx-auto max-w-sm">
            <CardHeader className="space-y-1 flex flex-col text-center items-center">
                <CardTitle>
                    <img src={Logo} alt="Logo" width={160} height={160} />
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    Ingresa tu correo y contraseña para acceder a tu cuenta
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Correo</Label>
                        <Input id="email" type="email" placeholder="email@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input id="password" type="password" required />
                    </div>
                    <Button variant="primary" type="submit" className="w-full">
                        <Link to="/">Iniciar sesión</Link>
                    </Button>
                </div>
                <div className="mt-4 mb-4 text-center text-sm">
                    No tienes una cuenta?{' '}
                    <Link to="/auth/register" className="underline">
                        Regístrate
                    </Link>
                </div>

                <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-b border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-3 text-sm text-gray-500 uppercase">O inicia sesión con</span>
                    </div>
                </div>
                <Button
                    className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    type="button"
                >
                    <img src={GoogleLogo} alt="Google" width={30} height={30} />
                    Google
                </Button>
            </CardContent>
        </Card>
    )
}
