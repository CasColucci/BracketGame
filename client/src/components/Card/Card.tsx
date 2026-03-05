import type { PropsWithChildren } from "react";
import styles from './Card.module.css';

interface CardProps extends PropsWithChildren {
    title: string
    variant?: string
    titleAlign?: "left" | "center" | "right"
}

export default function Card({ title, variant = "normal", titleAlign = "center", children }: CardProps) {
    return (
        <div className={`${styles.card} ${styles.pink} ${styles[variant]}`}>
            <h1 className={`${styles.title}`} style={{ textAlign: titleAlign }}>{title}</h1>
            <hr className={styles.line} />
            {children}
        </div >
    );
};
