export const appName = 'Tupperware'

export enum Difficulty {
    Easy = '1',
    Intermediate = '2',
    Hard = '3'
}

export const DifficultyLabels: Record<Difficulty, string> = {
    [Difficulty.Easy]: 'Fácil',
    [Difficulty.Intermediate]: 'Intermedio',
    [Difficulty.Hard]: 'Difícil'
}

export const difficultyOptions = Object.entries(DifficultyLabels).map(([value, label]) => ({
    value: value,
    label
}))
