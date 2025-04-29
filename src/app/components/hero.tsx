'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '@/utils/animations'
import MobileToolsPage from './mobile-tools-content';

export default function Hero() {
  const [isActive, setIsActive] = useState(false)

  return (
    <section className="relative flex flex-col items-center bg-cover " style={{
      backgroundImage: 'url(https://cdn.prod.website-files.com/60c5f64abe141da7260da0b9/64f8196fae1357e4cd15c803_gooddesign-glow.png)'
    }}>
      <div className="absolute inset-0 z-0"></div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="container mx-auto px-6 z-10 py-15 md:py-20"
      >
        <div className="flex flex-col items-center">
          <motion.div variants={fadeIn('up', 'tween', 0.2, 1)} className="w-full max-w-4xl">
            <div className="px-4">
              <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight">
                <span className="block">Hello, I'm</span>
                <span className="bg-[linear-gradient(108deg,#0894FF_0%,#C959DD_34%,#FF2E54_68%,#FF9004_100%)] bg-clip-text text-transparent">
                  Frost Edson
                </span>
              </h1>

              <h2 className="text-[12px] sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray1 lg:text-[var(--foreground)] font-medium mb-8 text-center md:text-start">
                <span className="inline-block mr-2">Systems Architect</span> |
                <span className="inline-block mx-2">Kernel Engineer</span> |
                <span className="inline-block ml-2">Full-Stack Developer</span>
              </h2>

              <div className="text-[14px] md:text-2xl leading-relaxed space-y-4 text-justify">
                <p>
                  I specialize in <span className="font-bold">low-level systems programming</span>,
                  crafting performant kernel modules, drivers, and system utilities that power modern computing.
                </p>
                <p>
                  With expertise spanning from <span className="font-bold">bare-metal development </span>
                  to <span className="font-bold">responsive web applications</span>, I bridge the gap between
                  hardware and user experience.
                </p>
                <p>
                  I architect solutions with <span className="font-bold">Rust, C++, and Go</span> for
                  mission-critical systems, while building elegant interfaces with <span className="font-bold">SwiftUi, Flutter, Kotlin JetPack Compose, React,
                    Next.js, and Tailwind CSS</span>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className='w-full p-2 border-y border-y-separator border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/15 dark:[--pattern-fg:var(--color-white)]/10 mx-auto mt-12 lg:mt-16'>
        <div className='bg-background border border-separator pt-6'>

          <div className="mx-auto w-[688px] max-[1068px]:w-[688px] max-[734px]:w-[332px] text-center">
            <div className='font-bold text-xl md:text-4xl py-2'>Software Development Tools for Mobile Devices </div>
            <div className="relative w-full aspect-[3/2] overflow-hidden">
              <div className="flex items-center py-4 justify-center"><div className='flex items-center bg-systemBlue text-white py-2 px-4 rounded-[100px] hover:underline' onClick={() => setIsActive(!isActive)}>Learn more {/*<ChevronRight />*/}</div></div>
              <img
                src="/images/iphone-dev1.png"
                className="absolute w-full h-[200%] object-cover object-top"
                alt="iPhone"
              />
            </div>

            <MobileToolsPage showPage={isActive} onBackFunction={() => setIsActive(!isActive)} />

          </div>
          {/* <div className='absolute right-1/2 max-lg:bottom-8 max-md:translate-x-1/2 md:right-16 lg:top-1/2 lg:-translate-y-1/2 2xl:right-1/2 2xl:translate-x-[calc(50%-3rem)]'>
            <div className='@container rounded-3xl bg-black/5 p-2 outline outline-white/15 backdrop-blur-md dark:bg-white/10 w-[584px]' style={{ transform: 'none', transformOrigin: '50% 50% 0px' }}>
              <div className='relative flex w-full flex-col rounded-2xl bg-backgroundLayer1 outline outline-separator dark:-outline-offset-1 dark:outline-white/10  p-7 gap-6 items-center @xs:flex-row @xs:gap-8' style={{ transform: 'none', transformOrigin: '50% 50% 0px' }}>
                <img className='size-48 shadow-xl transition-[border-radius] duration-350 dark:outline-1 dark:-outline-offset-1 dark:outline-white/10 rounded-md' style={{ transform: 'none', transformOrigin: '50% 50% 0px' }} src={'/images/iphone-dev.png'}></img>
              </div>
            </div>
          </div>*/}
        </div>
      </div>
    </section>
  )
}