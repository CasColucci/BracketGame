import styles from './Input.module.css';

interface InputProps {
    placeholder: string
    disabled?: boolean
    onChange?: (value: string) => void
}

export default function input({ placeholder, disabled = false, onChange }: InputProps) {
    return (
        <input disabled={disabled} placeholder={placeholder}
            className={`${styles.input}`} onChange={(e) => onChange?.(e.target.value)} />
    )
}

