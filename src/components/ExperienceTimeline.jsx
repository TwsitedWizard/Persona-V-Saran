import { useRef, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import soundManager from '../utils/soundManager'

/* ──────────────────────────────────────────────
   EXPERIENCE DATA — Classified Operation Logs
   ────────────────────────────────────────────── */
const operations = [
  {
    id: 'OP-001',
    date: 'JAN 2026 — JUN 2026',
    role: 'IAM & CYBERSECURITY TRAINEE',
    company: 'DELOITTE CYBER GURUKUL',
    location: 'Skill Development Institute (SDI), Bhubaneswar · Deloitte Partnership',
    status: 'ACTIVE',
    hoverText: 'VERIFYING CLEARANCE...',
    bullets: [
      'Participating in enterprise IAM bootcamp',
      'Working with SailPoint ISC, Okta',
      'Using Auth0 for API security',
      'Learning identity governance & compliance',
    ],
  },
  {
    id: 'OP-002',
    date: 'APR 2025 — SEPT 2025',
    role: 'JUNIOR ASSOCIATE DEVELOPER',
    company: 'CALANJIYAM CONSULTANCIES AND TECHNOLOGIES',
    location: null,
    status: 'COMPLETED',
    hoverText: 'ACCESSING LOG...',
    bullets: [
      'Built 10+ backend services',
      'Used PHP, MySQL, AJAX, Bootstrap, MUI',
      'Led Agile standups (5-member team)',
      'Mentored interns',
      'Managed Git workflows',
    ],
  },
  {
    id: 'OP-003',
    date: 'FEB 2025 — APR 2025',
    role: 'WEB DEVELOPMENT INTERN',
    company: 'CALANJIYAM CONSULTANCIES AND TECHNOLOGIES',
    location: null,
    status: 'COMPLETED',
    hoverText: 'VERIFYING EXPERIENCE...',
    bullets: [
      'Full-stack training',
      'Worked on frontend + backend modules',
      'Strengthened core web dev stack',
    ],
  },
]

/* ──────────────────────────────────────────────
   TIMELINE NODE — diamond marker on the line
   ────────────────────────────────────────────── */
const TimelineNode = ({ index, isActive }) => {
  const nodeRef = useRef(null)
  const nodeInView = useInView(nodeRef, { once: true, margin: '-100px' })
  const hasFired = useRef(false)

  useEffect(() => {
    if (nodeInView && !hasFired.current) {
      hasFired.current = true
      soundManager.play('glitch')
    }
  }, [nodeInView])

  const size = isActive ? 'w-4 h-4' : 'w-3 h-3'
  return (
    <motion.div
      ref={nodeRef}
      className={`relative ${size} transition-all duration-300`}
      initial={{ scale: 0, rotate: 45 }}
      whileInView={{ scale: 1, rotate: 45 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.2 + index * 0.15 }}
    >
      <div
        className={`w-full h-full transition-all duration-300 ${
          isActive ? 'bg-p5-red shadow-[0_0_12px_rgba(255,0,0,0.6)]' : 'bg-gray-600'
        }`}
        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
      />
      {isActive && (
        <motion.div
          className="absolute inset-[-4px]"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(255,0,0,0.4)',
              '0 0 0 8px rgba(255,0,0,0)',
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            transform: 'rotate(0deg)',
          }}
        />
      )}
    </motion.div>
  )
}

/* ──────────────────────────────────────────────
   OPERATION ENTRY — floating tilted info panel
   ────────────────────────────────────────────── */
