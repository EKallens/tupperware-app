type Props = {
    message: string
}

export const FormError = ({ message }: Props) => {
    return <span className="mb-2 text-sm text-rose-600">{message}</span>
}
