'use client'

import { useState } from "react";
import FlameProgressBar from "./flame-progress-bar";

const skillsData = [
    {
        id: 'Programming Languages',
        heading: 'Programming Languages',
        content: (
            <div className='mt-4 gap-4'>
                <div className="font-bold text-5xl">Language Skill Level</div>
                <div className="mt-4">Ranked against github Projects and LeetCode solutions</div>
                <div className="space-y-2 mt-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-4 lg:pl-4 lg:max-w-[810px]">
                    <FlameProgressBar title='Rust' progress={70} />
                    <FlameProgressBar title='JavasScript' progress={90} />
                    <FlameProgressBar title='Swift' progress={80} />
                    <FlameProgressBar title='C/C++' progress={89} />
                    <FlameProgressBar title='Dart' progress={95} />
                    <FlameProgressBar title='Php' progress={75} />
                    <FlameProgressBar title='X86_ASM' progress={75} />
                    <FlameProgressBar title='Java' progress={78} />
                    <FlameProgressBar title='Python' progress={96} />
                </div>
            </div>
        ),
    },
    {
        id: 'Clang',
        heading: 'C/C++',
    },
    {
        id: 'Rust',
        heading: 'Rust'
    },
    {
        id: "Swift",
        heading: 'Swift'
    },
    {
        id: "Asm",
        heading: 'x86 asm'
    }
];

export default function Skills() {
    const [selectedSkillIndex, setSelectedSkillIndex] = useState(0);
    return (
        <section id='skills' className="p-6 h-screen">
          <h3 className="font-mono font-bold text-5xl tracking-widest uppercase py-4">Skills</h3>
          <div className="flex justify-center w-full">
            <div className="flex flex-col md:flex-row gap-8 max-w-4xl w-full px-4">
              {/* Skills List - Hidden on mobile, visible on desktop */}
              <div className="hidden md:block flex-shrink-0 w-48">
                <ul className="flex flex-col gap-2 border-r dark:border-[color-mix(in_oklab,_var(--color-gray-950),white_20%)] border-[color-mix(in_oklab,_var(--color-gray-950),white_90%)] transition-colors duration-200">
                  {skillsData.map((item, index) => (
                    <li key={item.id} className="-mr-px flex flex-col items-end gap-2">
                      <a
                        className={`inline-block border-r border-transparent text-base/8 text-gray-600 hover:border-gray-950/25 hover:text-gray-950 sm:text-sm/6 dark:hover:border-white/25 dark:hover:text-white aria-[current]:border-gray-950 aria-[current]:font-semibold aria-[current]:text-gray-950 dark:aria-[current]:border-white dark:text-white pr-5 sm:pr-4 ${
                          selectedSkillIndex === index
                            ? "border-gray-950 font-semibold text-gray-950 dark:border-white dark:text-white"
                            : ""
                        }`}
                        onClick={() => setSelectedSkillIndex(index)}
                      >
                        {item.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
      
              {/* Content - Always visible (full width on mobile, flex-1 on desktop) */}
              <div className="w-full md:flex-1 md:pl-4">
                <div className="font-mono tracking-widest uppercase">
                  {skillsData[selectedSkillIndex].heading}
                </div>
                <div className="text-left">
                  {skillsData[selectedSkillIndex].content}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
}