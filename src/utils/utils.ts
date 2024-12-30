import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Difficulty, DifficultyLabels } from './constants'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getDifficultyLabel(difficulty: string): string {
    return DifficultyLabels[difficulty as Difficulty] || difficulty
}

export function createTagOptions(tags: { id: string; name: string }[]) {
    return tags.map((tag) => ({ label: tag.name, value: tag.id }))
}
