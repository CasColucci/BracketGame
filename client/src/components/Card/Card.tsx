import type { PropsWithChildren } from "react";
import styles from './Card.module.css';

interface CardProps extends PropsWithChildren {
    title: string
}

export default function Card({ title, children }: CardProps) {
    return (
        <div className={`${styles.card} ${styles.pink}`}>
            <h1 className={`${styles.title}`}>{title}</h1>
            <hr className={styles.line} />
            {children}
        </div >
    );
};
