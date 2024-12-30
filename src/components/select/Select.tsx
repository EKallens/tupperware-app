import { useMemo } from 'react'
import { SingleValue } from 'react-select'
import ReactSelect from 'react-select'

type Props = {
    onChange: (value?: string) => void
    options: { label: string; value: string }[]
    value?: string | null | undefined
    disabled?: boolean
    placeholder?: string
    className?: string
    isError?: boolean
    isSearchable?: boolean
    isClearable?: boolean
    isMulti?: boolean
}

export const Select = ({
    onChange,
    options = [],
    value,
    disabled,
    placeholder,
    isError,
    isSearchable = false,
    isClearable = false
}: Props) => {
    const onSelect = (option: SingleValue<{ label: string; value: string }>) => {
        onChange(option?.value)
    }

    const formattedValue = useMemo(() => {
        return options.find((option) => option.value === value)
    }, [options, value])

    return (
        <ReactSelect
            placeholder={placeholder}
            className="text-sm h-10"
            styles={{
                control: (base) => ({
                    ...base,
                    borderColor: `${isError ? '#E11D48' : '#e2e8f0'}`,
                    hover: {
                        borderColor: '#e2e8f0'
                    }
                })
            }}
            isSearchable={isSearchable}
            isClearable={isClearable}
            value={formattedValue}
            onChange={onSelect}
            options={options}
            isDisabled={disabled}
        />
    )
}
