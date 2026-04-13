import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import heroCharacter from '../assets/hero-character.png'

/* ──────────────────────────────────────────────
   GEOMETRIC SHARD COMPONENTS
   ────────────────────────────────────────────── */
const RedShard = ({ className, style, delay = 0 }) => (
  <motion.div
    className={`absolute bg-p5-red ${className}`}
    style={style}
    initial={{ scale: 0, rotate: -30, opacity: 0 }}
    animate={{ scale: 1, rotate: 0, opacity: 1 }}
    transition={{
      duration: 0.4,
      delay,
      ease: [0.16, 1, 0.3, 1],
    }}
  />
)

const DarkShard = ({ className, style, delay = 0 }) => (
  <motion.div
    className={`absolute bg-p5-dark ${className}`}
    style={style}
    initial={{ scaleX: 0, opacity: 0 }}
    animate={{ scaleX: 1, opacity: 1 }}
    transition={{
      duration: 0.35,
      delay,
      ease: [0.16, 1, 0.3, 1],
    }}
  />
)

/* ──────────────────────────────────────────────
   ANIMATED LINE DECORATOR
   ────────────────────────────────────────────── */
const SlashLine = ({ direction = 'left', delay = 0 }) => (
  <motion.div
    className="absolute bg-p5-red"
    style={{
      width: direction === 'left' ? '120px' : '80px',
      height: '3px',
      transform: `rotate(${direction === 'left' ? '-12deg' : '12deg'})`,
    }}
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 0.3, delay, ease: [0.16, 1, 0.3, 1] }}
  />
)

/* ──────────────────────────────────────────────
   STATUS INDICATOR
   ────────────────────────────────────────────── */
const StatusBlock = ({ label, value, delay = 0 }) => (
  <motion.div
    className="flex items-center gap-2"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.25, delay, ease: 'easeOut' }}
  >
    <div
      className="w-2 h-2 bg-p5-red"
      style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
    />
    <span className="font-mono text-[10px] tracking-[0.2em] text-gray-500 uppercase">
      {label}
    </span>
    <span className="font-mono text-[10px] tracking-wider text-p5-red">
      {value}
    </span>
  </motion.div>
)

/* ──────────────────────────────────────────────
   HERO SECTION
   ────────────────────────────────────────────── */
