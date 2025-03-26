"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface BoomerContextType {
    boomerMode: boolean;
    toggleBoomerMode: () => void;
}

const BoomerContext = createContext<BoomerContextType | undefined>(undefined);

export const useBoomerMode = () => {
    const context = useContext(BoomerContext);
    if (!context) throw new Error("useBoomerMode must be used inside BoomerProvider");
    return context;
};

export const BoomerProvider = ({ children }: { children: ReactNode }) => {
    const [boomerMode, setBoomerMode] = useState<boolean>(false); // Default to false

    useEffect(() => {
        // Load initial state from localStorage after the component has mounted
        const storedBoomerMode = localStorage.getItem("boomerMode") === "true";
        setBoomerMode(storedBoomerMode);
    }, []);

    const toggleBoomerMode = () => {
        setBoomerMode((prev) => {
            const newMode = !prev;
            localStorage.setItem("boomerMode", newMode.toString());
            return newMode;
        });
    };

    return (
        <BoomerContext.Provider value={{ boomerMode, toggleBoomerMode }}>
            <div className={boomerMode ? "boomer-mode" : ""}>{children}</div>
        </BoomerContext.Provider>
    );
};