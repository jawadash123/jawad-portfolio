import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const variants: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article' | 'span'
}

/** Fade-up + de-blur entrance when the element scrolls into view. */
export default function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const Comp = (motion as any)[as] ?? motion.div
  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={delay}
    >
      {children}
    </Comp>
  )
}
