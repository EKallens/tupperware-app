import { ITag } from '@/interfaces/tags/tags.interface'
import React from 'react'
import { MultiValue } from 'react-select'
import CreatableSelect from 'react-select/creatable'

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
    onCreate?: (value: string) => void
}

export const MultiSelect: React.FC<Props> = ({
    defaultValues,
    options,
    className,
    onChange,
    onCreate,
    placeholder
}) => {
    const handleChange = (newValue: MultiValue<TagOption>) => {
        const tags = newValue.map((tag) => ({ name: tag.label, id: tag.value }))
        onChange(tags)
    }

    return (
        <CreatableSelect
            placeholder={placeholder}
            defaultValue={defaultValues}
            onChange={handleChange}
            onCreateOption={onCreate}
            options={options}
            className={className}
            classNamePrefix="select"
            isMulti
        />
    )
}
