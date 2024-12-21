import { format, parseISO, addDays, subDays, differenceInDays, isAfter, isBefore } from 'date-fns'

interface DateAdapter {
    format: (date: Date, dateFormat: string) => string
    parseISO: (isoString: string) => Date
    addDays: (date: Date, days: number) => Date
    subDays: (date: Date, days: number) => Date
    differenceInDays: (date1: Date, date2: Date) => number
    isAfter: (date1: Date, date2: Date) => boolean
    isBefore: (date1: Date, date2: Date) => boolean
    now: () => Date
}

const dateAdapter: DateAdapter = {
    format: (date, dateFormat) => format(date, dateFormat),
    parseISO: (isoString) => parseISO(isoString),
    addDays: (date, days) => addDays(date, days),
    subDays: (date, days) => subDays(date, days),
    differenceInDays: (date1, date2) => differenceInDays(date1, date2),
    isAfter: (date1, date2) => isAfter(date1, date2),
    isBefore: (date1, date2) => isBefore(date1, date2),
    now: () => new Date()
}

export default dateAdapter
