/* ──────────────────────────────────────────────
   SOUND MANAGER — Web Audio API Synthesized FX
   Cyberpunk / Persona 5 style UI sounds
   ────────────────────────────────────────────── */

let audioCtx = null
let isMuted = false
let lastPlayed = 0
const DEBOUNCE_MS = 120

/* Lazy-init AudioContext (must be triggered by user gesture) */
function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

/* ─── CORE: debounced play guard ─── */
function canPlay() {
  if (isMuted) return false
  const now = Date.now()
  if (now - lastPlayed < DEBOUNCE_MS) return false
  lastPlayed = now
  return true
}

/* ──────────────────────────────────────────────
   SOUND DEFINITIONS (all synthesized)
   ────────────────────────────────────────────── */

/* 1. HOVER — soft digital tick / UI blip */
function playHover() {
  if (!canPlay()) return
  const ctx = getCtx()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(2400, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.04)

  gain.gain.setValueAtTime(0.06, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.06)
}

/* 2. ACTIVATE — stronger click / system confirm */
function playActivate() {
  if (!canPlay()) return
  const ctx = getCtx()

  // Layer 1: sharp attack
  const osc1 = ctx.createOscillator()
  const gain1 = ctx.createGain()
  osc1.type = 'square'
  osc1.frequency.setValueAtTime(1200, ctx.currentTime)
  osc1.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08)
  gain1.gain.setValueAtTime(0.07, ctx.currentTime)
  gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
  osc1.connect(gain1)
  gain1.connect(ctx.destination)
  osc1.start(ctx.currentTime)
  osc1.stop(ctx.currentTime + 0.1)

  // Layer 2: sub thump
  const osc2 = ctx.createOscillator()
  const gain2 = ctx.createGain()
  osc2.type = 'sine'
  osc2.frequency.setValueAtTime(200, ctx.currentTime)
  osc2.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.06)
  gain2.gain.setValueAtTime(0.08, ctx.currentTime)
  gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
  osc2.connect(gain2)
  gain2.connect(ctx.destination)
  osc2.start(ctx.currentTime)
  osc2.stop(ctx.currentTime + 0.08)
}

/* 3. GLITCH — light glitch / scan for scroll activation */
function playGlitch() {
  if (!canPlay()) return
  const ctx = getCtx()

  // Noise burst via buffer
  const bufferSize = ctx.sampleRate * 0.05 // 50ms
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.3
  }

  const noise = ctx.createBufferSource()
  noise.buffer = buffer

  // Bandpass filter for that digital feel
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 3000
  filter.Q.value = 5

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.08, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06)

  noise.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  noise.start(ctx.currentTime)
  noise.stop(ctx.currentTime + 0.06)
}

/* 4. STARTUP — boot sound (slightly longer, layered) */
function playStartup() {
  if (isMuted) return
  const ctx = getCtx()

  // Ascending tone sweep
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(300, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.2)
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.35)
  gain.gain.setValueAtTime(0.0, ctx.currentTime)
  gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.05)
  gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.2)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.4)

  // Second confirmatory beep
  const osc2 = ctx.createOscillator()
  const gain2 = ctx.createGain()
  osc2.type = 'triangle'
  osc2.frequency.setValueAtTime(1000, ctx.currentTime + 0.25)
  gain2.gain.setValueAtTime(0.0, ctx.currentTime)
  gain2.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.27)
  gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)
  osc2.connect(gain2)
  gain2.connect(ctx.destination)
  osc2.start(ctx.currentTime + 0.25)
  osc2.stop(ctx.currentTime + 0.5)
}

/* 5. SECTION ENTER — glitch sweep for section transitions */
function playSectionEnter() {
  if (!canPlay()) return
  const ctx = getCtx()

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(400, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.06)
  osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.12)
  gain.gain.setValueAtTime(0.04, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.15)
}

/* ──────────────────────────────────────────────
   PUBLIC API
   ────────────────────────────────────────────── */
const soundManager = {
  play(type) {
    try {
      switch (type) {
        case 'hover':
          playHover()
          break
        case 'activate':
          playActivate()
          break
        case 'glitch':
          playGlitch()
          break
        case 'startup':
          playStartup()
          break
        case 'sectionEnter':
          playSectionEnter()
          break
        default:
          break
      }
    } catch {
      // Silently ignore audio errors
    }
  },

  mute() {
    isMuted = true
  },

  unmute() {
    isMuted = false
  },

  toggle() {
    isMuted = !isMuted
    return !isMuted // returns new "isSoundOn" state
  },

  get isMuted() {
    return isMuted
  },

  /* Initialize on first user interaction */
  init() {
    getCtx()
  },
}

export default soundManager
