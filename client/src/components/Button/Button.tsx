import styles from './Button.module.css';

interface ButtonProps {
    label: string
    onClick: () => void
    disabled?: boolean
    variant?: string
}

export default function Button({ label, onClick, disabled = false, variant = "white" }: ButtonProps) {
    return (
        <button onClick={onClick} disabled={disabled} className={`${styles.button} ${styles[variant]}`}>
            {label}
        </button>
    )
}
