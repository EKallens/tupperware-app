import { useEffect } from 'react'
import useLocalStorage from './use-local-storage'

export const useColorMode = (): [string, (value: string) => void] => {
    const [colorMode, setColorMode] = useLocalStorage('color-theme', 'light')

    useEffect(() => {
        const className = 'dark'
        const bodyClass = window.document.body.classList

        if (colorMode === 'dark') {
            bodyClass.add(className)
        } else {
            bodyClass.remove(className)
        }
    }, [colorMode])

    return [colorMode, setColorMode]
}
