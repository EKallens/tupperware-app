import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function transformDifficulty(difficulty: number) {
    switch (difficulty) {
        case 1:
            return 'Fácil'
        case 2:
            return 'Intermedio'
        case 3:
            return 'Difícil'
        default:
            return difficulty
    }
}
