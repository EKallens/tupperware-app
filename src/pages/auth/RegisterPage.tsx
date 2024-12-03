import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Logo from '@/assets/images/logo/recipe-logo-oficial.svg'

export const RegisterPage = (): JSX.Element => {
    return (
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
                        <Label htmlFor="email">Nombre</Label>
                        <Input id="name" type="text" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Correo</Label>
                        <Input id="email" type="email" placeholder="email@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input id="password" type="password" required />
                    </div>
                    <Button variant="primary" type="submit" className="w-full">
                        Registrarse
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
    )
}
