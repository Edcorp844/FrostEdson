'use client'

import { fadeIn, slide } from "@/utils/animations"
import { motion } from "framer-motion"
import Link from 'next/link'
import { usePathname } from 'next/navigation' // 🌟 We listen to the path of the journey

const GlobalHeader = () => {
    const pathname = usePathname() // 🎯 Gather the current path
    const pages = [
        { label: 'Portfolio', path: '/portfolio' },
        { label: 'News', path: '/news' },
        { label: 'Services', path: '/services' },
        { label: 'Shop', path: '/shop' }
    ];

    return (
        <nav className="top-0 z-50 bg-backgroundPrimary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={fadeIn('down', 'spring', 0, 0.8)}
                    initial="hidden"
                    animate="show"
                    className="flex items-center justify-between h-16"
                >
                    <div className="flex-1 flex md:flex-none justify-center md:justify-start items-center">
                        <span className="text-xl font-semibold dark:text-white font-serif">
                            FROST <span className="text-[#ff375f]">EDSON</span>
                        </span>
                    </div>

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

                    <div className="flex items-center space-x-4">
                        <div className="bg-foreground text-background font-bold px-4 py-2 rounded-3xl shadow-lg">
                            Hire Me
                        </div>
                    </div>
                </motion.div>
            </div>
        </nav>
    );
}

export default GlobalHeader;
