import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from 'framer-motion'
import { Button, IntroOverlay } from '@components/UI'
import { gsap } from 'gsap'
import { TweenMax } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { HashObstacles } from '@components/UI'
import Typed from 'react-typed'
import Header from '@common/Layout/Header'
import About from '@components/About'
import Skill from '@components/Skill'
import Portfolio from '@components/Portfolio'
import { colors, colors2, transition } from '@utils/index'
import PageHead from '@common/PageHead'
import SmoothScroll from '@common/SmoothScroll'
import VanillaTilt from 'vanilla-tilt'
import cn from 'classnames'
import CustomCursor from '@components/UI/CustomCursor'
import CustomCursorContext from '@components/UI/context/CustomCursorContext'
import { useRouter } from 'next/router'
import { media } from '@utils/style'
import img from '@assets/images/r/mob3-t.png'
import imgv from '@assets/images/mv.jpg'
import simg from '@assets/images/shadow.png'
import ReactPlayer from 'react-player'


interface PageProps {
  section: any
}

const Home: NextPage<PageProps> = ({ section }) => {
  const [animationComplete, setAnimationComplete] = useState(false)
  const [footerInView, setFooterInView] = useState(false)
  const [mob, setMob] = useState(false)
  const { scrollYProgress } = useViewportScroll()
  const scaleAnim = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1])
  const yPosAnim = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -50])
  const { type, setType } = useContext(CustomCursorContext)
  const router = useRouter()
  const { noanim } = router.query
  const widthRef: any = useRef()



  const completeAnimation = () => {
    setAnimationComplete(true)
    document.body.style.overflowY = 'auto'
    const bH =
      document.getElementById('scId')?.getBoundingClientRect().height ||
      document.getElementById('scId')?.clientHeight
    if (bH) {
      document.body.style.height = `${bH}px`
    }
  }

  const sectionsRef: any = useRef(null)
  const executeScroll = () => sectionsRef.current?.scrollIntoView()
  const scrollToSection = () => {
    if (typeof window !== 'undefined') {
      if (section) {
        // Use the hash to find the first element with that id
        const element = document.getElementById(section)

        if (element) {
          // Smooth scroll to that elment
          element.scrollIntoView()
        }
      }
    }
  }

  useEffect(() => {
    let media = window.matchMedia('(max-width: 664px)')
    setMob(media?.matches)
  }, [])

  useEffect(() => {
    // Inner Page height for mobile devices
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    // GSAP animation
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
    let tl = gsap.timeline()
    let sections = gsap.utils.toArray('.section')
    let mediaQuery = window.matchMedia('(min-width: 967px)')
    widthRef.current = mediaQuery

    const homeAnimation = (animation: () => void) => {
      if (!section) {
        tl.to('.ball, .ball2, .ball3', {
          duration: 2.5,
          y: '50vh',
          ease: 'ease.in',
        })
          .to('.ball, .ball2, .ball3', {
            duration: 0.8,
            translateX: '100vw',
            scale: 50,
            scaleX: 200,
            ease: 'ease.out',
            x: '200vw',
            left: '50vw',
            onComplete: animation,
          })
          .from('.after-animation', {
            duration: 0.5,
            opacity: 0,
            ease: 'power3.out',
          })
          .from('.title', {
            duration: 0.2,
            y: 100,
            delay: 0.1,
            opacity: 0,
            ease: 'power3.out',
          })
          .from('.peep-image', {
            duration: 1,
            scale: 0,
            opacity: 0,
            ease: 'spring',
          })
          .from('.job-title', {
            duration: 0.5,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
          })
          .from('.scroll-indicator', {
            duration: 0.5,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
          })
      } else {
        completeAnimation()
        scrollToSection()
      }

      if (mediaQuery.matches) {
        sections.forEach((section: any) => {
          let tlSection = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top center',
              end: 'center center',
              scrub: 1,
            },
          })
          let sectionImage = section?.querySelector('img')
          let sectionInfo = section?.querySelector('.section-info')

          tlSection
            .from(sectionImage, {
              x: -300,
              opacity: 0,
            })
            .from(sectionInfo, {
              x: 300,
              opacity: 0,
            })
        })
      } else {
        sections.forEach((section: any) => {
          let tlSection = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top center',
              end: 'center center',
              scrub: 1,
            },
          })
          let sectionImage = section?.querySelector('img')
          let sectionInfo = section?.querySelector('.section-info')

          tlSection
            .from(sectionImage, {
              y: 100,
              opacity: 0,
            })
            .from(sectionInfo, {
              y: 100,
              opacity: 0,
            })
        })
      }

      let tlFooter = gsap.timeline({
        scrollTrigger: {
          trigger: 'footer',
          start: 'top center',
          end: 'top top',
          scrub: 1,
        },
      })

      tlFooter
        .from('footer h2', {
          y: -100,
          opacity: 0,
          duration: 0.6,
        })
        .from('footer .footer-links', {
          y: 100,
          opacity: 0,
          duration: 0.6,
        })
    }

    if (noanim) {
      completeAnimation()
    } else {
      homeAnimation(completeAnimation)
    }
  }, [])

  useEffect(() => {
    VanillaTilt.init(document.querySelector('.home-obs') as any, {
      reverse: true,
      max: 5,
      speed: 1000,
      transition: true,
    })
    VanillaTilt.init(document.querySelector('.home-obs img') as any, {
      max: 5,
      speed: 2000,
      transition: true,
    })

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.scrollDist',
          scrub: 5,
        },
      })
      .to('.sky', { y: 100 }, 0)
      .to('.cloud', { y: -150 }, 0)

    document
      .querySelector('.scroll-indicator')
      ?.addEventListener('click', (e) => {
        gsap.to(window, {
          scrollTo: innerHeight,
          duration: 1,
          ease: 'power1.inOut',
        })
      })
    if (animationComplete) {
      setType('default')
    } else {
      setType('none')
    }
  }, [animationComplete])

  const VIDEO_PATH =
    'https://github.com/Yadab-Sd/art-world/assets/23726737/c89824bd-4b0a-4beb-b448-81344c4e10f3'
  const playerRef = useRef(null)

  return (
    <div>
      {/* <CustomCursor /> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, x: 500, transition: { duration: 5 } }}
        className="container"
      >
        <PageHead />
        {/* <IntroOverlay /> */}
        {animationComplete === false && <IntroOverlay />}
        <div className="after-animation">
          <Header start={!animationComplete} />
          <main className="main-home">
            <div className="cta">
              <div className="title w-6/12 font-bold">
                <h2 className="playfulx text-5xl tracking-wide md:text-5xl lg:text-8xl">
                  <span className="flex lg:inline">
                    <span className="heading">Grab</span> Your
                  </span>{' '}
                  Smartphone Today
                </h2>
              </div>
              <div
                className="peep-imagex brushx panel__imgx home-obsx sky flex w-min items-center justify-center"
                style={{
                  transition: 'all 1s ease',
                  transform: 'translateZ(20px) scale(1.2)',
                  transformStyle: 'preserve-3d',
                }}
              // data-tilt
              // data-tilt-full-page-listening
              // data-tilt-reset="false"
              // data-tilt-reverse="true"
              >
                <div
                  // data-tilt
                  // data-tilt-full-page-listening
                  // data-tilt-reset="false"
                  className="flex items-center justify-center relative z-10 mb-6 lg:mb-0"
                  style={{ width: widthRef.current?.matches ? 500 : '80vw' }}
                >
                  <img
                    src={img.src}
                    alt="iNVA"
                    style={{
                      width: widthRef.current?.matches ? 600 : '75vw',
                      margin: '0 auto',
                      filter: 'opacity(1)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                    className="cloud !mt-0 lg:!mt-0 p-4 lg:p-4 my-shadow"
                  />
                </div>
                {/* <HashObstacles /> */}
              </div>
            </div>

            <div className="job-title mt-8">
              {/* <i className="text-xs font-light text-secondary">{'<script>'}</i> */}
              <p className="ml-4 flex text-accent">
                <h4 className="mr-2 font-mono text-lg lg:text-xl text-secondary">
                  Less price with best quality!
                </h4>
                {/* @ts-ignore */}
                {/* <Typed
                  strings={['Programming', 'Designing', 'Coding']}
                  typeSpeed={40}
                  backSpeed={50}
                  loop
                  className="font-mono text-2xl text-secondary"
                />{' '} */}
              </p>
              {/* <i className="text-xs font-light text-secondary">{'</script>'}</i> */}
            </div>

            <button className="scroll-indicator text-xs md:text-sm">
              <span>Go Down</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="playful-scroll w-4 font-semibold"
              />
            </button>
          </main>

          <div className="section-container" ref={sectionsRef}>
            <div className="section bg-gray-200/20x" id={section}>
              <About />
            </div>
            <div className="" id={section}>
              <Skill />
            </div>
            <div
              className="my-8 lg:my-20 py-6"
              id={section}
              style={{
                background: `url(${simg.src})`,
                backgroundPosition: 'bottom',
                backgroundRepeat: 'no-repeat',
              }}
            >
           
              <div className="bg-gray-100">
            <div className="header-container text-center py-12 bg-purple-900 text-white">
              <h1 className=" text-white mb-4 header-title text-3xl md:text-4xl lg:text-5xl font-bold">
                Smartphone Variants For Everyone
              </h1>
              <p className='font-bold text-center text-[18px] mb-8 text-blue-200'>Discover iNVA, your gateway to high-quality smartphones at unbeatable prices.</p>
              <a
                href="#"
                className="demo-button  bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-full transition duration-300"
              >
                INVA & INVA-X
              </a>


              <div className='flex flex-col lg:flex-row mt-14 gap-4'>
                <div className='w-full lg:w-1/2'>
                  <h2 className="text-white text-xl lg:text-4xl font-bold text-center mb-4">
                    INVA MODEL
                  </h2>

                  <ul className=" text-[16px]  text-blue-200 leading-loose">
                    <li className="mb-2 lg:mb-2">Type:    Dimensity6020, 7nm</li>
                    <li className="mb-2 lg:mb-2">No. of Cores:    Octa-core</li>
                    <li className="mb-2 lg:mb-2">Camera:   50MP/8MP</li>
                    <li className="mb-2 lg:mb-2">Frequency:   Upto 2.2GHz</li>
                    <li className="mb-2 lg:mb-2">Memory:   6+128 (emmc+ddr4x)</li>
                  </ul>
                </div>
                <div className='w-full lg:w-1/2' data-aos="zoom-in">
                  <img src='/gallery/bg_img.png' alt='/' className='w-full h-auto' />
                </div>
              </div>


              <div className='flex flex-col-reverse md:flex-col-reverse lg:flex-row mt-10 gap-4'>
                <div className='w-full lg:w-1/2' data-aos="zoom-in">
                  <img src='/gallery/img6.jpeg' alt='/' className='w-full h-auto' />
                </div>
                <div className='w-full lg:w-1/2'>
                  <h2 className="text-white text-xl lg:text-4xl font-bold text-center mb-4">
                    INVA-X MODEL
                  </h2>
                  <ul className="text-[16px] text-blue-200 leading-loose">
                    <li className="mb-2 lg:mb-2">Type:   Dimensity6020, 7nm</li>
                    <li className="mb-2 lg:mb-2">No. of Cores:   Octa-core</li>
                    <li className="mb-2 lg:mb-2">Camera:   50MP/8MP</li>
                    <li className="mb-2 lg:mb-2">Frequency:    Upto 2.2GHz</li>
                    <li className="mb-2 lg:mb-2">Memory:   6+128 (emmc+ddr4x)</li>
                  </ul>
                </div>

              </div>

            </div>



          </div>
            </div>
            <div
              className="portfoliox bg-cover py-12 !pb-40 relative lg:h-96 flex flex-col items-center mb-40 lg:mb-80"
              id={section}
              style={{
                backgroundImage: `linear-gradient(45deg, var(--accent6), var(--accent5))`,
              }}
            >
              <h2 className="text-white text-xl lg:text-4xl font-bold text-center mb-4">
                Whole In A Minute
              </h2>
              <div className="flex justify-center translate-y-[60%] lg:translate-y-[40%] absolute top-0 vid px-4 lg:px-0">
                {/* @ts-ignore */}
                <ReactPlayer
                  ref={playerRef}
                  url={VIDEO_PATH}
                  controls={true}
                  className="lg:w-96 bg-white rounded-lg border-4 border-white"
                  stopOnUnmount
                  style={
                    mob
                      ? {
                        width: '100vw',
                        display: 'flex',
                        justifyContent: 'center',
                      }
                      : {}
                  }
                />
              </div>
            </div>
            <div className="portfolio" id={section}>
              <Portfolio />
            </div>

          </div>

        
          <footer className="bg-gradient-to-r from-sky-900 to-blue-900  h-auto rounded-lg shadow  mt-4 ml-4 mr-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
              <div className="sm:flex sm:items-center sm:justify-between">
                <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                  <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </a>
                <ul className="flex flex-wrap gap-5 items-center mb-6 text-[18px] font-medium text-white sm:mb-0 ">
                  <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">Contact</a>
                  </li>
                </ul>
              </div>
              <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
              <div className=' mx-auto'>
                <span className='block text-[17px] text-white sm:text-center font-thin '>Lightweight and wireless charging design, great for all headphones. you'll like this: One key to answer the phone calls, and you can get a perfect music while ...</span>
              </div>
              <span className="block mt-4 text-[20px] text-white sm:text-center ">
                © 2024 <a href="https://flowbite.com/" className="hover:underline">  INVA & INVA-X™  </a>. All Rights Reserved.
              </span>
            </div>
          </footer>
        </div>
      </motion.div>

    </div>
  )
}

export default Home

export async function getStaticProps(context: { query: any }) {
  const { query } = context

  const section = query?.section ?? false

  return {
    props: {
      section,
    }, // will be passed to the page component as props
  }
}





