import React from 'react';
import Image from 'next/image';
import { FaCheckDouble, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { useBoomerMode } from "./BoomerModeProvider"

function AboutMe() {
    const { boomerMode, advancedMode, toggleAdvancedMode } = useBoomerMode();

    return (
        <>
            <article className='xxs:px-4 bg-stone-950 py-12'>
                <div className='flex flex-col md:flex-row md:justify-evenly justify-center items-center text-mute-200'>
                    <div className='flex flex-col gap-2'>
                        <Image className='w-52 h-auto self-center' src="/nts-pro-profile.png" alt="" width={208} height={0} />
                        <h3 className='text-3xl text-center font-bold font-mono tracking-wider'>MEET NOAH</h3>
                        <div className='my-2' style={{ border: 'solid', borderColor: '#ff5a1f', borderRight: 'none', borderLeft: 'none', borderWidth: '1px' }}></div>
                        <ul className='flex flex-col w-full items-center justify-center gap-2'>
                            <li className='flex items-center gap-2 text-wrap text-md font-medium'>
                                <FaCheckDouble style={{ color: '#ff5a1f', minWidth: '24px' }} />
                                <span>10 years of experience in logistics</span>
                            </li>
                            <li className='flex items-center gap-2 text-wrap text-md font-medium'>
                                <FaCheckDouble style={{ color: '#ff5a1f', minWidth: '24px' }} />
                                <span>Knowledgeable in all freight types</span>
                            </li>
                        </ul>
                        <h3 className='text-lg font-bold font-mono tracking-wider text-center'>INCLUDING:</h3>
                        <ul className='flex flex-col w-full items-center justify-center gap-2'>
                            <li className='flex items-center gap-2 text-wrap text-md font-medium'>
                                <FaCheckDouble style={{ color: '#ff5a1f', minWidth: '24px' }} />
                                <span>Agriculture/construction transport</span>
                            </li>
                            <li className='flex items-center gap-2 text-wrap text-md font-medium'>
                                <FaCheckDouble style={{ color: '#ff5a1f', minWidth: '24px' }} />
                                <span>Less than truck load/Full truck load</span>
                            </li>
                            <li className='flex items-center gap-2 text-wrap text-md font-medium'>
                                <FaCheckDouble style={{ color: '#ff5a1f', minWidth: '24px' }} />
                                <span>Auto/heavy Duty Truck transport</span>
                            </li>
                            <li className='flex items-center gap-2 text-wrap text-md font-medium'>
                                <FaCheckDouble style={{ color: '#ff5a1f', minWidth: '24px' }} />
                                <span>RV/Motorhome/Bus transport</span>
                            </li>
                            <li className='flex items-center gap-2 text-wrap text-md font-medium'>
                                <FaCheckDouble style={{ color: '#ff5a1f', minWidth: '24px' }} />
                                <span>Container/Drayage shipping</span>
                            </li>
                        </ul>
                    </div>
                    <div className='text-center text-xl p-3 pt-8 md:text-2xl flex flex-row md:w-1/2 h-full'>
                        <div className='flex justify-start items-start md:mr-2'>
                            <FaQuoteLeft style={{ color: '#ff5a1f' }} />
                        </div>
                        <p className="font-thin">
                            With 10 years of proven experience, Shipping Connect is your trusted partner in streamlining logistics across all freight types. From agricultural machinery to full truckloads, and even specialized transport like RVs and containers, we deliver efficient solutions tailored to your needs. Our priority is ensuring our shippers and clients receive exceptional service, transparency, and reliable support every step of the way.
                        </p>
                        <div className='flex justify-end items-end'>
                            <FaQuoteRight style={{ color: '#ff5a1f' }} />
                        </div>
                    </div>
                </div>
                {/* <div className='flex justify-center items-center mt-8 z-50'>       
                   <ScrollCta />
                </div> */}
            </article>
        </>
    );
}

export default AboutMe;