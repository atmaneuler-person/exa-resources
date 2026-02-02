"use client";
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 origin-left z-[110]"
            style={{ scaleX }}
        />
    );
};
