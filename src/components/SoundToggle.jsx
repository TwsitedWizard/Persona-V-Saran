import { useState } from 'react'
import { motion } from 'framer-motion'
import soundManager from '../utils/soundManager'

/* ──────────────────────────────────────────────
   SOUND TOGGLE — Global mute/unmute button
   Top-right corner, Persona 5 style
   ────────────────────────────────────────────── */
const SoundToggle = () => {
  const [isOn, setIsOn] = useState(true)

  const handleToggle = () => {
    const newState = soundManager.toggle()
    setIsOn(newState)
    if (newState) {
      soundManager.play('activate')
    }
  }

  return (
    <motion.button
      onClick={handleToggle}
      className="fixed top-5 right-5 z-[9999] group cursor-pointer outline-none border-none"
      initial={{ opacity: 0, scale: 0, rotate: -15 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.1, rotate: 3, transition: { duration: 0.1 } }}
      whileTap={{ scale: 0.9 }}
      aria-label={isOn ? 'Mute sounds' : 'Unmute sounds'}
      title={isOn ? 'Sound ON — click to mute' : 'Sound OFF — click to unmute'}
    >
      {/* Outer shard */}
      <div
        className={`absolute inset-0 transition-colors duration-150 ${
          isOn ? 'bg-p5-red/80 group-hover:bg-p5-red' : 'bg-gray-700/80 group-hover:bg-gray-600'
        }`}
        style={{
          clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
          transform: 'scale(1.08)',
        }}
      />

      {/* Inner */}
      <div
        className="relative bg-p5-charcoal border border-gray-700 group-hover:border-p5-red/50 transition-colors duration-150 px-3 py-2"
        style={{
          clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
        }}
      >
        <div className="flex items-center gap-1.5">
          {/* Speaker icon (text-based for zero deps) */}
          <span className="text-xs">
            {isOn ? '🔊' : '🔇'}
          </span>
          <span className="font-mono text-[7px] tracking-[0.2em] text-gray-400 uppercase hidden md:inline">
            {isOn ? 'SFX' : 'MUTE'}
          </span>
        </div>
      </div>
    </motion.button>
  )
}

export default SoundToggle
