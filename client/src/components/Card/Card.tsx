import type { PropsWithChildren } from "react"

interface CardProps extends PropsWithChildren {
    title: string
}

export const Card = ({ title, children }: CardProps) => {
    return (
        <div>
            <h1>{title}</h1>
            {children}
        </div>
    );
};
