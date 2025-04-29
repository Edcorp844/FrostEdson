'use client'

import { ChevronDownIcon } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNews } from '@/context/news-context';

const languages = [
    { label: 'English', code: 'en' },
    { label: 'Arabic', code: 'ar' },
    { label: 'Spanish', code: 'es' },
    { label: 'French', code: 'fr' },
    { label: 'Hebrew', code: 'he' },
    { label: 'Italian', code: 'it' },
    { label: 'Dutch', code: 'nl' },
    { label: 'Norwegian', code: 'no' },
    { label: 'Portuguese', code: 'pt' },
    { label: 'Russian', code: 'ru' },
    { label: 'Swedish', code: 'sv' },
    { label: 'Ukrainian', code: 'ud' },
    { label: 'Chinese', code: 'zh' },
];



export default function LanguageSelector() {
    const { selectedLanguage, setSelectedLanguage } = useNews()
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLanguageChange = (code: string) => {
        setSelectedLanguage(code);
        setDropdownOpen(false); // Close dropdown after selection
    };

    return (
        <div className="relative">
            {/* Language display */}
            <div className="flex items-center space-x-1 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {languages.find(lang => lang.code === selectedLanguage)?.label}
                </span>
                <ChevronDownIcon className="h-4 w-4" />
            </div>

            {/* Animated dropdown */}
            <AnimatePresence>
                {dropdownOpen && (
                    <motion.div
                        key="language-dropdown"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                        className="absolute z-10 mt-2 w-48 bg-background rounded-lg shadow-[0px_10px_20px_7px_rgba(0,0,0,0.2)] ring-1 ring-separator focus:outline-none right-0"
                    >
                        <div className="py-2">
                            {languages.map(({ label, code }) => (
                                <motion.button
                                    key={code}
                                    onClick={() => handleLanguageChange(code)}
                                    className="block w-full text-left px-4 py-2 text-sm font-medium hover:bg-backgroundLayer1 hover:shadow-lg hover:border hover:border-separator hover:rounded"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {label}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


