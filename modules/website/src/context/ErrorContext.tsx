import React, { useState, createContext } from "react";

export interface ErrorContextType {
    message: string;
    title?: string;
    isOpen: boolean;
    showError: (message: string, title?: string) => void;
    close: () => void;
}

export const ErrorContext = createContext<ErrorContextType>({} as any);

export function ErrorContextProvider({children}: {children: React.ReactNode}) {
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const showError = (errorMsg: string, title?: string) => {
        setMessage(errorMsg);
        setTitle(title || "");
        setIsOpen(true);
        new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 3000)
        }).then(() => {
            setIsOpen(false);
        })
    }

    const close = () => {
        setIsOpen(false);
    }

    const value = {
        message,
        title, 
        isOpen, 
        showError,
        close
    }

    return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}
