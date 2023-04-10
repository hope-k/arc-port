import React, { useEffect, useState, useRef } from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue
} from "framer-motion";

function useParallax(value, distance) {
  //? replaced -distance  with 0 to make the image move in the opposite direction and not shift the text
  const currentValue = useTransform(value, [0, 1], [0, distance])
  const springConfig = { damping: 65, stiffness: 370 };
  return useSpring(currentValue, springConfig);
}


const HeroCover = () => {
  const images = ['/heroImages/one.jpg', '/heroImages/two.jpg', '/heroImages/three.jpg', '/heroImages/four.jpg'];
  const words = [
    `The Art of Architecture: A Showcase of Creativity and Style`,
    'Architecture is not about space but about time.',
    'Great buildings that move the spirit have always been rare.',
    'A building is not just a place to be but a way to be.'
  ]

  const [text] = useTypewriter({
    words,
    loop: 0,
    cursor: true,
    typeSpeed: 40,
    deleteSpeed: 20,
    delaySpeed: 3300,

  })

  const staggerTextVariant = {
    hidden: {
      opacity: 0,
      y: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: .35,
        staggerChildren: .15,
        ease: 'easeInOut'
      },
    },
  }

  const [imageIndex, setImageIndex] = useState(0);
  const [nextImage, setNextImage] = useState(null);


  useEffect(() => {
    const img = new Image();
    img.src = images[(imageIndex + 1) % images.length];
    img.onload = () => {
      setNextImage(img.src);
    };
    const intervalId = setTimeout(() => {
      setImageIndex((imageIndex + 1) % images.length);
    }, 20000);

    return () => {
      clearTimeout(intervalId);
    };
  }, [imageIndex]);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, -40);
  const x = useParallax(scrollYProgress, 20);

  return (


    <div className='relative w-full mx-auto'>
      <div className='relative h-[70vh] w-full '>
        <div className='text-[#ccc] flex items-center relative z-40 h-full md:mx-16 mx-2'>
          <motion.h1 layout='position' className='gar-font md:text-6xl max-w-[32ch] text-4xl italic  font-bold '>
            &#8220;
            {text}
            <Cursor
              cursorColor='#aa5c3bee'
            />
            &#8221;
          </motion.h1>
        </div>

        {/* Gradient */}
        <motion.div
         
          className='md:bg-center'
          style={{
            backgroundImage: `url(${nextImage || images[imageIndex]})`,
            backgroundRepeat: 'repeat',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0,



          }}
          whileInView={{
            backgroundSize: ['100% auto', '150% auto'],
            opacity: 1,
          }}
          transition={{
            opacity: {
              duration: .5,
              ease: 'easeInOut',
            },
            backgroundSize: {
              delay: 1,
              duration: 20,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'mirror',
              repeatDelay: 0,
            },
          }}
        >
        </motion.div>
        <div className='absolute inset-0 bg-gradient-to-l from-transparent to-blue-400 brightness-[.2]'></div>
      </div>

      <div  className=' h-[30vh] w-full bg-[#cccccc32] sm:bg-[#ccc] mix-blend-exclusion relative'>
        {/*  left side h1 */}
        <motion.h1
          initial='hidden'
          whileInView='visible'
          variants={staggerTextVariant}
          className='absolute left-5 top-3 md:-top-3 md:left-16  text-white  z-10 mix-blend-exclusion font-sans'
        >
          <motion.span  variants={staggerTextVariant} className=' absolute md:inset-x-5 -inset-[6.8px] -top-[57px] md:-top-12 whitespace-nowrap font-semibold mon-font'>
            Frank Lloyd Wright
            <motion.div className='h-2  bg-[#aa5c3bee]' transition={{ duration: 4, ease: 'easeOut', }} whileInView={{ width: ['0rem', '2.75rem'] }}>
            </motion.div>
          </motion.span>
          <motion.span  variants={staggerTextVariant} className='absolute -top-12 text-6xl md:text-8xl font-light '>
            portfolio.
          </motion.span>
        </motion.h1>

        {/* right side h1*/}
        <motion.h1
          style={{ x }}
          className='absolute gar-font italic leading-3 md:leading-[1]  right-4 md:right-16  md:top-14 top-10 md:text-lg text-[18px]  font- text-white  z-10 mix-blend-exclusion font-sans'>
          ~ selected<br />works ~
        </motion.h1>


      </div>

      <div  className='absolute bottom-5 w-full overflow-hidden'>
        <motion.div whileInView={{ borderBottomWidth: ['0rem', '4rem'] }} transition={{ duration: 1.8, ease: 'circOut', staggerChildren: .33 }} className='flex justify-between md:mx-16 mx-2  text-[#aa5c3bee] font-extralight text-xl border-b-[4rem] border-[#aa5c3bc8] pb-2  mon-font italic relative '>
          <div className='w-full h-2 bg-[#ccc] absolute -bottom-12 z-50'></div>
          <motion.h1 style={{ y }} transition={{ duration: 1.2, ease: 'circOut', }} whileInView={{ x: [-30, 0], }} className=''>
            <span>001</span>
          </motion.h1>
          <motion.h1 style={{ y }} transition={{ duration: 1.2, ease: 'circOut', }} whileInView={{ x: [30, 0] }} className=''>
            <span>2023</span>
          </motion.h1>

        </motion.div>
      </div>
    </div>
  );
};

export default HeroCover;