import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import soundManager from '../utils/soundManager'

/* ──────────────────────────────────────────────
   PROJECT CARD (REUSABLE DOSSIER COMPONENT)
   Exact clone of the NexusSearch card structure.
   ────────────────────────────────────────────── */
const ProjectCard = ({ title, tech, description, status, caseNumber, index, bgImage }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [revealed, setRevealed] = useState(false)

  const isEven = index % 2 === 0
  const baseRotate = isEven ? -1.5 : 1.5
  const shardClip = isEven
    ? 'polygon(3% 0%, 100% 2%, 97% 100%, 0% 97%)'
    : 'polygon(0% 2%, 97% 0%, 100% 97%, 3% 100%)'

  /* Status color mapping */
  const statusColor =
    status === 'OPERATIONAL'
      ? 'bg-green-500'
      : status === 'IN PROGRESS'
      ? 'bg-yellow-500'
      : 'bg-blue-500'

  const statusGlow =
    status === 'OPERATIONAL'
      ? ['rgba(34,197,94,0.4)', 'rgba(34,197,94,0)']
      : status === 'IN PROGRESS'
      ? ['rgba(234,179,8,0.4)', 'rgba(234,179,8,0)']
      : ['rgba(59,130,246,0.4)', 'rgba(59,130,246,0)']

  /* Classification auto-assign based on case number */
  const classification =
    caseNumber <= 1
      ? 'TOP SECRET'
      : caseNumber <= 4
      ? 'CLASSIFIED'
      : caseNumber <= 8
      ? 'RESTRICTED'
      : 'CONFIDENTIAL'

  /* Stagger delay — cap it so later cards don't wait too long */
  const staggerDelay = Math.min(0.2 + index * 0.08, 1.2)

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
        scale: 1.02,
        transition: { duration: 0.15 },
      }}
      onMouseEnter={() => soundManager.play('hover')}
      onClick={() => {
        soundManager.play('activate')
        setRevealed(!revealed)
      }}
    >
      {/* ─── CARD OUTER SHARD ─── */}
      <div
        className="absolute inset-0 bg-p5-red opacity-80 group-hover:opacity-100 transition-opacity duration-150"
        style={{
          clipPath: shardClip,
          transform: 'scale(1.02)',
        }}
      />

      {/* ─── CARD INNER ─── */}
      <div
        className="relative bg-p5-dark border border-gray-800 group-hover:border-p5-red transition-colors duration-150 overflow-hidden"
        style={{ clipPath: shardClip }}
      >
        {/* ─── HOVER BACKGROUND IMAGE ─── */}
        {bgImage && (
          <>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 will-change-transform"
            >
              <img
                src={bgImage}
                alt=""
                className="w-full h-full object-cover blur-[2px] contrast-125 brightness-110 scale-100 transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            </div>
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        )}

        <div className="relative z-10 p-6 md:p-8 lg:p-10">

          {/* Top row — ID + Classification */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-2.5 h-2.5 bg-p5-red"
                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
              />
              <span className="font-mono text-[9px] tracking-[0.3em] text-gray-500 uppercase">
                CASE-{String(caseNumber).padStart(3, '0')}
              </span>
            </div>

            {/* Classification stamp */}
            <motion.div
              className="relative"
              initial={{ scale: 3, rotate: -15, opacity: 0 }}
              animate={inView ? { scale: 1, rotate: -6, opacity: 1 } : {}}
              transition={{ duration: 0.25, delay: staggerDelay + 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="font-heading text-sm md:text-base text-p5-red border border-p5-red px-3 py-1 opacity-60"
                style={{ transform: 'rotate(-6deg)' }}
              >
                {classification}
              </span>
            </motion.div>
          </div>

          {/* Codename */}
          <div className="mb-1">
            <span className="font-mono text-[8px] tracking-[0.25em] text-gray-600 uppercase">
              CODENAME //
            </span>
          </div>

          {/* Project Title */}
          <h3
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white leading-none mb-4 group-hover:text-p5-red transition-colors duration-150"
            style={{ transform: 'skewX(-3deg)' }}
          >
            {title}
          </h3>

          {/* Status indicator */}
          <div className="flex items-center gap-2 mb-5">
            <motion.div
              className={`w-1.5 h-1.5 rounded-full ${statusColor}`}
              animate={{
                boxShadow: [
                  `0 0 0 0 ${statusGlow[0]}`,
                  `0 0 0 4px ${statusGlow[1]}`,
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="font-mono text-[9px] tracking-[0.2em] text-gray-500 uppercase">
              STATUS: {status}
            </span>
          </div>

          {/* Reveal line — separator */}
          <motion.div
            className="h-px bg-gradient-to-r from-p5-red/50 via-p5-red to-p5-red/50 mb-5"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.4, delay: staggerDelay + 0.4 }}
          />

          {/* REVEALED CONTENT: Tech Stack + Description */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tech.map((t, i) => (
                    <motion.span
                      key={t}
                      className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 bg-p5-red/20 text-p5-red border border-p5-red/30"
                      style={{
                        clipPath: 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)',
                      }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>

                {/* Description */}
                <motion.p
                  className="font-body text-sm text-gray-400 leading-relaxed"
                  style={{ transform: 'skewX(-1deg)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                >
                  {description}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Click prompt */}
          <div className="mt-4 flex items-center gap-2">
            <motion.div
              className="font-mono text-[8px] tracking-[0.3em] text-gray-600 uppercase"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {revealed ? '▼ CLICK TO REDACT' : '▶ CLICK TO DECLASSIFY'}
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

export default ProjectCard
