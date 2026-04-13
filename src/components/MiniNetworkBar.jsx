import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ──────────────────────────────────────────────
   SHARED LINK DATA
   ────────────────────────────────────────────── */
export const networkLinks = [
  { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/saran-shabu/', type: 'link' },
  { name: 'GITHUB', url: 'https://github.com/TwsitedWizard', type: 'link' },
  { name: 'INSTAGRAM', url: 'https://www.instagram.com/saranbettereachday', type: 'link' },
  { name: 'TRYHACKME', url: 'https://tryhackme.com/p/saranshabu', type: 'link' },
  { name: 'EMAIL', url: 'mailto:saranshabu@gmail.com', type: 'mailto' },
]

/* ──────────────────────────────────────────────
   LINK TAG — compact angled pill
   ────────────────────────────────────────────── */
const LinkTag = ({ link, index }) => {
  const tilt = index % 2 === 0 ? -1.5 : 1.5
  const isRed = index % 2 === 0

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
      className="relative group cursor-pointer outline-none border-none"
      style={{ transform: `rotate(${tilt}deg)` }}
      initial={{ opacity: 0, scale: 0, rotate: tilt + 15 }}
      animate={{ opacity: 1, scale: 1, rotate: tilt }}
      transition={{
        duration: 0.3,
        delay: 0.3 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        scale: 1.12,
        rotate: 0,
        transition: { duration: 0.1 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background shard */}
      <div
        className={`absolute inset-0 ${
          isRed ? 'bg-p5-red' : 'bg-white'
        } opacity-90 group-hover:opacity-100 transition-opacity duration-100`}
        style={{
          clipPath: 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)',
          transform: 'scale(1.03)',
        }}
      />
      {/* Hover invert layer */}
      <div
        className={`absolute inset-0 ${
          isRed ? 'bg-white' : 'bg-p5-red'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-100`}
        style={{
          clipPath: 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)',
          transform: 'scale(1.03)',
        }}
      />

      <span
        className={`relative z-10 font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 md:px-5 md:py-2.5 block transition-colors duration-100 ${
          isRed
            ? 'text-white group-hover:text-p5-red'
            : 'text-p5-charcoal group-hover:text-white'
        }`}
        style={{ transform: 'skewX(-2deg)' }}
      >
        {link.name}
      </span>
    </motion.button>
  )
}

/* ──────────────────────────────────────────────
   MINI NETWORK BAR
   Quick-access control panel strip
   ────────────────────────────────────────────── */
const MiniNetworkBar = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section
      id="network-bar"
      ref={ref}
      className="relative w-full py-10 md:py-14 bg-transparent overflow-hidden"
    >
      {/* Subtle top slash */}
      <div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-p5-red/30 to-transparent"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Label */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3 }}
        >
          <div
            className="w-2.5 h-2.5 bg-p5-red"
            style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          />
          <span className="font-mono text-[9px] tracking-[0.3em] text-gray-500 uppercase">
            NETWORK ACCESS // EXTERNAL LINKS
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-p5-red/20 to-transparent" />
        </motion.div>

        {/* Tag row */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          {networkLinks.map((link, idx) => (
            <LinkTag key={link.name} link={link} index={idx} />
          ))}
        </div>
      </div>

      {/* Subtle bottom slash */}
      <div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-p5-red/30 to-transparent"
      />
    </section>
  )
}

export default MiniNetworkBar