const Hero = () => {
  const [glitchActive, setGlitchActive] = useState(false)

  /* Periodic glitch burst */
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 150)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* ═══ BACKGROUND GEOMETRIC CHAOS ═══ */}

      {/* Large red diagonal panel — top right */}
      <RedShard
        className="w-[600px] h-[700px] opacity-10"
        style={{
          top: '-10%',
          right: '-5%',
          clipPath: 'polygon(20% 0%, 100% 0%, 100% 80%, 0% 100%)',
        }}
        delay={0.2}
      />

      {/* Thin red slash — mid left */}
      <RedShard
        className="w-[400px] h-[6px]"
        style={{
          top: '30%',
          left: '-5%',
          transform: 'rotate(-8deg)',
          opacity: 0.6,
        }}
        delay={0.5}
      />

      {/* Dark shard overlay */}
      <DarkShard
        className="w-[500px] h-[300px]"
        style={{
          bottom: '10%',
          left: '-10%',
          clipPath: 'polygon(0 0, 100% 15%, 90% 100%, 5% 85%)',
          opacity: 0.5,
        }}
        delay={0.3}
      />

      {/* Abstract red shard — bottom right */}
      <RedShard
        className="w-[300px] h-[400px] opacity-[0.07]"
        style={{
          bottom: '-5%',
          right: '15%',
          clipPath: 'polygon(10% 0%, 100% 10%, 85% 100%, 0% 90%)',
        }}
        delay={0.4}
      />

      {/* Small floating shards */}
      <RedShard
        className="w-16 h-16 opacity-20"
        style={{
          top: '20%',
          right: '25%',
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        }}
        delay={0.7}
      />
      <RedShard
        className="w-10 h-10 opacity-15"
        style={{
          top: '60%',
          left: '20%',
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          transform: 'rotate(45deg)',
        }}
        delay={0.9}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-p5-red to-transparent opacity-30"
        animate={{ top: ['-5%', '105%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      />

      {/* ═══ MAIN CONTENT AREA ═══ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="relative">

          {/* ─── TOP SYSTEM BAR ─── */}
          <motion.div
            className="flex items-center justify-between mb-8 md:mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-p5-red" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
              <span className="font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase">
                DOSSIER // ACTIVE
              </span>
            </div>
            <motion.div
              className="font-mono text-[10px] tracking-[0.2em] text-gray-600"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ■ SYSTEM ONLINE
            </motion.div>
          </motion.div>

          {/* ─── LARGE RED BACKING SHAPE BEHIND NAME ─── */}
          <motion.div
            className="absolute bg-p5-red"
            style={{
              width: '110%',
              height: '65%',
              top: '15%',
              left: '-5%',
              clipPath: 'polygon(3% 0%, 100% 5%, 97% 100%, 0% 92%)',
              zIndex: 0,
            }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* ─── NAME: SARAN ─── */}
          <div className="relative z-20">
            <motion.h1
              className="font-heading leading-[0.85] select-none"
              style={{
                fontSize: 'clamp(80px, 15vw, 200px)',
                transform: 'rotate(-2deg) skewX(-3deg)',
                letterSpacing: '-0.02em',
              }}
              initial={{ x: '-120%', skewX: '-20deg', opacity: 0 }}
              animate={{ x: 0, skewX: '-3deg', opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span
                className={`relative inline-block ${glitchActive ? 'animate-glitch' : ''}`}
                data-text="SARAN"
              >
                SARAN
              </span>
            </motion.h1>

            {/* ─── NAME: SHABU ─── */}
            <motion.h1
              className="font-heading leading-[0.85] select-none"
              style={{
                fontSize: 'clamp(80px, 15vw, 200px)',
                transform: 'rotate(-2deg) skewX(-3deg)',
                letterSpacing: '-0.02em',
                marginTop: '-0.05em',
              }}
              initial={{ x: '120%', skewX: '20deg', opacity: 0 }}
              animate={{ x: 0, skewX: '-3deg', opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span
                className={`relative inline-block text-p5-charcoal ${glitchActive ? 'animate-glitch' : ''}`}
                style={{
                  WebkitTextStroke: '3px #FFFFFF',
                }}
                data-text="SHABU"
              >
                SHABU
              </span>
            </motion.h1>

            {/* ─── TAGLINE ─── */}
            <motion.div
              className="mt-6 md:mt-8 relative"
              style={{ transform: 'rotate(-1deg)' }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 1.0,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Tagline shard background */}
              <div
                className="absolute inset-0 bg-p5-dark"
                style={{
                  clipPath: 'polygon(2% 0%, 100% 5%, 98% 100%, 0% 90%)',
                  transform: 'scaleX(1.05) scaleY(1.3)',
                }}
              />
              <div className="relative px-4 py-3 md:px-6 md:py-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span
                  className="font-mono text-xs md:text-sm font-bold tracking-wider text-p5-red uppercase"
                  style={{ transform: 'skewX(-3deg)' }}
                >
                  IAM & Cybersecurity Trainee
                </span>
                <span className="text-gray-600 font-bold text-lg" style={{ transform: 'rotate(12deg)' }}>
                  /
                </span>
                <span
                  className="font-mono text-xs md:text-sm font-bold tracking-wider text-white uppercase"
                  style={{ transform: 'skewX(-3deg)' }}
                >
                  Full-Stack Developer
                </span>
                <span className="text-gray-600 font-bold text-lg" style={{ transform: 'rotate(12deg)' }}>
                  /
                </span>
                <span
                  className="font-mono text-xs md:text-sm font-bold tracking-wider text-p5-red uppercase"
                  style={{ transform: 'skewX(-3deg)' }}
                >
                  Research Scholar
                </span>
              </div>
            </motion.div>

            {/* ─── LOCATION TAG ─── */}
            <motion.div
              className="mt-4 flex items-center gap-2"
              style={{ transform: 'rotate(-1deg)' }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1.2 }}
            >
              <div className="w-1.5 h-1.5 bg-p5-red" />
              <span className="font-mono text-[10px] md:text-xs tracking-[0.15em] text-gray-400 uppercase">
                Kozhikode, Kerala, India
              </span>
            </motion.div>
          </div>

          {/* ─── RIGHT SIDE STATUS PANEL ─── */}
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-20"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.3 }}
          >
            {/* Vertical dashed line */}
            <div className="absolute -left-6 top-0 h-full w-px border-l border-dashed border-gray-700" />

            <StatusBlock label="STATUS" value="ACTIVE" delay={1.4} />
            <StatusBlock label="CLEARANCE" value="LVL-5" delay={1.5} />
            <StatusBlock label="SECTOR" value="// CYBER" delay={1.6} />
            <StatusBlock label="THREAT" value="NONE" delay={1.7} />

            {/* Pulsing dot */}
            <motion.div
              className="mt-2 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(34,197,94,0.4)',
                    '0 0 0 6px rgba(34,197,94,0)',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="font-mono text-[9px] tracking-widest text-green-500 uppercase">
                ONLINE
              </span>
            </motion.div>
          </motion.div>

          {/* ─── BOTTOM DECORATIVE ELEMENTS ─── */}
          <motion.div
            className="mt-12 md:mt-16 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.4 }}
          >
            {/* Scroll indicator */}
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-px h-8 bg-gradient-to-b from-p5-red to-transparent" />
              <div
                className="w-3 h-3 border-b-2 border-r-2 border-p5-red"
                style={{ transform: 'rotate(45deg)' }}
              />
            </motion.div>
            <span className="font-mono text-[9px] tracking-[0.3em] text-gray-600 uppercase">
              SCROLL TO BREACH
            </span>
          </motion.div>

          {/* ─── HERO CHARACTER (RIGHT SIDE) ─── */}
          <div className="hero-character-glow" />
          <motion.div
            className="hero-character-container"
            initial={{ x: 80, y: '-50%', opacity: 0 }}
            animate={{ x: 0, y: '-50%', opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
              delay: 0.2
            }}
          >
            <motion.img
              src={heroCharacter}
              alt="Character"
              animate={{ x: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </div>

      {/* ═══ EDGE DECORATORS ═══ */}

      {/* Top-left corner bracket */}
      <motion.div
        className="absolute top-6 left-6 z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.2 }}
      >
        <div className="w-10 h-10 border-t-2 border-l-2 border-p5-red" />
      </motion.div>

      {/* Bottom-right corner bracket */}
      <motion.div
        className="absolute bottom-6 right-6 z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.2 }}
      >
        <div className="w-10 h-10 border-b-2 border-r-2 border-p5-red" />
      </motion.div>

      {/* Side red accent strip */}
      <motion.div
        className="absolute left-0 top-0 w-1 h-full bg-p5-red opacity-30"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'top' }}
      />

      {/* Bottom slash separator */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-24 bg-transparent"
        style={{
          clipPath: 'polygon(0 60%, 100% 0%, 100% 100%, 0% 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.4 }}
      />
    </section>
  )
}

export default Hero
