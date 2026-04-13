import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import soundManager from '../utils/soundManager'

/* ──────────────────────────────────────────────
   EDUCATION DATA — CGPA card hover reveal
   ────────────────────────────────────────────── */
const educationTimeline = [
  {
    label: '// SEC_EDU_01',
    institution: 'Amrutha Public School',
    detail: '10th Grade — Science',
    score: '89%',
    year: '2018–2019',
  },
  {
    label: '// SEC_EDU_02',
    institution: 'Govt. J.N.M. Higher Secondary School',
    detail: '12th — Physics, Chemistry, Math & CS',
    score: '98%',
    year: '2019–2021',
  },
  {
    label: '// SEC_EDU_03',
    institution: 'Amrita Vishwa Vidyapeetham',
    detail: 'Integrated BCA-MCA, Computer Science',
    score: 'CGPA 9.32',
    year: '2021–2026',
  },
]

/* ──────────────────────────────────────────────
   PUBLICATIONS DATA — Publications card hover
   ────────────────────────────────────────────── */
const publications = [
  {
    fileTag: '[PAPER_01] // I-SMAC 2024',
    title: 'Tree Age Prediction using VGG16 from Cross-Sectional Images',
    venue: '8th International Conference on I-SMAC 2024',
    status: 'PUBLISHED & PRESENTED',
    tags: ['CNN', 'DEEP LEARNING', 'IMAGE PROCESSING'],
  },
  {
    fileTag: '[PAPER_02] // INDIACOM 2025',
    title: 'Comparing Classification Algorithms in Conservation of Plant Genetic Resources',
    venue: 'Academic Publication',
    status: 'PUBLISHED',
    tags: ['ML', 'CLASSIFICATION', 'AGRICULTURE AI'],
  },
]

/* ──────────────────────────────────────────────
   CGPA STAT BADGE — with education timeline reveal
   ────────────────────────────────────────────── */
