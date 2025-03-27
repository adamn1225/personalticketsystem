import React from 'react';
import Image from 'next/image';
import { FaCheckDouble, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { useBoomerMode } from "./BoomerModeProvider"

function AboutMe() {
    const { boomerMode, advancedMode, simpleMode, toggleAdvancedMode } = useBoomerMode();

    return (
        <>
            {boomerMode ? (
                <article className='xxs:px-4  py-12'>
                    <div className='flex flex-col md:flex-row md:justify-evenly justify-center items-center text-mute-200'>
                        <div className='flex flex-col gap-2'>
                            <Image className='w-52 h-auto self-center' src="/nts-pro-profile.png" alt="" width={208} height={0} />
                            <h3 className='text-3xl text-center font-bold font-mono tracking-wider'>MEET NOAH</h3>
                            <div className='my-2' style={{ border: 'solid', borderColor: '#ff5a1f', borderRight: 'none', borderLeft: 'none', borderWidth: '1px' }}></div>
                            <ul className='flex flex-col w-full items-center justify-center gap-2'>
                                <li className='flex items-center gap-2 text-wrap text-md font-medium'>
                                    <FaCheckDouble style={{ color: '#ff5a1f', minWidth: '24px' }} />
                                    <span className='text-zinc-900'>Really good with computers</span>
                                </li>
                                <li className='flex items-center gap-2 text-wrap text-md font-medium'>
                                    <FaCheckDouble style={{ color: '#ff5a1f', minWidth: '24px' }} />
                                    <span className='text-zinc-900'>Knowledgeable in taking screenshots, attaching a picture to an email, and more!</span>
                                </li>
                            </ul>
                            <h3 className='text-lg font-bold font-mono tracking-wider text-center'>INCLUDING:</h3>
                            <ul className='flex flex-col w-full items-center justify-center gap-2'>
                                <li className='flex items-center gap-2 text-wrap text-md font-medium'>
                                    <FaCheckDouble style={{ color: '#ff5a1f', minWidth: '24px' }} />
                                    <span className='text-zinc-900'>Plugging it out and back in</span>
                                </li>
                                <li className='flex items-center gap-2 text-wrap text-md font-medium'>
                                    <FaCheckDouble style={{ color: '#ff5a1f', minWidth: '24px' }} />
                                    <span className='text-zinc-900'>Are you sure it was plugged in?</span>
                                </li>
                                <li className='flex items-center gap-2 text-wrap text-md font-medium'>
                                    <FaCheckDouble style={{ color: '#ff5a1f', minWidth: '24px' }} />
                                    <span>Slow computer? Let&apos;s get rid of all those browser tabs</span>
                                </li>
                                <li className='flex items-center gap-2 text-wrap text-md font-medium'>
                                    <FaCheckDouble style={{ color: '#ff5a1f', minWidth: '24px' }} />
                                    <span className='text-zinc-900'>Where&apos;s the sound coming from? I&apos;ll find it.</span>
                                </li>
                            </ul>
                        </div>
                        <div className='text-center text-xl p-3 pt-8 md:text-2xl flex flex-row md:w-1/2 h-full'>
                            <div className='flex justify-start items-start md:mr-2'>
                                <FaQuoteLeft style={{ color: '#ff5a1f' }} />
                            </div>
                            <p className="font-thin">
                                I am a computer expert with over 20 years of experience. I have worked with all types of computers and have fixed many problems. I am confident that I can fix yours!
                            </p>
                            <div className='flex justify-end items-end'>
                                <FaQuoteRight style={{ color: '#ff5a1f' }} />
                            </div>
                        </div>
                    </div>
                </article>
            ) : simpleMode ? (
                <article className='xxs:px-4 bg-black py-12 text-white'>
                    <div className='flex flex-col md:flex-row md:justify-evenly justify-center items-center text-mute-200'>
                        <div className='flex flex-col gap-2'>
                            <Image className='w-52 h-auto self-center' src="/simpleSmile.jpeg" alt="Noah profile" width={208} height={0} />
                            <h3 className='text-3xl text-center font-bold font-mono tracking-wider'>MEET NOAH</h3>
                            <div className='my-2 border-t border-b border-blue-500'></div>
                            <ul className='flex flex-col w-full items-center justify-center gap-2'>
                                <li className='flex items-center gap-2 text-md font-medium'>
                                    <FaCheckDouble className='text-blue-500 min-w-[24px]' />
                                    <span>10+ years solving tech issues, big and small</span>
                                </li>
                                <li className='flex items-center gap-2 text-md font-medium'>
                                    <FaCheckDouble className='text-blue-500 min-w-[24px]' />
                                    <span>Clear communicator, responsive, and reliable</span>
                                </li>
                                <li className='flex items-center gap-2 text-md font-medium'>
                                    <FaCheckDouble className='text-blue-500 min-w-[24px]' />
                                    <span>Happy to help you — no question too basic</span>
                                </li>
                            </ul>
                            <h3 className='text-lg font-bold font-mono tracking-wider text-center'>WHAT I CAN DO:</h3>
                            <ul className='flex flex-col w-full items-center justify-center gap-2'>
                                <li className='flex items-center gap-2 text-md font-medium'>
                                    <FaCheckDouble className='text-blue-500 min-w-[24px]' />
                                    <span>Website bugs, tech glitches, or config help</span>
                                </li>
                                <li className='flex items-center gap-2 text-md font-medium'>
                                    <FaCheckDouble className='text-blue-500 min-w-[24px]' />
                                    <span>Guided instructions if you're unsure</span>
                                </li>
                                <li className='flex items-center gap-2 text-md font-medium'>
                                    <FaCheckDouble className='text-blue-500 min-w-[24px]' />
                                    <span>Quick turnaround and detailed feedback</span>
                                </li>
                            </ul>
                        </div>

                        <div className='text-center text-xl p-3 pt-8 md:text-2xl flex flex-row md:w-1/2 h-full'>
                            <div className='flex justify-start items-start md:mr-2'>
                                <FaQuoteLeft className='text-blue-500' />
                            </div>
                            <p className="font-thin">
                                You don’t have to be a tech expert to report a bug. Just let me know what went wrong — I’ll take it from there.
                            </p>
                            <div className='flex justify-end items-end'>
                                <FaQuoteRight className='text-blue-500' />
                            </div>
                        </div>
                    </div>
                </article>
            ) : (
                <article className='xxs:px-4 bg-black py-12 text-white'>
                    <div className='flex flex-col md:flex-row md:justify-evenly justify-center items-center text-mute-200'>
                        <div className='flex flex-col gap-2'>
                            <Image className='w-52 h-auto self-center' src="/advancedSmile.jpeg" alt="Noah profile" width={208} height={0} />
                            <h3 className='text-3xl text-center font-bold font-mono tracking-wider'>MEET NOAH</h3>
                            <div className='my-2 border-t border-b border-blue-500'></div>
                            <ul className='flex flex-col w-full items-center justify-center gap-2'>
                                <li className='flex items-center gap-2 text-md font-medium'>
                                    <FaCheckDouble className='text-blue-500 min-w-[24px]' />
                                    <span>Full-stack developer with deep infra chops</span>
                                </li>
                                <li className='flex items-center gap-2 text-md font-medium'>
                                    <FaCheckDouble className='text-blue-500 min-w-[24px]' />
                                    <span>Built scalable apps, automated pipelines, and real-time systems</span>
                                </li>
                                <li className='flex items-center gap-2 text-md font-medium'>
                                    <FaCheckDouble className='text-blue-500 min-w-[24px]' />
                                    <span>Happy to debug APIs, race conditions, or JS quirks</span>
                                </li>
                            </ul>
                            <h3 className='text-lg font-bold font-mono tracking-wider text-center'>TECH I SPEAK:</h3>
                            <ul className='flex flex-col w-full items-center justify-center gap-2'>
                                <li className='flex items-center gap-2 text-md font-medium'>
                                    <FaCheckDouble className='text-blue-500 min-w-[24px]' />
                                    <span>TypeScript, React, Next.js, Tailwind, Node</span>
                                </li>
                                <li className='flex items-center gap-2 text-md font-medium'>
                                    <FaCheckDouble className='text-blue-500 min-w-[24px]' />
                                    <span>Golang, PostgreSQL, Redis, Supabase, R2</span>
                                </li>
                                <li className='flex items-center gap-2 text-md font-medium'>
                                    <FaCheckDouble className='text-blue-500 min-w-[24px]' />
                                    <span>CI/CD, observability, async flows, and more</span>
                                </li>
                            </ul>
                        </div>

                        <div className='text-center text-xl p-3 pt-8 md:text-2xl flex flex-row md:w-1/2 h-full'>
                            <div className='flex justify-start items-start md:mr-2'>
                                <FaQuoteLeft className='text-blue-500' />
                            </div>
                            <p className="font-thin">
                                Need structured thinking, pragmatic solutions, and fast implementation? Let’s build or fix it — clean and correct.
                            </p>
                            <div className='flex justify-end items-end'>
                                <FaQuoteRight className='text-blue-500' />
                            </div>
                        </div>
                    </div>
                </article>

            )}
        </>
    );
}

export default AboutMe;