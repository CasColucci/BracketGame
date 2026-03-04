import styles from './Input.module.css';

interface InputProps {
    placeholder: string
    disabled?: boolean
}

export default function Input({ placeholder, disabled = false }: InputProps) {
    return (
        <input disabled={disabled} placeholder={placeholder} className={`${styles.input}`} />
    )
}

