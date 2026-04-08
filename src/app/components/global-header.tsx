'use client'

import { fadeIn, slide } from "@/utils/animations"
import { motion, AnimatePresence } from "framer-motion"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const GlobalHeader = () => {
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    const pages = [
        { label: 'Services', path: '/services' },
        { label: 'News', path: '/news' },
        { label: 'Shop', path: '/shop' }
    ];

    // Detect mobile screen size
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkIfMobile()
        window.addEventListener('resize', checkIfMobile)

        return () => {
            window.removeEventListener('resize', checkIfMobile)
        }
    }, [])

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [pathname])

    useEffect(() => {
        if (isMobileMenuOpen && isMobile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen, isMobile]);

    return (
        <nav className="relative z-60 bg-backgroundPrimary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={fadeIn('down', 'spring', 0, 0.8)}
                    initial="hidden"
                    animate="show"
                    className="flex items-center justify-between h-16"
                >
                    {/* Logo */}
                    <div className="flex-1 flex md:flex-none justify-start items-center">
                        <span className="text-xl font-semibold dark:text-white font-serif flex gap-2">
                            FROST <span className="text-[#ff375f] hidden md:block">EDSON</span>
                        </span>
                    </div>

                    {/* Desktop Navigation - unchanged */}
                    <nav className="hidden md:flex items-center space-x-4 xl:space-x-8 relative">
                        {pages.map((page, index) => (
                            <Link href={page.path} key={page.label} className="relative">
                                <motion.button
                                    custom={index}
                                    variants={slide}
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                    className="relative px-1 py-2 text-sm font-medium transition-colors"
                                >
                                    {page.label}
                                    {pathname === page.path && (
                                        <motion.span
                                            layoutId="underline"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff375f] rounded"
                                        />
                                    )}
                                </motion.button>
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA - unchanged */}
                    <div className="hidden md:flex items-center space-x-4 justify-end">
                        <div className="bg-foreground text-background font-bold px-4 py-2 rounded-3xl shadow-lg">
                            Hire Me
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden flex flex-col gap-1 z-50 justify-end "
                        >
                            <span className={`w-6 h-0.5 rounded-lg bg-gray1 transition-all  ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                            <span className={`w-4 h-0.5 rounded-lg bg-gray1 transition-all  ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5 opacity-100 w-6' : ''}`}></span>
                        </button>

                    </div>
                </motion.div>
            </div>

            {/* Apple-style Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && isMobile && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-backgroundPrimary z-60 md:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ y: '-100%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: '-100%', opacity: 0 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 200
                            }}
                            className="fixed top-0 left-0 right-0 bg-backgroundPrimary backdrop-blur-md z-60 md:hidden"
                        >
                            <div className="pt-16 pb-8 px-6">
                                {/* Close Button */}
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="absolute top-4 right-4 p-2 rounded-full transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {/* Mobile Navigation Links */}
                                <div className="space-y-2">
                                    {pages.map((page, index) => (
                                        <motion.div
                                            key={page.label}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            {/*   className={`block  font-medium py-2 transition-colors`}*/}

                                            <Link
                                                href={page.path}
                                                className={`block  font-medium py-2 transition-colors`}
                                            >
                                                {page.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Mobile CTA */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="mt-8 pt-6 border-t border-gray-200"
                                >
                                    <button className="w-full bg-[#ff375f] text-white font-bold py-4 px-6 rounded-2xl shadow-lg text-lg">
                                        Hire Me
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default GlobalHeader;