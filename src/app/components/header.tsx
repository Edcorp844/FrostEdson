'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { menuSlide, slide } from '@/utils/animations'
import { navLinks } from '@/utils/constants'

export default function Header() {
    const [isActive, setIsActive] = useState(false)


    return (
        <header className="sticky top-0 z-50 bg-backdrop backdrop-blur-md border-b border-separator">
            <div className="container mx-auto px-6 flex justify-between items-center h-16">
                <Link href="/" className="text-2xl font-bold gap-2" style={{ fontFamily: 'cursive' }}>
                    <span>Frost</span>
                    <span className='hidden md:inline'> Edson</span>
                </Link>

                <nav className="hidden md:flex gap-8">
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.path}
                            className="relative text-sm font-medium hover:bg-[linear-gradient(108deg,#0894FF_0%,#C959DD_34%,#FF2E54_68%,#FF9004_100%)] hover:bg-clip-text hover:text-transparent transition-colors"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                        </Link>
                    ))}
                </nav>

                <button
                    onClick={() => setIsActive(!isActive)}
                    className="md:hidden flex flex-col gap-1 z-50 justify-end "
                >
                    <span className={`w-4 h-0.5 rounded-lg bg-gray1 transition-all ${isActive ? 'rotate-45 translate-y-1.5 w-6' : ''}`}></span>
                    <span className={`w-6 h-0.5 rounded-lg bg-gray1 transition-all  ${isActive ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`w-4 h-0.5 rounded-lg bg-gray1 transition-all  ${isActive ? '-rotate-45 -translate-y-1.5 opacity-100 w-6' : ''}`}></span>
                </button>

                {/* Mobile Menu */}
                <motion.div
                    variants={menuSlide}
                    initial="initial"
                    animate={isActive ? "enter" : "exit"}
                    className="fixed top-0 border-l border-separator right-0 w-full h-screen backdrop-blur-lg bg-background z-40 pt-24 px-8"
                >
                    <div className="flex flex-col gap-8">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={index}
                                custom={index}
                                variants={slide}
                                animate={isActive ? "enter" : "exit"}
                                initial="initial">
                                <Link
                                    href={link.path}
                                    className="text-2xl font-bold hover:bg-[linear-gradient(108deg,#0894FF_0%,#C959DD_34%,#FF2E54_68%,#FF9004_100%)] hover:bg-clip-text hover:text-transparent "
                                    onClick={() => setIsActive(false)}
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </header>
    )
}