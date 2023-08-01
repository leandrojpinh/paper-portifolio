import AnimatedText from '@/components/AnimatedText'
import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import React, { useRef } from 'react';
import article1 from '../../public/images/articles/form validation in reactjs using custom react hook.png'
import article2 from '../../public/images/articles/smooth scrolling in reactjs.png'
import article3 from '../../public/images/articles/todo list app built using react redux and framer motion.png'
import { motion, useMotionValue } from 'framer-motion';
import TransitionEffect from '@/components/TransitionEffect';

const FramerImage = motion(Image);

const FeaturedArticle = ({ img, title, time, summary, link }) => {
  return (
    <li className='relative col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl dark:bg-dark dark:border-light'>
      <div className='absolute top-0 -right-4 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark rounded-br-3xl dark:bg-light' />
      <Link href={link} target='_blank' className='w-full cursor-pointer overflow-hidden rounded-lg inline-block'>
        <FramerImage
          src={img} alt={title} className='w-full h-auto'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </Link>

      <Link href={link} target='_blank'>
        <h2 className='capitalize text-2xl font-bold my-2 mt-4 hover:underline xs:text-lg'>{title}</h2>
      </Link>
      <p className='text-sm mb-2'>{summary}</p>
      <span className='text-primary font-semibold dark:text-primaryDark'>{time}</span>
    </li>
  )
}

const MovingImg = ({ title, img, link }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imgRef = useRef(null);

  function handleMouse(event) {
    imgRef.current.style.display = 'inline-block';
    x.set(event.pageX);
    y.set(-10);
  }

  function handleMouseLeave(event) {
    imgRef.current.style.display = 'none';
    x.set(0);
    y.set(0);
  }

  return (
    <Link href={link} target='_blank' onMouseMove={handleMouse} onMouseLeave={handleMouseLeave}>
      <h2 className='capitalize text-xl font-semibold hover:underline'>{title}</h2>

      <FramerImage
        style={{ x, y }}
        ref={imgRef}
        src={img}
        alt={title}
        className='z-10 w-96 h-auto hidden absolute rounded-lg md:!hidden'
        whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
        initial={{ opacity: 0 }}
        priority
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />
    </Link>
  )
}

const Article = ({ img, title, date, link }) => {
  return (
    <motion.li
      className='relative w-full p-4 py-6 my-4 rounded-xl flex items-center justify-between bg-light text-dark first:mt-0 border border-solid border-dark border-r-4 border-b-4 dark:bg-dark dark:border-light dark:text-light sm:flex-col'
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      viewport={{ once: true }}
    >
      <MovingImg img={img} link={link} title={title} />
      <span className='text-primary font-semibold pl-4 dark:text-primaryDark sm:self-start sm:pl-0 sm:pt-2 xs:text-sm'>{date}</span>
    </motion.li>
  )
}

const articles = () => {
  return (
    <>
      <Head>
        <title>CodeBucks | Articles Page</title>
        <meta name="description" content="any description" />
      </Head>
      <TransitionEffect />
      <main className='w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light'>
        <Layout className='pt-16'>
          <AnimatedText text="Words Can Change The World!" className='mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8' />
          <ul className='grid grid-cols-2 gap-16 lg:gap-8 md:grid-cols-1 md:gap-y-16'>
            <FeaturedArticle
              title="Build A Custom Pagination Component In Reactjs From Scratch"
              img={article1}
              link="/"
              summary="Learn how to build a custom pagination component in ReactJS from scratch. 
              Follow this step-by-step guide to integrate Pagination component in your ReactJS project."
              time="9 min read"
            />
            <FeaturedArticle
              title="Build A Custom Pagination Component In Reactjs From Scratch"
              img={article2}
              link="/"
              summary="Learn how to build a custom pagination component in ReactJS from scratch. 
              Follow this step-by-step guide to integrate Pagination component in your ReactJS project."
              time="9 min read"
            />
          </ul>

          <h2 className='font-bold text-4xl w-full text-center my-16 mt-32'>All articles</h2>
          <ul>
            <Article
              title="Form Validation In Reactjs: Build A Reusable Custom Hook For Inputs And Error Handling"
              img={article3}
              date="March 23, 2023"
              link="/"
            />
            <Article
              title="Silky Smooth Scrolling In Reactjs: A Step-By-Step Guide For React Developers"
              img={article2}
              date="March 23, 2023"
              link="/"
            />
            <Article
              title="Creating An Efficient Modal Component In React Using Hooks And Portals"
              img={article1}
              date="April 23, 2023"
              link="/"
            />
            <Article
              title="Build A Fabulous Todo List App With React, Redux And Framer-Motion"
              img={article3}
              date="May 23, 2023"
              link="/"
            />
            <Article
              title="Redux Simplified: A Beginner's Guide For Web Developers"
              img={article2}
              date="June 23, 2023"
              link="/"
            />
            <Article
              title="What Is Higher Order Component (Hoc) In React?"
              img={article1}
              date="July 23, 2023"
              link="/"
            />
            <Article
              title="What Is Higher Order Component (Hoc) In React?"
              img={article1}
              date="July 23, 2023"
              link="/"
            />
            <Article
              title="What Is Higher Order Component (Hoc) In React?"
              img={article1}
              date="July 23, 2023"
              link="/"
            />
          </ul>
        </Layout>
      </main>
    </>

  )
}

export default articles