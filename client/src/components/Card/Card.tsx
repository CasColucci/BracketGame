import type { PropsWithChildren } from "react";
import styles from './Card.module.css';

interface CardProps extends PropsWithChildren {
    title: string
}

export default function Card({ title, children }: CardProps) {
    return (
        <div className={styles.card}>
            <h1>{title}</h1>
            {children}
        </div>
    );
};
