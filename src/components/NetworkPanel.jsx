import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ──────────────────────────────────────────────
   NETWORK DATA
   ────────────────────────────────────────────── */
const nodes = [
  {
    nodeId: 1,
    platform: 'LINKEDIN',
    url: 'https://www.linkedin.com/in/saran-shabu/',
    type: 'link',
    protocol: 'HTTPS',
    connectMsg: 'AUTHENTICATING...',
  },
  {
    nodeId: 2,
    platform: 'GITHUB',
    url: 'https://github.com/TwsitedWizard',
    type: 'link',
    protocol: 'HTTPS',
    connectMsg: 'CONNECTING...',
  },
  {
    nodeId: 3,
    platform: 'INSTAGRAM',
    url: 'https://www.instagram.com/saranbettereachday',
    type: 'link',
    protocol: 'HTTPS',
    connectMsg: 'SYNCING FEED...',
  },
  {
    nodeId: 4,
    platform: 'TRYHACKME',
    url: 'https://tryhackme.com/p/saranshabu',
    type: 'link',
    protocol: 'HTTPS',
    connectMsg: 'BREACHING...',
  },
  {
    nodeId: 5,
    platform: 'EMAIL',
    url: 'mailto:saranshabu@gmail.com',
    displayUrl: 'saranshabu@gmail.com',
    type: 'mailto',
    protocol: 'SMTP',
    connectMsg: 'ENCRYPTING...',
  },
]

/* ──────────────────────────────────────────────
   ACCESS CARD — Classified network node
   ────────────────────────────────────────────── */
