import { ITag } from '@/interfaces/tags/tags.interface'
import React from 'react'
import ReactSelect, { MultiValue } from 'react-select'

interface TagOption {
    value: string
    label: string
}

interface Props {
    defaultValues: TagOption[]
    options: TagOption[]
    className?: string
    onChange: (tags: ITag[]) => void
    placeholder?: string
}

export const MultiSelect: React.FC<Props> = ({ defaultValues, options, className, onChange, placeholder }) => {
    const handleChange = (newValue: MultiValue<TagOption>) => {
        const tags = newValue.map((tag) => ({ name: tag.label, id: tag.value }))
        onChange(tags)
    }

    return (
        <ReactSelect
            placeholder={placeholder}
            defaultValue={defaultValues}
            onChange={handleChange}
            options={options}
            className={className}
            classNamePrefix="select"
            isMulti
        />
    )
}