const CgpaBadge = ({ delay = 0, isOpen, onToggle, onHoverStart, onHoverEnd }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div
      className={isOpen ? "relative z-50" : "relative z-40"}
      onMouseEnter={() => {
        if (window.matchMedia('(hover: hover)').matches) {
          onHoverStart()
          soundManager.play('hover')
        }
      }}
      onMouseLeave={() => {
        if (window.matchMedia('(hover: hover)').matches) {
          onHoverEnd()
        }
      }}
      onClick={() => {
        if (!window.matchMedia('(hover: hover)').matches) {
          onToggle()
          if (!isOpen) soundManager.play('hover')
        }
      }}
    >
      {/* The stat badge itself */}
      <motion.div
        ref={ref}
        className="relative group cursor-pointer"
        initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{
          scale: 1.08,
          rotate: -2,
          transition: { duration: 0.15 },
        }}
      >
        {/* Jagged background shard */}
        <div
          className="absolute inset-0 bg-p5-red transition-all duration-150 group-hover:bg-white"
          style={{
            clipPath: 'polygon(5% 0%, 100% 3%, 95% 100%, 0% 97%)',
            transform: 'scale(1.05)',
          }}
        />
        {/* Inner content */}
        <div
          className="relative px-6 py-5 md:px-8 md:py-6"
          style={{
            clipPath: 'polygon(5% 0%, 100% 3%, 95% 100%, 0% 97%)',
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div
                className="font-heading text-4xl md:text-5xl lg:text-6xl text-white group-hover:text-p5-red transition-colors duration-150"
                style={{ transform: 'skewX(-3deg)' }}
              >
                9.32
              </div>
              <div
                className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-gray-300 group-hover:text-p5-charcoal uppercase mt-1 transition-colors duration-150"
                style={{ transform: 'skewX(-3deg)' }}
              >
                CGPA
              </div>
            </div>
            {/* Expand indicator */}
            <motion.div
              className="font-mono text-[8px] tracking-widest text-gray-400 group-hover:text-p5-charcoal transition-colors duration-150"
              animate={{ y: isOpen ? 4 : 0 }}
              transition={{ duration: 0.15 }}
            >
              {'▾▾'}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ─── EDUCATION TIMELINE REVEAL PANEL ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 mt-2 w-[320px] z-50"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0, transition: { duration: 0.15 } }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            {/* Panel background */}
            <div
              className="relative bg-neutral-900 border border-red-500/30 shadow-[0_0_20px_rgba(255,0,0,0.2)]"
              style={{
                clipPath: 'polygon(0% 0%, 97% 2%, 100% 98%, 3% 100%)',
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-p5-red" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-p5-red" />

              <div className="p-4 space-y-3">
                {/* Panel header */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-2 h-2 bg-p5-red"
                    style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                  />
                  <span className="font-mono text-[7px] tracking-[0.3em] text-p5-red uppercase">
                    EDUCATION TIMELINE
                  </span>
                </div>

                {/* Timeline entries */}
                <div className="relative pl-5 pb-1">
                  {/* Red vertical line */}
                  <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-p5-red via-p5-red/60 to-p5-red/20" />

                  {educationTimeline.map((edu, idx) => (
                    <motion.div
                      key={idx}
                      className="relative"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 28,
                        delay: 0.08 * idx,
                      }}
                    >
                      {/* Diamond node */}
                      <div
                        className="absolute -left-5 top-[6px] w-[10px] h-[10px] bg-p5-red"
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                          transform: 'translateX(-0.5px)',
                        }}
                      />

                      {/* Label */}
                      <div className="font-mono text-[10px] tracking-widest text-p5-red/60 uppercase mb-1">
                        {edu.label}
                      </div>

                      {/* Institution */}
                      <div className="font-heading text-sm font-bold text-white uppercase leading-tight">
                        {edu.institution}
                      </div>

                      {/* Detail */}
                      <div className="font-mono text-xs text-gray-300 uppercase tracking-wide mt-0.5">
                        {edu.detail}
                      </div>

                      {/* Score + Year */}
                      <div className="flex items-center justify-between mt-1.5 flex-wrap">
                        <span className="font-mono text-sm text-red-500 font-semibold tracking-wider">
                          {edu.score}
                        </span>
                        <span className="font-mono text-[11px] text-gray-400 tracking-wider">
                          {edu.year}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ──────────────────────────────────────────────
   PUBLICATIONS STAT BADGE — with research reveal
   ────────────────────────────────────────────── */
const PublicationsBadge = ({ delay = 0, isOpen, onToggle, onHoverStart, onHoverEnd }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div
      className={isOpen ? "relative z-50" : "relative z-30"}
      onMouseEnter={() => {
        if (window.matchMedia('(hover: hover)').matches) {
          onHoverStart()
          soundManager.play('hover')
        }
      }}
      onMouseLeave={() => {
        if (window.matchMedia('(hover: hover)').matches) {
          onHoverEnd()
        }
      }}
      onClick={() => {
        if (!window.matchMedia('(hover: hover)').matches) {
          onToggle()
          if (!isOpen) soundManager.play('hover')
        }
      }}
    >
      {/* The stat badge itself */}
      <motion.div
        ref={ref}
        className="relative group cursor-pointer"
        initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{
          scale: 1.08,
          rotate: -2,
          transition: { duration: 0.15 },
        }}
      >
        {/* Jagged background shard */}
        <div
          className="absolute inset-0 bg-p5-red transition-all duration-150 group-hover:bg-white"
          style={{
            clipPath: 'polygon(5% 0%, 100% 3%, 95% 100%, 0% 97%)',
            transform: 'scale(1.05)',
          }}
        />
        {/* Inner content */}
        <div
          className="relative px-6 py-5 md:px-8 md:py-6"
          style={{
            clipPath: 'polygon(5% 0%, 100% 3%, 95% 100%, 0% 97%)',
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div
                className="font-heading text-4xl md:text-5xl lg:text-6xl text-white group-hover:text-p5-red transition-colors duration-150"
                style={{ transform: 'skewX(-3deg)' }}
              >
                02
              </div>
              <div
                className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-gray-300 group-hover:text-p5-charcoal uppercase mt-1 transition-colors duration-150"
                style={{ transform: 'skewX(-3deg)' }}
              >
                PUBLICATIONS
              </div>
            </div>
            {/* Expand indicator */}
            <motion.div
              className="font-mono text-[8px] tracking-widest text-gray-400 group-hover:text-p5-charcoal transition-colors duration-150"
              animate={{ y: isOpen ? 4 : 0 }}
              transition={{ duration: 0.15 }}
            >
              {'▾▾'}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ─── PUBLICATIONS REVEAL PANEL (drops down) ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 mt-2 w-[340px] z-50"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0, transition: { duration: 0.15 } }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <div className="relative bg-neutral-900 border border-red-500/30 shadow-[0_0_20px_rgba(255,0,0,0.2)] p-4 space-y-3"
              style={{ clipPath: 'polygon(0% 0%, 97% 2%, 100% 98%, 3% 100%)' }}>
              {publications.map((pub, idx) => (
                <motion.div
                  key={idx}
                  className="relative"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 25,
                    delay: 0.1 * idx,
                  }}
                >
                  <div
                    className="bg-[#111111] border-l-[3px] border-l-p5-red p-4"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 92%, 96% 100%, 0 100%)',
                    }}
                  >
                    {/* File tag */}
                    <div className="font-mono text-[10px] tracking-widest text-p5-red uppercase mb-2">
                      {pub.fileTag}
                    </div>

                    {/* Title */}
                    <div className="font-heading text-sm font-bold uppercase leading-snug mb-1.5 text-white">
                      {pub.title}
                    </div>

                    {/* Venue */}
                    <div className="font-mono text-xs italic text-gray-400 mb-2">
                      {pub.venue}
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <div
                        className="w-[6px] h-[6px] bg-p5-red shrink-0"
                        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                      />
                      <span className="font-mono text-xs text-red-500 uppercase">
                        {pub.status}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {pub.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-2 py-[2px] border border-red-500 text-p5-red uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ──────────────────────────────────────────────
   ABOUT SECTION — "ANARCHIC PRECISION"
   ────────────────────────────────────────────── */
const About = () => {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activePanel, setActivePanel] = useState(null)

  const bioText =
    'Final-year MCA student specializing in IAM & Cybersecurity through Deloitte Cyber Gurukul. Combines full-stack development (Spring Boot, MERN) with published deep learning research and hands-on experience in Okta, SailPoint ISC, and Auth0.'

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 md:py-32 bg-transparent overflow-visible"
    >
      {/* ═══ BACKGROUND SHARDS ═══ */}

      {/* Large diagonal red shard — left */}
      <motion.div
        className="absolute bg-p5-red opacity-[0.04]"
        style={{
          width: '500px',
          height: '800px',
          top: '-10%',
          left: '-5%',
          clipPath: 'polygon(0% 0%, 80% 10%, 100% 100%, 15% 85%)',
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Small red diamond */}
      <motion.div
        className="absolute w-8 h-8 bg-p5-red opacity-20"
        style={{
          top: '15%',
          right: '20%',
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        }}
        initial={{ scale: 0, rotate: -45 }}
        animate={inView ? { scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.3, delay: 0.5 }}
      />

      {/* Horizontal slash lines */}
      <motion.div
        className="absolute bg-p5-red opacity-10 h-[2px]"
        style={{ top: '25%', left: '0', width: '30%', transform: 'rotate(-3deg)' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
      />
      <motion.div
        className="absolute bg-p5-red opacity-10 h-[2px]"
        style={{ bottom: '20%', right: '0', width: '25%', transform: 'rotate(2deg)' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.6 }}
      />

      {/* ═══ CONTENT ═══ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* ─── SECTION HEADER ─── */}
        <div className="relative mb-16 md:mb-24">
          {/* Red backing bar */}
          <motion.div
            className="absolute bg-p5-red"
            style={{
              width: '350px',
              height: '100%',
              top: '0',
              left: '-20px',
              clipPath: 'polygon(3% 0%, 100% 8%, 97% 100%, 0% 90%)',
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
              ABOUT
            </h2>
            <span
              className="font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase pb-2 hidden md:block"
              style={{ transform: 'rotate(-1deg)' }}
            >
              // DOSSIER BRIEF
            </span>
          </motion.div>

          {/* Section ID tag */}
          <motion.div
            className="mt-3 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="w-6 h-px bg-p5-red" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase">
              SEC_02 // CLASSIFIED PROFILE
            </span>
          </motion.div>
        </div>

        {/* ─── BIO + STATS GRID ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Bio container — jagged bordered */}
          <motion.div
            className="lg:col-span-3 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Jagged outer border */}
            <div
              className="absolute inset-0 border-2 border-p5-red opacity-30"
              style={{
                clipPath:
                  'polygon(0% 0%, 15% 2%, 30% 0%, 50% 3%, 70% 0%, 85% 2%, 100% 0%, 100% 98%, 85% 100%, 70% 97%, 50% 100%, 30% 98%, 15% 100%, 0% 97%)',
                transform: 'scale(1.02)',
              }}
            />

            {/* Content */}
            <div className="relative p-6 md:p-10">
              {/* "CLASSIFIED" stamp */}
              <motion.div
                className="absolute top-4 right-4 md:top-6 md:right-6 font-heading text-3xl md:text-4xl text-p5-red opacity-10 select-none"
                style={{ transform: 'rotate(-12deg)' }}
                initial={{ scale: 3, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 0.1 } : {}}
                transition={{ duration: 0.3, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                CLASSIFIED
              </motion.div>

              {/* Terminal-style label */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-p5-red" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                <span className="font-mono text-[9px] tracking-[0.3em] text-p5-red uppercase">
                  SUBJECT BRIEF
                </span>
              </div>

              {/* Bio text — staggered word reveal */}
              <div style={{ transform: 'skewX(-1deg)' }}>
                {bioText.split('. ').map((sentence, idx) => (
                  <motion.p
                    key={idx}
                    className="font-body text-sm md:text-base leading-relaxed text-gray-300 mb-4 last:mb-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.35, delay: 0.5 + idx * 0.15 }}
                  >
                    {sentence}{idx < bioText.split('. ').length - 1 ? '.' : ''}
                  </motion.p>
                ))}
              </div>

              {/* Bottom accent line */}
              <motion.div
                className="mt-8 h-[2px] bg-gradient-to-r from-p5-red via-p5-red to-transparent"
                initial={{ scaleX: 0, originX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
              />

              {/* Corner decorators */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-p5-red" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-p5-red" />
            </div>
          </motion.div>

          {/* Stats column */}
          <div className="lg:col-span-2 flex flex-col gap-6 relative z-50">
            <CgpaBadge
              delay={0.4}
              isOpen={activePanel === 'cgpa'}
              onToggle={() => setActivePanel(activePanel === 'cgpa' ? null : 'cgpa')}
              onHoverStart={() => setActivePanel('cgpa')}
              onHoverEnd={() => setActivePanel(null)}
            />
            <PublicationsBadge
              delay={0.55}
              isOpen={activePanel === 'pubs'}
              onToggle={() => setActivePanel(activePanel === 'pubs' ? null : 'pubs')}
              onHoverStart={() => setActivePanel('pubs')}
              onHoverEnd={() => setActivePanel(null)}
            />

            {/* Special badge — Deloitte (UNCHANGED) */}
            <motion.div
              className="relative group cursor-default"
              initial={{ opacity: 0, x: 40, rotate: 5 }}
              animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                scale: 1.05,
                rotate: -1,
                transition: { duration: 0.15 },
              }}
            >
              {/* Outer shard */}
              <div
                className="absolute inset-0 bg-white transition-all duration-150 group-hover:bg-p5-red"
                style={{
                  clipPath: 'polygon(3% 5%, 100% 0%, 97% 95%, 0% 100%)',
                  transform: 'scale(1.05)',
                }}
              />
              {/* Inner */}
              <div
                className="relative px-6 py-5 md:px-8 md:py-6"
                style={{
                  clipPath: 'polygon(3% 5%, 100% 0%, 97% 95%, 0% 100%)',
                }}
              >
                <div className="font-mono text-[9px] tracking-[0.3em] text-p5-charcoal group-hover:text-white uppercase mb-1 transition-colors duration-150">
                  // ACTIVE PROGRAM
                </div>
                <div
                  className="font-heading text-xl md:text-2xl text-p5-charcoal group-hover:text-white transition-colors duration-150"
                  style={{ transform: 'skewX(-3deg)' }}
                >
                  DELOITTE
                </div>
                <div
                  className="font-mono text-[10px] tracking-[0.15em] text-gray-600 group-hover:text-gray-200 uppercase transition-colors duration-150"
                  style={{ transform: 'skewX(-3deg)' }}
                >
                  CYBER GURUKUL TRAINEE
                </div>
              </div>
            </motion.div>

            {/* System readout */}
            <motion.div
              className="mt-2 space-y-1"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
            >
              {['MCA_FINAL_YEAR', 'IAM_SPECIALIST', 'RESEARCH_ACTIVE'].map((tag, i) => (
                <div key={tag} className="flex items-center gap-2">
                  <motion.div
                    className="w-1 h-1 bg-p5-red"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                  <span className="font-mono text-[8px] tracking-[0.2em] text-gray-600 uppercase">
                    {tag}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══ BOTTOM SECTION DIVIDER ═══ */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-20 bg-p5-charcoal"
        style={{
          clipPath: 'polygon(0 70%, 100% 0%, 100% 100%, 0% 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.0, duration: 0.4 }}
      />
    </section>
  )
}

export default About
