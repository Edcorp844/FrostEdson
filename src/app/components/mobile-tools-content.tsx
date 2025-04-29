'use client'

import { menuSlide, slide } from '@/utils/animations'
import SizedBox from '@/utils/sizedbox'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { ReactElement, useEffect, useState } from 'react'
const sections = [
    {
        id: 'technology',
        title: 'Crafting Tools for Mobile',
        content: (
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div className='space-y-6 '>
                    <h2 className='text-4xl font-bold py-4'>Technology</h2>
                    <p className=' leading-8 text-label'>
                        In a world moving ever more swiftly toward mobile autonomy, I've poured my craft into
                        developing tools that empower developers to build, debug, and deploy—right from the palm
                        of their hand. Tools like <span> <a href='https://ish.app' className="text-systemBlue">iSH</a></span>  open a door to Alpine Linux on iOS, while
                        <span> <a href='https://termux.dev' className="text-systemBlue">Termux</a></span> offers a rich Linux environment on Android. But my ambition goes
                        further: with <span> <a href='https://java-n-ide-android-builder-java-se-compiler.en.softonic.com/android' className="text-systemBlue">Java N-IDE</a></span>, I'm laying foundations for native IDE experiences,
                        enabling serious development work from devices once considered "limited."
                    </p>
                    <p className='text-label leading-8'>
                        This isn't about novelty—it's about freedom. About giving creators their tools
                        regardless of the platform. About making mobile development not just possible, but
                        powerful. From cross-compilation to secure scripting, I architect workflows that work in
                        motion.
                    </p>
                </div>
                <div className='w-full flex justify-center lg:items-center'>
                    <img
                        src='/images/iphone-dev.png'
                        className='rounded-2xl max-w-md w-full lg:w-[300px] lg:h-[300px] xl:w-full xl:h-full'
                        alt='Terminal Tools'
                    />
                </div>
            </div>
        ),
    },
    {
        id: 'design',
        title: "UI/UX Designer's eyes",
        content: (
            <div className='flex flex-col-reverse lg:flex-row items-center gap-10'>
                <div className='w-full lg:w-1/2'>
                    <img
                        src='https://cdn.dribbble.com/userupload/14796383/file/original-631a543cccaa484a2429f0eab1b0c4cd.png'
                        className='rounded-xl shadow-md'
                        alt='UX Flow'
                    />
                </div>
                <div className='w-full lg:w-1/2 space-y-5'>
                    <h2 className='text-4xl font-bold text-slate-900 dark:text-white'>Design</h2>
                    <p className='text-gray-700 dark:text-gray-300 leading-8'>
                        When you craft developer tools, design isn't decoration—it’s discipline. I design
                        interfaces that get out of the way and let the engineer take command. Terminal layouts
                        that feel natural on a phone. Input systems that mimic desktop muscle memory. Layouts
                        that flow like water, yet hold like stone.
                    </p>
                    <p className='text-gray-700 dark:text-gray-300 leading-8'>
                        Each UI I build is driven by empathy for builders. Whether you're tapping code on a
                        subway ride or compiling during a coffee break, the design anticipates your intent and
                        fades into the rhythm of your thought.
                    </p>
                </div>
            </div>
        ),
    },
    {
        id: 'innovation',
        title: 'Innovation at the Edge',
        content: (
            <div className='space-y-5'>
                <h2 className='text-4xl font-bold text-slate-900 dark:text-white'>Innovation</h2>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>

                    <div>
                        <p className="text-gray-700 dark:text-gray-300 leading-8">
                            Innovation is the quiet art of listening to machines and hearing dreams. I don't chase trends—
                            I seek transformation. I build environments where the boundaries between thought and execution
                            dissolve. A mobile device, once seen only as a vessel for consumption, becomes—through my hands—
                            a crucible for creation. It compiles, it interprets, it responds. It becomes a sanctuary for
                            builders.
                        </p>
                        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-8">
                            I create where others wait. I empower where others restrict. My work turns smartphones into
                            self-sufficient workshops, where you don’t just read code—you write it, test it, and ship it.
                            Not because it’s easy, but because it’s necessary. I believe the future of software development
                            is untethered, portable, personal—and I’m crafting the tools to make that future now.
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-700 dark:text-gray-300 leading-8">
                            I am forging tools that whisper possibility into every palm. Lightweight terminals, code
                            explorers, smart compilers—they are not just utilities; they are invitations. Invitations to
                            explore, to invent, to shape reality with the brushstrokes of logic and syntax. I reimagine
                            what it means to develop—not from a desk, but from anywhere inspiration calls.
                        </p>
                        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-8">
                            This is more than code. It’s a movement toward freedom. Toward sovereignty over your tools and
                            your time. Toward a world where software is shaped not by constraint, but by courage. In every
                            build, I leave behind more than functionality—I leave behind a path for others to follow, paved
                            in imagination and lit by innovation.
                        </p>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: 'future',
        title: 'The Road Ahead',
        content: (
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 items-center'>
                <div className='space-y-6'>
                    <h2 className='text-4xl font-bold text-slate-900 dark:text-white'>Future</h2>
                    <p className='text-gray-700 dark:text-gray-300 leading-8'>
                        The frontier is ever shifting. I see a future where devices are no longer shackled by
                        form, where a wristwatch might compile code, and a foldable phone can host a Kubernetes
                        cluster. In that world, my tools evolve—modular, secure, always accessible.
                    </p>
                    <p className='text-gray-700 dark:text-gray-300 leading-8'>
                        I am building bridges from desktop legacy to mobile-first brilliance. Whether through
                        native packages, virtualized dev environments, or mobile-first CI pipelines—I stand at
                        the confluence of now and next.
                    </p>
                </div>
                <div className='w-full flex justify-center'>
                    <img
                        src='https://cdn.dribbble.com/userupload/19379895/file/original-1813a1a83f429c7c72e03dcc6abc5170.png'
                        className='max-w-md w-full shadow-lg rounded-3xl bg-black/5 p-2 outline outline-white/15 backdrop-blur-md dark:bg-white/10'
                        alt='Future Development'
                    />
                </div>
            </div>
        ),
    },
]


function AppleStyleTOC() {
    const [active, setActive] = useState('technology')

    useEffect(() => {
        const handleScroll = () => {
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i].id)
                if (section && window.scrollY + 150 >= section.offsetTop) {
                    setActive(sections[i].id)
                    break
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar TOC */}
            <aside className="hidden md:flex flex-col w-64 px-6 py-10 sticky top-0 h-screen border-r border-r-separator  overflow-y-auto">
                {sections.map((section) => (
                    <a
                        key={section.id}
                        href={`#${section.id}`}
                        className={`transition-colors duration-200 flex justify-end ${active === section.id
                            ? ''
                            : 'hover:text-black dark:hover:text-white text-gray2'
                            }`}
                    > {section.title}
                    </a>
                ))}
            </aside>

            {/* Scrollable Main Content */}
            <main className="flex-1 overflow-y-scroll px-10 py-16 space-y-32 text-justify scroll-smooth">
                {sections.map((section) => (
                    <section key={section.id} id={section.id} className="scroll-mt-24">
                        {section.content}
                    </section>
                ))}
                <SizedBox height={100} />
            </main>
        </div>
    )
}

interface MobileToolsPageProps {
    showPage: boolean;
    onBackFunction: () => void;
}

export default function MobileToolsPage({ showPage = false, onBackFunction = (() => { }) }): ReactElement<MobileToolsPageProps> {
    return <motion.div
        variants={menuSlide}
        initial="initial"
        animate={showPage ? "enter" : "exit"}
        className="fixed top-0 right-0 w-full h-screen  bg-background z-40 pt-16 px-4"
    >
        <div className='flex'>
            <div className='text-systemBlue flex items-center' onClick={onBackFunction}><ChevronLeft /> Back</div>
        </div>
        <motion.div
            variants={slide}
            animate={showPage ? "enter" : "exit"}
            initial="initial">
            <AppleStyleTOC />
        </motion.div>


    </motion.div>
}