import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from './components/Hero'
import About from './components/About'
import Arsenal from './components/Arsenal'
import CaseFiles from './components/CaseFiles'
import MiniNetworkBar from './components/MiniNetworkBar'
import ExperienceTimeline from './components/ExperienceTimeline'
import Footer from './components/Footer'
import SoundToggle from './components/SoundToggle'
import soundManager from './utils/soundManager'
import DataParticles from './components/DataParticles'

/* ──────────────────────────────────────────────
   BOOT SEQUENCE — Persona 5 style system bootup
   ────────────────────────────────────────────── */
const BootSequence = ({ onComplete }) => {
  const [lines, setLines] = useState([])
  const [done, setDone] = useState(false)

  const bootLines = [
    '> INITIATING SYSTEM...',
    '> LOADING CLASSIFIED DOSSIER...',
    '> DECRYPTING IDENTITY MATRIX...',
    '> SARAN_SHABU.exe FOUND',
    '> BYPASSING SECURITY PROTOCOLS...',
    '> ACCESS GRANTED ████████████',
    '> WELCOME, OPERATOR.',
  ]

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines((prev) => [...prev, bootLines[i]])
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => setDone(true), 400)
        setTimeout(() => onComplete(), 900)
      }
    }, 180)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Scanline effect */}
      <div className="scanline" />

      {/* Red accent bar */}
      <motion.div
        className="absolute top-0 left-0 h-1 bg-p5-red"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: bootLines.length * 0.18 + 0.4, ease: 'linear' }}
      />

      <div className="max-w-2xl w-full px-8">
        {/* System label */}
        <motion.div
          className="mb-6 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-3 h-3 bg-p5-red" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
          <span className="font-mono text-xs tracking-[0.3em] text-p5-red uppercase">
            CLASSIFIED SYSTEM v3.14
          </span>
        </motion.div>

        {/* Terminal lines */}
        <div className="font-mono text-sm space-y-1">
          {lines.map((line, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className={`${
                idx === lines.length - 1 ? 'text-p5-red font-bold' : 'text-gray-400'
              }`}
            >
              {line}
              {idx === lines.length - 1 && (
                <motion.span
                  className="inline-block w-2 h-4 bg-p5-red ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Corner markers */}
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-p5-red" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-p5-red" />
    </motion.div>
  )
}

/* ──────────────────────────────────────────────
   MAIN APPLICATION
   ────────────────────────────────────────────── */
const App = () => {
  const [booted, setBooted] = useState(false)

  /* Initialize AudioContext on first user interaction */
  const handleFirstInteraction = useCallback(() => {
    soundManager.init()
    document.removeEventListener('click', handleFirstInteraction)
    document.removeEventListener('keydown', handleFirstInteraction)
  }, [])

  useEffect(() => {
    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('keydown', handleFirstInteraction)
    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [handleFirstInteraction])

  /* Startup sound when boot completes */
  const handleBootComplete = useCallback(() => {
    setBooted(true)
    setTimeout(() => soundManager.play('startup'), 200)
  }, [])

  return (
    <div className="relative min-h-screen bg-p5-charcoal overflow-x-hidden">
      {/* Persistent noise overlay */}
      <div className="noise-overlay" />

      {/* Global floating embers */}
      <DataParticles />

      {/* Boot sequence */}
      <AnimatePresence>
        {!booted && <BootSequence onComplete={handleBootComplete} />}
      </AnimatePresence>

      {/* Main content — only renders after boot */}
      {booted && (
        <>
          <SoundToggle />
          <motion.main
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Hero />
            <MiniNetworkBar />
            <About />
            <ExperienceTimeline />
            <Arsenal />
            <CaseFiles />
            <Footer />
          </motion.main>
        </>
      )}
    </div>
  )
}

export default App
