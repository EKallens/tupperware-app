import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { verifyEmail } from '@/lib/authApi'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/useAuthStore'

export const EmailVerificationPage = () => {
    const [code, setCode] = useState(['', '', '', '', '', ''])
    const inputRefs = useRef<HTMLInputElement[]>([])
    const navigate = useNavigate()
    const { setIsAuthenticated } = useAuthStore()

    const { mutate, isError, error, isPending } = useMutation({
        mutationFn: verifyEmail,
        onSuccess: () => {
            setIsAuthenticated(true)
            navigate('/dashboard')
            toast.success('Email verificado correctamente', {
                duration: 5000,
                position: 'top-center'
            })
        }
    })

    const handleChange = (index: number, value: string) => {
        const newCode = [...code]

        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split('')
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || ''
            }
            setCode(newCode)

            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== '')
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5
            inputRefs.current[focusIndex].focus()
        } else {
            newCode[index] = value
            setCode(newCode)

            if (value && index < 5) {
                inputRefs.current[index + 1].focus()
            }
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus()
        }
    }

    const handleSubmit = useCallback(
        async (e: any) => {
            e.preventDefault()
            const verificationCode = code.join('')
            try {
                mutate(verificationCode)
            } catch (error) {
                console.log(error)
            }
        },
        [code, mutate]
    )

    useEffect(() => {
        if (code.every((digit) => digit !== '')) {
            handleSubmit(new Event('submit'))
        }
    }, [code, handleSubmit])

    return (
        <div className="bg-black max-w-md w-full backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-black backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-primary">Verifica tu correo</h2>
                <p className="text-center text-gray-300 mb-6">Ingresa el código de 6 dígitos enviado a tu correo</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-between">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el: HTMLInputElement) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength={6}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-primary focus:outline-none"
                            />
                        ))}
                    </div>
                    {isError && <p className="text-center text-sm text-rose-600">{error.message}</p>}
                    <Button
                        variant="primary"
                        type="submit"
                        className="w-full text-md rounded-lg"
                        disabled={isPending}
                        onClick={handleSubmit}
                    >
                        {isPending ? <Loader className="animate-spin" /> : 'Verificar Correo'}
                    </Button>
                </form>
            </motion.div>
        </div>
    )
}
