"use client";
import { useBoomerMode } from "./BoomerModeProvider";

const BoomerToggle = () => {
    const { boomerMode, toggleBoomerMode } = useBoomerMode();

    return (
        <div className="flex justify-center items-center gap-2">
            <label htmlFor="boomerToggle" className="text-sm text-nowrap text-gray-700">
                🧓 Boomer Mode
            </label>
            <div
                className={`relative w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${boomerMode ? "bg-green-500" : "bg-gray-300"
                    }`}
                onClick={toggleBoomerMode}
            >
                <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${boomerMode ? "translate-x-4" : "translate-x-0"
                        }`}
                ></div>
            </div>
        </div>
    );
};

export default BoomerToggle;