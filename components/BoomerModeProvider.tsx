// components/BoomerModeProvider.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface ModeContextType {
    boomerMode: boolean;
    advancedMode: boolean;
    simpleMode: boolean;
    toggleBoomerMode: () => void;
    toggleAdvancedMode: () => void;
    toggleSimpleMode: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const useBoomerMode = () => {
    const context = useContext(ModeContext);
    if (!context) throw new Error("useBoomerMode must be used inside ModeProvider");
    return context;
};

export const BoomerProvider = ({ children }: { children: ReactNode }) => {
    const [boomerMode, setBoomerMode] = useState<boolean>(true); // Default to true
    const [advancedMode, setAdvancedMode] = useState<boolean>(false);
    const [simpleMode, setSimpleMode] = useState<boolean>(false);

    const toggleBoomerMode = () => setBoomerMode((prev) => !prev);
    const toggleAdvancedMode = () => setAdvancedMode((prev) => !prev);
    const toggleSimpleMode = () => setSimpleMode((prev) => !prev);

    return (
        <ModeContext.Provider
            value={{ boomerMode, advancedMode, simpleMode, toggleBoomerMode, toggleAdvancedMode, toggleSimpleMode }}
        >
            <div className={boomerMode ? "boomer-mode" : advancedMode ? "advanced-mode" : simpleMode ? "simple-mode" : ""}>
                {children}
            </div>
        </ModeContext.Provider>
    );
};