const AccessCard = ({ node, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  const isEven = index % 2 === 0
  const baseRotate = isEven ? -1.5 : 1.5
  const shardClip = isEven
    ? 'polygon(3% 0%, 100% 2%, 97% 100%, 0% 97%)'
    : 'polygon(0% 2%, 97% 0%, 100% 97%, 3% 100%)'

  const displayUrl = node.displayUrl || node.url.replace('https://', '').replace('mailto:', '')
  const staggerDelay = Math.min(0.2 + index * 0.12, 1.0)

  const handleClick = () => {
    if (node.type === 'mailto') {
      window.location.href = node.url
    } else {
      window.open(node.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div
      ref={ref}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, x: isEven ? -80 : 80, rotate: isEven ? -5 : 5 }}
      animate={inView ? { opacity: 1, x: 0, rotate: baseRotate } : {}}
      transition={{
        duration: 0.5,
        delay: staggerDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        rotate: 0,
        scale: 1.05,
        transition: { duration: 0.12 },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* ─── OUTER SHARD ─── */}
      <div
        className="absolute inset-0 bg-p5-red opacity-80 group-hover:opacity-100 transition-opacity duration-150"
        style={{
          clipPath: shardClip,
          transform: 'scale(1.02)',
        }}
      />

      {/* ─── INNER CARD ─── */}
      <div
        className="relative bg-p5-dark border border-gray-800 group-hover:border-p5-red transition-colors duration-150 overflow-hidden"
        style={{ clipPath: shardClip }}
      >
        {/* Background connecting text */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <span
                className="font-heading text-[5vw] md:text-[80px] text-white opacity-[0.04] whitespace-nowrap"
                style={{ transform: 'rotate(-5deg) skewX(-8deg)' }}
              >
                {node.connectMsg}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-5 md:p-7 lg:p-8">

          {/* Top row — Node ID + Protocol */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-2.5 h-2.5 bg-p5-red"
                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
              />
              <span className="font-mono text-[9px] tracking-[0.3em] text-gray-500 uppercase">
                NODE-{String(node.nodeId).padStart(3, '0')}
              </span>
            </div>

            {/* Protocol badge */}
            <motion.div
              className="relative"
              initial={{ scale: 3, rotate: -15, opacity: 0 }}
              animate={inView ? { scale: 1, rotate: -6, opacity: 1 } : {}}
              transition={{ duration: 0.25, delay: staggerDelay + 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="font-heading text-sm text-p5-red border border-p5-red px-3 py-1 opacity-60"
                style={{ transform: 'rotate(-6deg)' }}
              >
                {node.protocol}
              </span>
            </motion.div>
          </div>

          {/* Access point label */}
          <div className="mb-1">
            <span className="font-mono text-[8px] tracking-[0.25em] text-gray-600 uppercase">
              ACCESS POINT //
            </span>
          </div>

          {/* Platform Name */}
          <h3
            className="font-heading text-3xl md:text-4xl lg:text-5xl text-white leading-none mb-3 group-hover:text-p5-red transition-colors duration-150"
            style={{ transform: 'skewX(-3deg)' }}
          >
            {node.platform}
          </h3>

          {/* Status indicator */}
          <div className="flex items-center gap-2 mb-4">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-green-500"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(34,197,94,0.4)',
                  '0 0 0 4px rgba(34,197,94,0)',
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="font-mono text-[9px] tracking-[0.2em] text-gray-500 uppercase">
              STATUS: ACTIVE
            </span>
          </div>

          {/* Divider */}
          <motion.div
            className="h-px bg-gradient-to-r from-p5-red/50 via-p5-red to-p5-red/50 mb-4"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.4, delay: staggerDelay + 0.4 }}
          />

          {/* URL reveal on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden mb-3"
              >
                <motion.span
                  className="font-mono text-[10px] tracking-wider text-p5-red block"
                  style={{
                    clipPath: 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)',
                    transform: 'skewX(-2deg)',
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15, delay: 0.05 }}
                >
                  → {displayUrl}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action prompt */}
          <div className="flex items-center gap-2">
            <motion.div
              className="font-mono text-[8px] tracking-[0.3em] text-gray-600 uppercase"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {hovered ? '■ ESTABLISH CONNECTION' : '▶ HOVER TO AUTHENTICATE'}
            </motion.div>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-p5-red/40" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-p5-red/40" />
      </div>
    </motion.div>
  )
}

/* ──────────────────────────────────────────────
   NETWORK PANEL SECTION
   ────────────────────────────────────────────── */
const NetworkPanel = () => {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="network"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-p5-charcoal overflow-hidden"
    >
      {/* ═══ BACKGROUND ═══ */}

      {/* Watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[14vw] text-white opacity-[0.015] select-none pointer-events-none whitespace-nowrap"
        style={{ transform: 'translate(-50%,-50%) rotate(-3deg) skewX(-5deg)' }}
      >
        ACCESS
      </div>

      {/* Diagonal red shard — left */}
      <motion.div
        className="absolute bg-p5-red opacity-[0.04]"
        style={{
          width: '450px',
          height: '500px',
          top: '5%',
          left: '-8%',
          clipPath: 'polygon(15% 0%, 100% 8%, 85% 100%, 0% 88%)',
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #FF0000 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-p5-red to-transparent opacity-20"
        animate={{ top: ['-5%', '105%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      {/* ═══ CONTENT ═══ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* ─── SECTION HEADER ─── */}
        <div className="relative mb-16 md:mb-24">
          <motion.div
            className="absolute bg-p5-red"
            style={{
              width: '440px',
              height: '100%',
              top: '0',
              left: '-20px',
              clipPath: 'polygon(2% 0%, 100% 5%, 98% 100%, 0% 93%)',
              zIndex: 0,
            }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.div
            className="relative z-10 flex items-end gap-4"
            initial={{ x: -80, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="font-heading text-6xl md:text-8xl lg:text-9xl text-white leading-none"
              style={{ transform: 'rotate(-2deg) skewX(-3deg)' }}
            >
              NETWORK
            </h2>
            <span
              className="font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase pb-2 hidden md:block"
              style={{ transform: 'rotate(-1deg)' }}
            >
              // EXTERNAL ACCESS
            </span>
          </motion.div>

          <motion.div
            className="mt-3 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="w-6 h-px bg-p5-red" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase">
              SEC_05 // CONNECTION HUB
            </span>
          </motion.div>
        </div>

        {/* ─── ACCESS CARDS ─── */}
        <div className="space-y-6 md:space-y-10">
          {nodes.map((node, idx) => (
            <AccessCard key={node.nodeId} node={node} index={idx} />
          ))}
        </div>

        {/* ─── BOTTOM SYSTEM NOTE ─── */}
        <motion.div
          className="mt-16 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.0 }}
        >
          <motion.div
            className="w-2 h-2 bg-p5-red"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase">
            {nodes.length} NODES INDEXED // ALL CONNECTIONS SECURED
          </span>
        </motion.div>
      </div>

      {/* ═══ BOTTOM DIVIDER ═══ */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-20 bg-p5-dark"
        style={{
          clipPath: 'polygon(0 60%, 100% 0%, 100% 100%, 0% 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.0, duration: 0.4 }}
      />
    </section>
  )
}

export default NetworkPanel
