'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from "framer-motion";
import Image from 'next/image';



function AboutSection() {



  return (
    <div className='h-[100%] lg:px-12 px-4 bg-primary-foreground lg:mx-6 mx-2'>
        <div className='relative max-w-48 mx-auto'>
            <h1 className='text-5xl md:text-6xl md:leading-16 tracking-tight w-full flex justify-center font-light text-white'>
                <motion.span
                initial={{opacity:0}}
                viewport={{amount:0.2}}
                whileInView={{opacity:1}}
                 className='font-medium mt-5 text-primary italic instrument'>About us</motion.span>
            </h1>
                <motion.div
                className='origin-left h-[4px] bg-primary w-full' 
                initial={{ scaleX: 0 }}
                viewport={{amount:0.2}}
                whileInView={{ scaleX: 1 }}
                ></motion.div>

        </div>
        {/* Content Section */}
        <div       
        className="w-full max-w-6xl mx-auto mt-12 rounded-3xl border-r-8 border-t-2 border-b-8 border-l-2 border-primary overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl"
    >
      <div className="grid md:grid-cols-2 gap-0 mt-2">
        {/* Left Content Section */}
        <div className="p-12 flex flex-col justify-center bg-white/40 backdrop-blur-sm">
          <p className="text-sm font-medium text-gray-600 mb-3 tracking-wide">Archer VTOL</p>
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Autonomous VTOL surveillance drone
          </h2>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            Archer is a long-range, multi-mission VTOL drone built for surveillance missions at critical sites such as mines, oil pipelines
          </p>
          <div className="flex gap-4 flex-wrap">
            <button className="w-full md:flex-1 md:min-w-0 px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/80 hover:border-gray-400 transition-colors border-primary-foreground border-l-2 border-t-2 border-r-8 border-b-8">
              Order Now
            </button>
            <button className="w-full md:flex-1 md:min-w-0 px-8 py-3 border-2 text-gray-700 rounded-lg font-medium hover:border-gray-400 hover:bg-primary/60 transition-colors border-primary border-l-2 border-t-2 border-r-8 border-b-8">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative bg-gradient-to-br from-slate-300 via-slate-200 to-blue-100 flex items-center justify-center">
            <Image src="/images/icn-logo.jpg" width={100} height={100} alt="Building image " className='absolute inset-0 w-[100%] h-[100%] object-cover' />
        </div>
      </div>
    </div>
    </div>
  )
}

export default AboutSection