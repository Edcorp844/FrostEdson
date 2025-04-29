'use client'

import { motion } from "framer-motion";
import React from "react";

interface FlameProgressBarProps {
    title: String;
    progress: number; // Percentage (0-100)
}

const FlameProgressBar: React.FC<FlameProgressBarProps> = ({ title = 'Progress', progress }) => {
    // Define theme-based styles
    const theme =
    {
        bg: "none",
        bar: "bg-gradient-to-r from-gray1 to-gray5 dark:bg-gradient-to-r from-dark-gray5 to-dark-gray1",
        text: "text-black dark:text-white",
    };

    return (
        <div className={`w-full max-w-lg p-4 rounded-lg shadow-lg outline outline-separator ${theme.bg}`}>
            <p className={`text-sm font-semibold ${theme.text}`}>
                {title} : {progress}%
            </p>
            <div className="w-full h-3 rounded-full overflow-hidden mt-2 bg-opacity-30">
                <motion.div
                    className={`h-full ${theme.bar} rounded-full`}
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
            </div>
        </div>
    );
};

export default FlameProgressBar;

