import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import ProjectCard from './ProjectCard'
import soundManager from '../utils/soundManager'

/* ──────────────────────────────────────────────
   PROJECT DATA — 12 DOSSIERS
   ────────────────────────────────────────────── */
const projects = [
  {
    caseNumber: 1,
    title: 'NEXUSSEARCH',
    tech: ['Spring Boot', 'Gemini API', 'Google Search API'],
    description:
      'Full-stack conversational search engine eliminating hallucinations through real-time source verification and grounded responses.',
    status: 'OPERATIONAL',
    bgImage: '/assets/projects/nexussearch.png',
  },
  {
    caseNumber: 2,
    title: 'VATTELUTHU OCR',
    tech: ['Python', 'Deep Learning', 'Computer Vision'],
    description:
      'AI-driven OCR system for digitizing and interpreting ancient Malayalam Vatteluthu scripts.',
    status: 'IN PROGRESS',
    bgImage: '/assets/projects/vatteluthu.png',
  },
  {
    caseNumber: 3,
    title: 'MURAL RESTORATION',
    tech: ['Python', 'Deep Learning'],
    description:
      'Deep learning system for reconstructing degraded ancient mural text using image restoration techniques.',
    status: 'IN PROGRESS',
    bgImage: '/assets/projects/mural.png',
  },
  {
    caseNumber: 4,
    title: 'COMMITGENIE',
    tech: ['Python', 'Gemini API'],
    description:
      'CLI tool that generates context-aware Git commit messages from staged code diffs.',
    status: 'OPERATIONAL',
    bgImage: '/assets/projects/commitgenie.png',
  },
  {
    caseNumber: 5,
    title: 'TREERINGNET',
    tech: ['Python', 'CNN', 'Deep Learning'],
    description:
      'CNN-based model for predicting tree age from ring images with over 90% accuracy.',
    status: 'OPERATIONAL',
    bgImage: '/assets/projects/treeringnet.png',
  },
  {
    caseNumber: 6,
    title: 'EVENT PLATFORM',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    description:
      'Full-stack MERN platform for managing event proposals and bookings with real-time interactions.',
    status: 'OPERATIONAL',
    bgImage: '/assets/projects/eventplatform.png',
  },
  {
    caseNumber: 7,
    title: 'GIGNEST',
    tech: ['PHP', 'MySQL', 'JavaScript'],
    description:
      'Freelancer marketplace with service listings and e-commerce functionality.',
    status: 'OPERATIONAL',
    bgImage: '/assets/projects/gignest.png',
  },
  {
    caseNumber: 8,
    title: 'AUTOWASH',
    tech: ['PHP', 'MySQL', 'PHPMailer'],
    description:
      'Car service booking platform with automated email notification system.',
    status: 'OPERATIONAL',
    bgImage: '/assets/projects/autowash.png',
  },
  {
    caseNumber: 9,
    title: 'LEGENDARY AUTO',
    tech: ['PHP', 'MySQL', 'JavaScript'],
    description:
      'Vehicle purchase platform focused on seamless UX and transaction flow.',
    status: 'OPERATIONAL',
    bgImage: '/assets/projects/legendaryauto.png',
  },
  {
    caseNumber: 10,
    title: 'FC MANAGER',
    tech: ['C#', 'WinForms', 'SQL'],
    description:
      'Desktop application for managing football club operations and player data.',
    status: 'OPERATIONAL',
    bgImage: '/assets/projects/fcmanager.png',
  },
  {
    caseNumber: 11,
    title: 'BANKAPP',
    tech: ['Android Studio', 'SQLite'],
    description:
      'Mobile banking app supporting authentication and transaction handling.',
    status: 'OPERATIONAL',
    bgImage: '/assets/projects/bankapp.png',
  },
  {
    caseNumber: 12,
    title: 'ROADTRIP SYS',
    tech: ['Java', 'JSP', 'Apache'],
    description:
      'Web-based system for planning and registering road trips with backend logic.',
    status: 'OPERATIONAL',
    bgImage: '/assets/projects/roadtrip.png',
  },
]

/* ──────────────────────────────────────────────
   CASE FILES SECTION (PROJECTS)
   ────────────────────────────────────────────── */
