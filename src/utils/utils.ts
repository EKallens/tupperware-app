import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function transformDifficulty(difficulty: string) {
    switch (difficulty) {
        case 'easy':
            return 'Fácil'
        case 'medium':
            return 'Intermedio'
        case 'hard':
            return 'Difícil'
        default:
            return difficulty
    }
}
