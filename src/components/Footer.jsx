import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { networkLinks } from './MiniNetworkBar'

/* ──────────────────────────────────────────────
   FOOTER LINK — tiny subtle tag
   ────────────────────────────────────────────── */
const FooterLink = ({ link, index }) => {
  const handleClick = () => {
    if (link.type === 'mailto') {
      window.location.href = link.url
    } else {
      window.open(link.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      className="
        relative group cursor-pointer outline-none border-none
        font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase
        text-gray-500 hover:text-p5-red
        transition-colors duration-150
        px-2 py-1
      "
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.1 + index * 0.06 }}
      whileHover={{ scale: 1.08, transition: { duration: 0.1 } }}
    >
      {link.name}
      {/* Hover underline */}
      <span className="absolute bottom-0 left-2 right-2 h-px bg-p5-red scale-x-0 group-hover:scale-x-100 transition-transform duration-150 origin-left" />
    </motion.button>
  )
}

/* ──────────────────────────────────────────────
   FOOTER — System shutdown / end screen
   ────────────────────────────────────────────── */
const Footer = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <footer
      id="footer"
      ref={ref}
      className="relative w-full py-10 md:py-14 bg-p5-charcoal overflow-hidden"
    >
      {/* Top separator */}
      <div className="absolute top-0 left-0 w-full h-px bg-gray-800" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Row 1 — Social links */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-1 md:gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          {networkLinks.map((link, idx) => (
            <FooterLink key={link.name} link={link} index={idx} />
          ))}
        </motion.div>

        {/* Thin red line */}
        <motion.div
          className="mx-auto w-24 h-px bg-p5-red/40 mb-6"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
        />

        {/* Row 2 — Copyright + system tag */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-1.5 h-1.5 bg-p5-red"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="font-mono text-[8px] md:text-[9px] tracking-[0.2em] text-gray-600 uppercase">
              © 2026 SARAN SHABU // SYSTEM ACTIVE
            </span>
          </div>
          <span className="hidden md:inline font-mono text-gray-700 text-[8px]">|</span>
          <span className="font-mono text-[7px] md:text-[8px] tracking-[0.15em] text-gray-700 uppercase">
            ALL INTEL RESERVED // END TRANSMISSION
          </span>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
