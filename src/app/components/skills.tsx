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
                <div className="space-y-2 mt-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
                    <FlameProgressBar title='Rust' progress={70} />
                    <FlameProgressBar title='JavasScript' progress={90} />
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
            <div className="container mx-auto px-6">
                <div className="flex flex-row gap-4 justify-center">
                    <div className="flex flex-col gap-3 w-[40hh]">
                        <ul className="flex flex-col gap-2 border-r dark:border-[color-mix(in_oklab,_var(--color-gray-950),white_20%)] border-[color-mix(in_oklab,_var(--color-gray-950),white_90%)] transition-colors duration-200">
                            {skillsData.map((item, index) => {
                                return (<li key={item.id} className="-mr-px flex flex-col items-end gap-2">
                                    <a className={`inline-block border-r border-transparent text-base/8 text-gray-600 hover:border-gray-950/25 hover:text-gray-950 sm:text-sm/6 dark:hover:border-white/25 dark:hover:text-white aria-[current]:border-gray-950 aria-[current]:font-semibold aria-[current]:text-gray-950 dark:aria-[current]:border-white dark:text-white pr-5 sm:pr-4 ${selectedSkillIndex === index ? `border-gray-950 font-semibold text-gray-950 dark:border-white dark:text-white` : ``}`}
                                        onClick={() => { setSelectedSkillIndex(index) }}
                                    >
                                        {item.heading}
                                    </a>
                                </li>);
                            })}
                        </ul>
                    </div>
                    <div className='w-full'>
                        <div className='font-mono tracking-widest uppercase'>{skillsData[selectedSkillIndex].heading}</div>
                        {skillsData[selectedSkillIndex].content}
                    </div>
                </div>
            </div>
        </section>
    );
}