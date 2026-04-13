import { useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'

/* ──────────────────────────────────────────────
   SKILL DATA
   ────────────────────────────────────────────── */
const skillGroups = [
  {
    category: 'SECURITY & IAM',
    skills: ['SailPoint ISC', 'Okta', 'Auth0', 'Identity Governance'],
    accent: 'bg-p5-red',
    textColor: 'text-white',
    hoverAccent: 'hover:bg-white hover:text-p5-charcoal',
  },
  {
    category: 'FRAMEWORKS',
    skills: ['Spring Boot', 'React.js', 'Node.js', 'Tailwind CSS'],
    accent: 'bg-white',
    textColor: 'text-black',
    hoverAccent: 'hover:bg-p5-red hover:text-white',
  },
  {
    category: 'AI / ML',
    skills: ['Deep Learning', 'Computer Vision', 'Gemini API'],
    accent: 'bg-p5-red',
    textColor: 'text-white',
    hoverAccent: 'hover:bg-white hover:text-p5-charcoal',
  },
]

/* ──────────────────────────────────────────────
   SKILL TAG — Floating angled shard
   ────────────────────────────────────────────── */
const SkillTag = ({ name, baseRotate, delay, accentClass, hoverClass, textClass = 'text-white' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      className={`
        relative inline-block cursor-default select-none
        font-mono text-xs md:text-sm font-bold tracking-wider uppercase
        px-5 py-3 md:px-6 md:py-3
        ${textClass} transition-all duration-150
        ${hoverClass}
      `}
      style={{
        clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
        transform: `rotate(${baseRotate}deg)`,
        backgroundColor: 'transparent',
      }}
      initial={{ opacity: 0, scale: 0, rotate: baseRotate + 20 }}
      animate={
        inView
          ? { opacity: 1, scale: 1, rotate: baseRotate }
          : {}
      }
      transition={{
        duration: 0.35,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        scale: 1.15,
        rotate: 0,
        zIndex: 50,
        transition: { duration: 0.12 },
      }}
    >
      {/* Shard background */}
      <div
        className={`absolute inset-0 ${accentClass} opacity-90`}
        style={{
          clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
        }}
      />
      <span className="relative z-10">{name}</span>
    </motion.div>
  )
}

/* ──────────────────────────────────────────────
   CATEGORY LABEL
   ────────────────────────────────────────────── */
const CategoryLabel = ({ name, delay }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      className="mb-4 flex items-center gap-3"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.3, delay }}
    >
      <div
        className="w-3 h-3 bg-p5-red"
        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
      />
      <span
        className="font-heading text-lg md:text-xl tracking-wider text-p5-red"
        style={{ transform: 'skewX(-5deg)' }}
      >
        {name}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-p5-red/30 to-transparent" />
    </motion.div>
  )
}

/* ──────────────────────────────────────────────
   ARSENAL SECTION (SKILLS)
   ────────────────────────────────────────────── */
const Arsenal = () => {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  /* Randomized rotation spread */
  const rotations = useMemo(
    () =>
      skillGroups.flatMap((g) =>
        g.skills.map(() => (Math.random() - 0.5) * 8)
      ),
    []
  )

  let tagIndex = 0

  return (
    <section
      id="arsenal"
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 md:py-32 bg-p5-charcoal overflow-hidden"
    >
      {/* ═══ BACKGROUND ELEMENTS ═══ */}

      {/* Large "ARSENAL" watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[15vw] text-white opacity-[0.02] select-none pointer-events-none whitespace-nowrap"
        style={{ transform: 'translate(-50%,-50%) rotate(-5deg) skewX(-5deg)' }}
      >
        ARSENAL
      </div>

      {/* Diagonal slash */}
      <motion.div
        className="absolute bg-p5-red opacity-[0.06]"
        style={{
          width: '120%',
          height: '3px',
          top: '40%',
          left: '-10%',
          transform: 'rotate(-4deg)',
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      />

      {/* Grid dots */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #FF0000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ═══ CONTENT ═══ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* ─── SECTION HEADER ─── */}
        <div className="relative mb-16 md:mb-24">
          <motion.div
            className="absolute bg-p5-red"
            style={{
              width: '400px',
              height: '100%',
              top: '0',
              left: '-20px',
              clipPath: 'polygon(2% 0%, 100% 6%, 98% 100%, 0% 92%)',
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
              ARSENAL
            </h2>
            <span
              className="font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase pb-2 hidden md:block"
              style={{ transform: 'rotate(-1deg)' }}
            >
              // WEAPONS CACHE
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
              SEC_03 // TECH INVENTORY
            </span>
          </motion.div>
        </div>

        {/* ─── SKILL GROUPS ─── */}
        <div className="space-y-14 md:space-y-20">
          {skillGroups.map((group, gIdx) => {
            const groupStartIndex = tagIndex

            return (
              <div key={group.category}>
                <CategoryLabel
                  name={group.category}
                  delay={0.2 + gIdx * 0.15}
                />

                {/* Floating tag cloud */}
                <div className="flex flex-wrap gap-3 md:gap-4 pl-2 md:pl-6">
                  {group.skills.map((skill, sIdx) => {
                    const currentIdx = groupStartIndex + sIdx
                    tagIndex++
                    return (
                      <SkillTag
                        key={skill}
                        name={skill}
                        baseRotate={rotations[currentIdx] || 0}
                        delay={0.3 + currentIdx * 0.08}
                        accentClass={group.accent}
                        hoverClass={group.hoverAccent}
                        textClass={group.textColor}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* ─── BOTTOM SYSTEM NOTE ─── */}
        <motion.div
          className="mt-20 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="w-2 h-2 bg-p5-red"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase">
            ARSENAL LOADED // {skillGroups.reduce((a, g) => a + g.skills.length, 0)} ITEMS INDEXED
          </span>
        </motion.div>
      </div>

      {/* ═══ BOTTOM DIVIDER ═══ */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-20 bg-transparent"
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

export default Arsenal
