interface ButtonProps {
    label: string
    onClick: () => void
    disabled?: boolean
}

export default function Button({ label, onClick, disabled = false }: ButtonProps) {
    return (
        <button onClick={onClick} disabled={disabled}>
            {label}
        </button>
    )
}
