'use client'

import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '@/utils/animations'
import SizedBox from '@/utils/sizedbox'
import { Pointer } from 'lucide-react'
import CodeBlock from './profilecodes'
import { FaGithub } from "react-icons/fa6";
import { RiLogoutCircleRFill } from 'react-icons/ri'
import { GiBookshelf } from 'react-icons/gi'

const xcodeWindow = () => {
  return (<div
    className="@container rounded-3xl bg-black/5 p-2 outline outline-black/10 dark:outline-white/15 backdrop-blur-md w-full transition-transform duration-300 ease-out max-w-[1280px]"
    style={{
      transform: "none",
      transformOrigin: "none",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
    }}
  >
    {/* Window controls */}

    <div className="flex gap-2 p-2">
      <span className="size-3 rounded-full bg-red-500/80"></span>
      <span className="size-3 rounded-full bg-yellow-500/80"></span>
      <span className="size-3 rounded-full bg-green-500/80"></span>
    </div>

    {/* Content area */}
    <div className="flex flex-col gap-4 @lg:flex-row rounded-2xl outline outline-black/5  dark:outline-white/10 overflow-hidden ">
      {CodeBlock()}
      {/* Phone frame container */}
      <div className="flex-1 flex items-center justify-center p-4 @lg:p-6  border-l border-l-white/10">
        <div className="relative h-[400px] w-[200px] @sm:h-[500px] @sm:w-[250px] rounded-[40px] border-[12px] border-[#161618] bg-[#161618] overflow-hidden shadow-xl group">
          {/* Phone notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-[#161618] rounded-b-lg z-30"></div>

          {/* Hand Gesture & Message */}
          <div className="absolute bottom-15 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-40">
            <div className="mt-2 text-2xl text-white animate-bounce "><Pointer /></div>
            <div className="text-white text-sm bg-white/6 px-3 py-1 rounded-lg w-[200px] shadow-md">
              Hover here to expand profile picture
            </div>
          </div>

          {/* Screen content - NO PADDING */}
          <div className="absolute inset-0 overflow-hidden bg-black/50">
            {/* Image container */}
            <div className="relative h-full w-full">
              {/* Circular initial state */}
              <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] z-20">
                <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-[#161618] 
        group-hover:h-full group-hover:w-full 
        group-hover:rounded-none group-hover:border-0
        transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]">
                  <img
                    src="https://avatars.githubusercontent.com/u/77022177?s=400&u=284f51781578ccdea9a1cb2f8703ba2d3b8b5b2b&v=4"
                    alt="Profile"
                    className="absolute inset-0 h-full w-full object-cover
          transform transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]
          group-hover:scale-100"
                  />
                </div>
              </div>
            </div>

            {/* App bar */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/70 backdrop-blur-sm flex justify-around items-center z-30">
              <div className="w-12 h-2 rounded-full bg-white/20"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  );
}

export default function Projects() {
  return (
    <section className="bg-black" id="projects" style={{ background: 'radial-gradient(49.63% 57.02% at 58.99% -7.2%, rgba(255, 164, 28, 0.1) 39.4%, rgba(0, 0, 0, 0) 100%)', backgroundColor: 'black' }}>
      <div className="border-x py-2 border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-white)]/20 dark:[--pattern-fg:var(--color-white)]/10 mx-auto mt-12 lg:mt-16"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="container mx-auto px-6"
        >

          <motion.div variants={fadeIn('up', 'tween', 0.2, 1)} className="mb-16 mt-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">My Projects</h2>
            <div className="mx-auto w-full max-w-2xl md:max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-100">
              {[
                {
                  title: 'The Xorg Kernel',
                  description: 'A bare-metal symphony, where bootloaders awaken and Rust shapes the bones of a new machine.',
                  color: 'bg-gradient-to-br from-black via-gray-900 to-zinc-800',
                },
                {
                  title: 'Mobile Compiler Forge',
                  description: 'Transforming handheld devices into forges of logic—where code compiles in the cradle of mobility.',
                  color: 'bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-800',
                },
                {
                  title: 'Code Shrine',
                  description: 'A portable editor that doesn’t just open files—it opens portals. Syntax becomes soul, anywhere.',
                  color: 'bg-gradient-to-br from-slate-900 to-gray-800',
                },
                {
                  title: 'Binary Bloom',
                  description: 'Tiny tools with mighty reach—where minimal footprints leave maximum legacy.',
                  color: 'bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900',
                }
              ].map((project, index) => (
                <div key={index} className={` p-6 shadow-md bg-black border border-white/10`}>
                  <h3 className="text-lg font-semibold mb-2 text-white">{project.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-300">{project.description}</p>

                 <div className='flex gap-4'>
                   <span title="View Code on GitHub" className="cursor-pointer ">
                    <div className="mt-4 hover:scale-125 transition-transform duration-200"><FaGithub /></div>
                  </span>
                   <span title="View Demo" className="cursor-pointer ">
                    <div className="mt-4 hover:scale-125 transition-transform duration-200 "><RiLogoutCircleRFill /></div>
                  </span>
                  <span title="Resources" className="cursor-pointer ">
                    <div className="mt-4 hover:scale-125 transition-transform duration-200 "><GiBookshelf /></div>
                  </span>
                 </div>
                </div>
              ))}
            </div>

          </motion.div>

          <div className='flex justify-center'>{xcodeWindow()}</div>
        </motion.div>
      </div>
      <SizedBox height={100}></SizedBox>
    </section>
  )
}