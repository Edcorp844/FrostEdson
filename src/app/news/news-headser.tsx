'use client'

import { Search, CircleXIcon, MenuIcon } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, item, menuSlide, slide } from '@/utils/animations';
import LanguageSelector from './language-selector';
import { useNews } from '@/context/news-context';




export default function NewsHeader() {
    const {
        activeCategory,
        setActiveCategory,
        selectedLanguage,
        setSelectedLanguage
    } = useNews()

    const categories: Category[] = [
        { label: 'General', category: 'general' },
        { label: 'Business', category: 'business' },
        { label: 'Entertainment', category: 'entertainment' },
        { label: 'Health', category: 'health' },
        { label: 'Science', category: 'science' },
        { label: 'Sports', category: 'sports' },
        { label: 'Technology', category: 'technology' }
    ];

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-backdrop backdrop-blur-md border-b border-separator">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={fadeIn('down', 'spring', 0, 0.8)}
                    initial="hidden"
                    animate="show"
                    className="flex items-center justify-between h-16"
                >
                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                <CircleXIcon className="block h-6 w-6 text-systemRed" />
                            ) : (
                                <MenuIcon className="block h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* Logo - centered on mobile */}
                    <div className="flex-1 flex md:flex-none justify-center md:justify-start items-center">
                        <span className="text-xl font-semibold dark:text-white">FrostNews</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-4 xl:space-x-8">
                        {categories.map((category, i) => (
                            <motion.button
                                custom={i}
                                variants={slide}
                                initial="initial"
                                animate="enter"
                                exit="exit"
                                key={category.category}
                                onClick={() => setActiveCategory(category)}
                                className={`relative px-1 py-2 text-sm font-medium transition-colors ${activeCategory.label === category.label
                                    ? ''
                                    : 'text-gray1 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                {category.label}
                                {activeCategory.label === category.label && (
                                    <motion.span
                                        layoutId="underline"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff375f] rounded"
                                    ></motion.span>
                                )}
                            </motion.button>
                        ))}
                    </nav>

                    {/* Right side controls */}
                    <div className="flex items-center space-x-4">
                        <button className="p-1 rounded-full focus:outline-none">
                            <Search className="h-5 w-5" />
                        </button>

                        <LanguageSelector/>
                    </div>
                </motion.div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        key="mobile-menu"
                        variants={menuSlide}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-backgroundPrimary shadow-xl"
                    >
                        {categories.map((category, i) => (
                            <motion.button
                                custom={i}
                                variants={item}
                                initial="hidden"
                                animate="show"
                                key={category.label}
                                onClick={() => {
                                    setActiveCategory(category);
                                    setMobileMenuOpen(false);
                                }}
                                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${activeCategory.label === category.label
                                    ? 'bg-backgroundLayer1 text-black dark:text-white'
                                    : 'text-gray1 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                {category.label}
                            </motion.button>
                        ))}
                        <div className="border-t border-separator pt-2 mt-2">
                            <button className="flex items-center w-full px-3 py-2 text-base font-medium">
                                <Search className="h-5 w-5 mr-2" />
                                Search
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