const CaseFiles = () => {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const sectionEnterFired = useRef(false)

  const featuredProjects = projects.slice(0, 4)
  const archiveProjects = projects.slice(4)

  useEffect(() => {
    if (inView && !sectionEnterFired.current) {
      sectionEnterFired.current = true
      soundManager.play('sectionEnter')
    }
  }, [inView])

  return (
    <section
      id="casefiles"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-transparent overflow-hidden"
    >
      {/* ═══ BACKGROUND ═══ */}

      {/* Large faded watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[12vw] text-white opacity-[0.015] select-none pointer-events-none whitespace-nowrap"
        style={{ transform: 'translate(-50%,-50%) rotate(3deg) skewX(-5deg)' }}
      >
        CLASSIFIED
      </div>

      {/* Diagonal red shard — right */}
      <motion.div
        className="absolute bg-p5-red opacity-[0.04]"
        style={{
          width: '400px',
          height: '600px',
          top: '10%',
          right: '-5%',
          clipPath: 'polygon(20% 0%, 100% 5%, 80% 100%, 0% 90%)',
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
            'linear-gradient(rgba(255,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* ═══ CONTENT ═══ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* ─── SECTION HEADER ─── */}
        <div className="relative mb-16 md:mb-24">
          <motion.div
            className="absolute bg-p5-red"
            style={{
              width: '480px',
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
              className="font-heading text-5xl md:text-7xl lg:text-9xl text-white leading-none"
              style={{ transform: 'rotate(-2deg) skewX(-3deg)' }}
            >
              CASE FILES
            </h2>
            <span
              className="font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase pb-2 hidden md:block"
              style={{ transform: 'rotate(-1deg)' }}
            >
              // MISSION ARCHIVE
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
              SEC_04 // {projects.length} DOSSIERS ON FILE
            </span>
          </motion.div>
        </div>

        {/* ─── FEATURED DOSSIERS ─── */}
        <div className="space-y-8 md:space-y-12">
          {featuredProjects.map((project, idx) => (
            <ProjectCard
              key={project.caseNumber}
              title={project.title}
              tech={project.tech}
              description={project.description}
              status={project.status}
              caseNumber={project.caseNumber}
              index={idx}
              bgImage={project.bgImage}
            />
          ))}
        </div>

        {/* ─── CLASSIFIED ARCHIVE ─── */}
        <div className="mt-24 md:mt-32 relative">
          {/* ARCHIVE HEADER */}
          <div className="relative mb-8 md:mb-12">
            <motion.div
              className="absolute bg-p5-red"
              style={{
                width: '320px',
                height: '100%',
                top: '0',
                left: '-20px',
                clipPath: 'polygon(2% 0%, 100% 5%, 98% 100%, 0% 93%)',
                zIndex: 0,
              }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="relative z-10 flex flex-col md:flex-row items-baseline gap-2 md:gap-4 pl-2"
              initial={{ x: -40, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3
                className="font-heading text-3xl md:text-5xl text-white leading-none"
                style={{ transform: 'rotate(-3deg) skewX(-2deg)' }}
              >
                ARCHIVE
              </h3>
              <span
                className="font-mono text-[9px] tracking-[0.2em] text-gray-500 uppercase pb-1"
                style={{ transform: 'rotate(-1deg)' }}
              >
                // CLASSIFIED PROJECTS
              </span>
            </motion.div>
          </div>

          {/* SCROLL TO DECRYPT OVERLAY */}
          <motion.div 
            className="hidden md:flex absolute right-0 -top-8 items-center gap-2 text-p5-red font-mono text-[10px] tracking-[0.2em] uppercase origin-right"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <span>SCROLL TO DECRYPT</span>
            <motion.span
              animate={{ x: [0, 5, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </motion.div>

          {/* ARCHIVE SCROLL STRIP */}
          <div 
            className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory archive-scrollbar"
            style={{ 
              scrollbarWidth: 'thin',
              scrollbarColor: '#FF0000 #111111'
            }}
          >
            {archiveProjects.map((project, idx) => (
              <motion.div
                key={project.caseNumber}
                className="relative flex-none w-[220px] md:w-[280px] h-[160px] bg-[#111111] border border-red-500/20 group snap-start cursor-pointer transition-transform duration-300 hover:scale-105"
                style={{
                  clipPath: 'polygon(0% 0%, 95% 0%, 100% 10%, 100% 100%, 5% 100%, 0% 90%)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + (idx * 0.1) }}
                onClick={() => {
                  soundManager.play('menuClick')
                }}
                onMouseEnter={() => {
                  soundManager.play('hover')
                }}
              >
                {/* BG Image Reveal */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-25 transition-opacity duration-500"
                  style={{ backgroundImage: `url(${project.bgImage})` }}
                />
                
                {/* Content */}
                <div className="relative z-10 p-4 flex flex-col h-full justify-between pointer-events-none">
                  <div>
                    <div className="font-mono text-[9px] text-p5-red tracking-widest mb-1.5 opacity-80">
                      CASE-{(project.caseNumber < 10 ? '00' : '0')}
                      {project.caseNumber}
                    </div>
                    <div className="font-heading text-lg md:text-xl text-white uppercase leading-tight line-clamp-2 shadow-sm">
                      {project.title}
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tech.slice(0, 3).map((t, i) => (
                      <span key={i} className="font-mono text-[8px] tracking-wider text-p5-red border border-p5-red/30 px-1.5 py-[1px] uppercase whitespace-nowrap bg-black/50">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="font-mono text-[8px] text-gray-500">+{project.tech.length - 3}</span>
                    )}
                  </div>

                  {/* Hover Overlay Text */}
                  <div className="absolute bottom-4 right-4 font-mono text-[10px] text-white tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                    ACCESS FILE <span className="text-p5-red">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── END-OF-FILE MARKER ─── */}
        <motion.div
          className="mt-20 md:mt-28 pt-8 border-t border-gray-800"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 bg-p5-red"
                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
              />
              <span className="font-mono text-[9px] tracking-[0.3em] text-gray-500 uppercase">
                END OF CLASSIFIED DOSSIER
              </span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-1.5 h-1.5 bg-p5-red"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="font-mono text-[8px] tracking-[0.2em] text-gray-600 uppercase">
                © 2025 SARAN SHABU // ALL INTEL RESERVED
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CaseFiles
