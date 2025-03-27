"use client";
import { useBoomerMode } from "./BoomerModeProvider";

const ModeToggle = () => {
    const { boomerMode, advancedMode, simpleMode, toggleBoomerMode, toggleAdvancedMode, toggleSimpleMode } = useBoomerMode();

    const getActive = () => {
        if (simpleMode) return "simple";
        if (advancedMode) return "advanced";
        return "boomer"; // Default to "boomer"
    };

    const setMode = (mode: "boomer" | "simple" | "advanced") => {
        if (mode === "boomer") {
            if (!boomerMode) toggleBoomerMode();
            if (advancedMode) toggleAdvancedMode();
            if (simpleMode) toggleSimpleMode();
        } else if (mode === "advanced") {
            if (!advancedMode) toggleAdvancedMode();
            if (boomerMode) toggleBoomerMode();
            if (simpleMode) toggleSimpleMode();
        } else if (mode === "simple") {
            if (!simpleMode) toggleSimpleMode();
            if (boomerMode) toggleBoomerMode();
            if (advancedMode) toggleAdvancedMode();
        }
    };

    return (
        <div className="flex justify-center items-center gap-2 py-4">
            <span className={boomerMode ? `text-xl text-gray-900` : `text-base text-white`}>Mode:</span>
            <div className="flex bg-gray-200 rounded-full overflow-hidden text-xs font-medium shadow-sm">
                <button
                    onClick={() => setMode("boomer")}
                    className={`px-4 py-1 transition ${getActive() === "boomer" ? "bg-yellow-100 text-yellow-800" : "text-gray-900"}`}
                >
                    Boomer
                </button>
                <button
                    onClick={() => setMode("simple")}
                    className={`px-4 py-1 transition ${getActive() === "simple" ? "bg-white text-gray-900" : "text-gray-900"}`}
                >
                    Simple
                </button>
                <button
                    onClick={() => setMode("advanced")}
                    className={`px-4 py-1 transition ${getActive() === "advanced" ? "bg-purple-100 text-purple-800" : "text-gray-900"}`}
                >
                    Advanced
                </button>
            </div>
        </div>
    );
};

export default ModeToggle;