const OperationEntry = ({ op, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = index % 2 !== 0 // alternate: right, left, right
  const tilt = isLeft ? -1.5 : 1.5
  const slideFrom = isLeft ? -100 : 100
  const isActive = op.status === 'ACTIVE'

  const clipPath = isLeft
    ? 'polygon(0% 3%, 97% 0%, 100% 97%, 2% 100%)'
    : 'polygon(3% 0%, 100% 3%, 98% 100%, 0% 97%)'

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-0 md:gap-8 ${
        isLeft ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      {/* ─── CONNECTOR LINE (mobile hidden) ─── */}
      <div className="hidden md:flex flex-col items-center w-8 shrink-0 pt-6">
        <TimelineNode index={index} isActive={isActive} />
      </div>

      {/* ─── ENTRY PANEL ─── */}
      <motion.div
        className={`relative group flex-1 cursor-default ${
          isLeft ? 'md:text-right' : 'md:text-left'
        }`}
        initial={{ opacity: 0, x: slideFrom, rotate: tilt * 3 }}
        animate={inView ? { opacity: 1, x: 0, rotate: tilt } : {}}
        transition={{
          duration: 0.5,
          delay: 0.3 + index * 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{
          rotate: 0,
          scale: 1.01,
          transition: { duration: 0.15 },
        }}
        onMouseEnter={() => soundManager.play('hover')}
      >
        {/* Outer shard glow */}
        <div
          className={`absolute inset-0 ${
            isActive ? 'bg-p5-red opacity-60' : 'bg-gray-700 opacity-30'
          } group-hover:opacity-80 transition-opacity duration-150`}
          style={{ clipPath, transform: 'scale(1.015)' }}
        />

        {/* Inner panel */}
        <div
          className={`relative bg-p5-dark border overflow-hidden ${
            isActive
              ? 'border-p5-red/50 group-hover:border-p5-red'
              : 'border-gray-800 group-hover:border-gray-600'
          } transition-colors duration-150`}
          style={{ clipPath }}
        >
          {/* ─── HOVER BACKGROUND TEXT ─── */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <motion.span
              className="font-heading text-[4rem] md:text-[6rem] text-white/0 group-hover:text-white/[0.04] transition-all duration-500 whitespace-nowrap select-none"
              style={{ transform: 'rotate(-8deg) skewX(-5deg)' }}
            >
              {op.hoverText}
            </motion.span>
          </div>

          <div className="relative z-10 p-5 md:p-7 lg:p-8">
            {/* Top: ID + Status */}
            <div
              className={`flex items-center gap-3 mb-3 ${
                isLeft ? 'md:flex-row-reverse' : ''
              }`}
            >
              <span className="font-mono text-[8px] tracking-[0.3em] text-gray-600 uppercase">
                {op.id}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-p5-red/20 to-transparent" />
              <div className="flex items-center gap-1.5">
                <motion.div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                  animate={
                    isActive
                      ? {
                          boxShadow: [
                            '0 0 0 0 rgba(34,197,94,0.4)',
                            '0 0 0 4px rgba(34,197,94,0)',
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span
                  className={`font-mono text-[8px] tracking-[0.2em] uppercase ${
                    isActive ? 'text-green-500' : 'text-gray-600'
                  }`}
                >
                  {isActive ? 'ACTIVE' : 'ARCHIVED'}
                </span>
              </div>
            </div>

            {/* Date */}
            <div className={`mb-2 ${isLeft ? 'md:text-right' : ''}`}>
              <span className="font-mono text-[9px] tracking-[0.25em] text-p5-red/70 uppercase">
                {op.date}
              </span>
            </div>

            {/* Role */}
            <h3
              className={`font-heading text-2xl md:text-3xl lg:text-4xl leading-none mb-2 group-hover:text-p5-red transition-colors duration-150 ${
                isActive ? 'text-white' : 'text-gray-300'
              }`}
              style={{ transform: `skewX(${isLeft ? '2' : '-2'}deg)` }}
            >
              {op.role}
            </h3>

            {/* Company */}
            <div className={`mb-1 ${isLeft ? 'md:text-right' : ''}`}>
              <span className="font-mono text-[10px] tracking-[0.15em] text-p5-red uppercase font-bold">
                {op.company}
              </span>
            </div>

            {/* Location (if any) */}
            {op.location && (
              <div className={`mb-3 ${isLeft ? 'md:text-right' : ''}`}>
                <span className="font-mono text-[8px] tracking-[0.15em] text-gray-600 uppercase">
                  {op.location}
                </span>
              </div>
            )}

            {/* Separator */}
            <div className="h-px bg-gradient-to-r from-p5-red/30 via-p5-red/50 to-p5-red/30 mb-4 mt-3" />

            {/* Bullet points */}
            <ul
              className={`space-y-2 ${isLeft ? 'md:text-right' : ''}`}
            >
              {op.bullets.map((b, i) => (
                <motion.li
                  key={i}
                  className={`flex items-start gap-2 ${
                    isLeft ? 'md:flex-row-reverse' : ''
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -10 : 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
                >
                  <span className="text-p5-red text-[8px] mt-1.5 shrink-0">▸</span>
                  <span className="font-body text-xs md:text-sm text-gray-400 leading-relaxed">
                    {b}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Corner accents */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-p5-red/30" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-p5-red/30" />
        </div>
      </motion.div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   EXPERIENCE TIMELINE — OPERATION LOG
   ────────────────────────────────────────────── */
const ExperienceTimeline = () => {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })
  const sectionEnterFired = useRef(false)

  /* Section enter sound */
  useEffect(() => {
    if (inView && !sectionEnterFired.current) {
      sectionEnterFired.current = true
      soundManager.play('sectionEnter')
    }
  }, [inView])

  /* Scroll-driven line growth */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ['0%', '100%'])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-transparent overflow-hidden"
    >
      {/* ─── SECTION HEADER ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-16 md:mb-24">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Big tilted label */}
          <div className="relative inline-block mb-3">
            <motion.div
              className="absolute inset-0 bg-p5-red"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              style={{ transformOrigin: 'left', transform: 'rotate(-2deg) skewX(-5deg) scale(1.08)' }}
            />
            <h2
              className="relative font-heading text-5xl md:text-7xl lg:text-8xl text-white px-4 py-2"
              style={{ transform: 'rotate(-2deg) skewX(-3deg)' }}
            >
              OPERATION LOG
            </h2>
          </div>

          {/* Subtitle */}
          <div className="flex items-center gap-4">
            <span
              className="font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase pb-2 hidden md:block"
              style={{ transform: 'rotate(-1deg)' }}
            >
              // EXPERIENCE
            </span>
          </div>
        </motion.div>

        {/* Section tag */}
        <motion.div
          className="mt-3 flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <div className="w-4 h-px bg-p5-red" />
          <span className="font-mono text-[8px] tracking-[0.3em] text-gray-600 uppercase">
            SEC_02 // CAREER HISTORY
          </span>
        </motion.div>
      </div>

      {/* ─── TIMELINE BODY ─── */}
      <div className="relative max-w-5xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Vertical timeline line — scroll-driven growth */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
          {/* Track (static, dim) */}
          <div className="absolute inset-0 bg-gray-800/50" />
          {/* Fill (scroll-driven, red) */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-p5-red via-p5-red/80 to-p5-red/30"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Mobile timeline line */}
        <div className="md:hidden absolute left-6 top-0 bottom-0 w-px">
          <div className="absolute inset-0 bg-gray-800/50" />
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-p5-red to-p5-red/30"
            style={{ height: lineHeight }}
          />
        </div>

        {/* ─── ENTRIES ─── */}
        <div className="space-y-12 md:space-y-20">
          {operations.map((op, idx) => {
            const isLeft = idx % 2 !== 0
            return (
              <div key={op.id} className="relative">
                {/* Desktop: position entry on alternating sides */}
                <div className="hidden md:grid md:grid-cols-[1fr_2rem_1fr] items-start">
                  {/* Left column */}
                  {isLeft ? (
                    <OperationEntry op={op} index={idx} />
                  ) : (
                    <div />
                  )}

                  {/* Center column — node */}
                  <div className="flex justify-center pt-6">
                    <TimelineNode index={idx} isActive={op.status === 'ACTIVE'} />
                  </div>

                  {/* Right column */}
                  {!isLeft ? (
                    <OperationEntry op={op} index={idx} />
                  ) : (
                    <div />
                  )}
                </div>

                {/* Mobile: stacked with left-aligned timeline */}
                <div className="md:hidden pl-10">
                  {/* Mobile node */}
                  <div className="absolute left-[18px] top-6">
                    <TimelineNode index={idx} isActive={op.status === 'ACTIVE'} />
                  </div>
                  <OperationEntry op={op} index={idx} />
                </div>
              </div>
            )
          })}
        </div>

        {/* ─── END MARKER ─── */}
        <motion.div
          className="mt-16 md:mt-24 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="w-8 h-px bg-gray-800" />
          <div
            className="w-2 h-2 bg-p5-red/40"
            style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          />
          <span className="font-mono text-[8px] tracking-[0.3em] text-gray-600 uppercase">
            END OF OPERATION LOG // {operations.length} ENTRIES INDEXED
          </span>
          <div
            className="w-2 h-2 bg-p5-red/40"
            style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          />
          <div className="w-8 h-px bg-gray-800" />
        </motion.div>
      </div>
    </section>
  )
}

export default ExperienceTimeline
