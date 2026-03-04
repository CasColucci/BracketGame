import styles from './Input.module.css';

interface InputProps {
    placeholder: string
    disabled?: boolean
    onChange?: (value: string) => void
    value?: string
    maxLength?: number
    error?: string
}

export default function Input({ placeholder, disabled = false, onChange, value, maxLength, error }: InputProps) {
    return (
        <div className={styles.wrapper}>
            <input
                disabled={disabled}
                placeholder={placeholder}
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                onChange={(e) => onChange?.(e.target.value)}
                value={value}
                maxLength={maxLength}
            />
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    )
}

