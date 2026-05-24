import { useRef, useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { ScrollingFigure, POSE_SEQUENCE } from '../components/ScrollingFigure'
import { MobilePoseFigure } from '../components/MobilePoseFigure'
import { EmailSignup } from '../components/EmailSignup'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

// Section IDs for scroll navigation
const SECTION_IDS = ['section-hero', 'section-pistol', 'section-muscleup', 'section-frontlever', 'section-planche', 'section-signup']

// Fixed scroll navigation button (down only)
function FixedScrollNav({ currentSectionIndex, isHidden }: { currentSectionIndex: number; isHidden: boolean }) {
  const canGoDown = currentSectionIndex < SECTION_IDS.length - 1

  const scrollToNext = useCallback(() => {
    const targetIndex = currentSectionIndex + 1
    if (targetIndex < SECTION_IDS.length) {
      const target = document.getElementById(SECTION_IDS[targetIndex])
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [currentSectionIndex])

  // Hide if past journey sections or at last section
  if (!canGoDown || isHidden) return null

  return (
    <button 
      className="fixed-scroll-button fixed-scroll-down"
      onClick={scrollToNext}
      aria-label="Scroll to next section"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 5v14M5 12l7 7 7-7"/>
      </svg>
    </button>
  )
}

export function Component() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"]
  })
  
  // Update state when scroll changes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest)
    // Calculate which section we're in based on scroll progress
    // Use POSE_SEQUENCE.length (5) for pose sections, not SECTION_IDS.length (6)
    const poseSectionCount = POSE_SEQUENCE.length
    const sectionIndex = Math.min(
      Math.floor(latest * poseSectionCount),
      poseSectionCount - 1
    )
    setCurrentSectionIndex(sectionIndex)
  })

  // Determine if figure should be on left or right based on scroll
  // Pattern: left, right, left, right, left (alternating)
  const figureOnRight = currentSectionIndex % 2 === 1
  
  // Hide figure when scrolled past the scroll-journey container
  // We check if the bottom of the scroll-journey container is above the viewport
  const [figureHidden, setFigureHidden] = useState(false)
  
  useEffect(() => {
    const checkScrollPosition = () => {
      if (scrollContainerRef.current) {
        const rect = scrollContainerRef.current.getBoundingClientRect()
        // Hide figure when the scroll-journey container's bottom enters the top half of viewport
        // This ensures figure is hidden before signup content is fully visible
        const viewportHeight = window.innerHeight
        const isJourneyPassed = rect.bottom < viewportHeight * 0.7
        // Also hide when near the bottom of the page (within 100px of footer)
        const isAtPageBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 100
        setFigureHidden(isJourneyPassed || isAtPageBottom)
      }
    }
    
    window.addEventListener('scroll', checkScrollPosition)
    checkScrollPosition() // Initial check
    
    return () => window.removeEventListener('scroll', checkScrollPosition)
  }, [])

  return (
    <div className="home">
      {/* Fixed scroll navigation */}
      <FixedScrollNav currentSectionIndex={currentSectionIndex} isHidden={figureHidden} />
      
      {/* Scroll-linked section with zig-zagging figure */}
      <div className="scroll-journey" ref={scrollContainerRef}>
        {/* Figure container - switches sides based on scroll, hides when past journey */}
        {/* Only shown on desktop (1024px+), hidden on mobile via CSS */}
        <div className={`sticky-figure-container ${figureOnRight ? 'figure-right' : 'figure-left'} ${figureHidden ? 'figure-hidden' : ''}`}>
          <ScrollingFigure scrollProgress={scrollProgress} />
          
          {/* Scroll progress indicator */}
          <div className="scroll-progress-track">
            {POSE_SEQUENCE.map((pose, index) => (
              <button 
                key={pose.name}
                className={`progress-dot ${scrollProgress >= index / (POSE_SEQUENCE.length - 1) ? 'active' : ''}`}
                onClick={() => {
                  const target = document.getElementById(SECTION_IDS[index])
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
                aria-label={`Go to ${pose.label}`}
              />
            ))}
            <motion.div 
              className="progress-fill"
              style={{ scaleY: scrollProgress }}
            />
          </div>
        </div>
        
        {/* Scrolling content sections - switch sides opposite to figure */}
        <div className="scroll-content">
          {/* Section 1: Hero / Vitruvian - content on RIGHT */}
          <section id="section-hero" className="scroll-section content-right">
            {/* Mobile-only figure */}
            <div className="mobile-figure-wrapper">
              <MobilePoseFigure pose="vitruvian" size={260} />
            </div>
            <motion.div 
              className="section-content"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1 className="hero-title" variants={fadeInUp}>
                Master Your Body.<br />
                <span className="hero-highlight">Not by Force.</span>
              </motion.h1>
              <motion.p className="hero-subtitle" variants={fadeInUp}>
                One year. Five skills. A complete transformation in how you 
                move, train, and understand your body.
              </motion.p>
            </motion.div>
          </section>

          {/* Section 2: Pistol Squat - content on LEFT */}
          <section id="section-pistol" className="scroll-section content-left">
            <div className="mobile-figure-wrapper">
              <MobilePoseFigure pose="pistol" size={260} />
            </div>
            <motion.div 
              className="section-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={staggerContainer}
            >
              <motion.span className="section-number" variants={fadeInUp}>01</motion.span>
              <motion.h2 variants={fadeInUp}>Pistol Squat</motion.h2>
              <motion.p className="section-principle" variants={fadeInUp}>
                "Taking the brakes off"
              </motion.p>
              <motion.p variants={fadeInUp}>
                Single-leg mastery isn't about strength—it's about releasing 
                the tension patterns that prevent you from sinking into full depth.
              </motion.p>
            </motion.div>
          </section>

          {/* Section 3: Muscle-Up - content on RIGHT */}
          <section id="section-muscleup" className="scroll-section content-right">
            <div className="mobile-figure-wrapper">
              <MobilePoseFigure pose="muscleup" size={260} />
            </div>
            <motion.div 
              className="section-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={staggerContainer}
            >
              <motion.span className="section-number" variants={fadeInUp}>02</motion.span>
              <motion.h2 variants={fadeInUp}>Muscle-Up</motion.h2>
              <motion.p className="section-principle" variants={fadeInUp}>
                "Pull-press, not up-down"
              </motion.p>
              <motion.p variants={fadeInUp}>
                The transition isn't a pull followed by a push. It's one 
                continuous motion where your body swings through the bar.
              </motion.p>
            </motion.div>
          </section>

          {/* Section 4: Front Lever - content on LEFT */}
          <section id="section-frontlever" className="scroll-section content-left">
            <div className="mobile-figure-wrapper">
              <MobilePoseFigure pose="frontlever" size={260} />
            </div>
            <motion.div 
              className="section-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={staggerContainer}
            >
              <motion.span className="section-number" variants={fadeInUp}>03</motion.span>
              <motion.h2 variants={fadeInUp}>Front Lever</motion.h2>
              <motion.p className="section-principle" variants={fadeInUp}>
                "Depression organizes the ribcage"
              </motion.p>
              <motion.p variants={fadeInUp}>
                Horizontal suspension becomes possible when you learn to 
                organize your ribcage through scapular depression.
              </motion.p>
            </motion.div>
          </section>

          {/* Section 5: Planche - content on RIGHT */}
          <section id="section-planche" className="scroll-section content-right">
            <div className="mobile-figure-wrapper">
              <MobilePoseFigure pose="planche" size={260} />
            </div>
            <motion.div 
              className="section-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={staggerContainer}
            >
              <motion.span className="section-number" variants={fadeInUp}>04</motion.span>
              <motion.h2 variants={fadeInUp}>Planche</motion.h2>
              <motion.p className="section-principle" variants={fadeInUp}>
                "Let gravity do the work"
              </motion.p>
              <motion.p variants={fadeInUp}>
                The ultimate goal. Not fighting gravity, but organizing 
                yourself so completely that you float.
              </motion.p>
            </motion.div>
          </section>
        </div>
      </div>

      {/* Below the scroll journey: signup and CTA */}
      <section id="section-signup" className="post-journey">
        <motion.div 
          className="post-journey-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="insight-box" variants={fadeInUp}>
            <p className="insight-text">
              "Alignment is organized, not forced."
            </p>
          </motion.div>

          <motion.h2 variants={fadeInUp}>
            Follow the journey.
          </motion.h2>
          <motion.p variants={fadeInUp}>
            I'm documenting every insight, breakthrough, and failure as I work 
            toward these five skills. Get chapters as I write them.
          </motion.p>
          
          <motion.ul className="benefits-list" variants={staggerContainer}>
            <motion.li variants={fadeInUp}>
              <span className="benefit-icon">📖</span>
              New chapters the moment they're finished
            </motion.li>
            <motion.li variants={fadeInUp}>
              <span className="benefit-icon">💡</span>
              Raw insights from training sessions
            </motion.li>
            <motion.li variants={fadeInUp}>
              <span className="benefit-icon">🎥</span>
              Behind-the-scenes video content
            </motion.li>
          </motion.ul>
          
          <motion.div variants={fadeInUp}>
            <EmailSignup />
          </motion.div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="read-cta">
        <motion.div 
          className="read-cta-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp}>Start reading now.</motion.h2>
          <motion.p variants={fadeInUp}>
            The book is being written in public. Dive in from the beginning.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link to="/read" className="cta-button cta-primary">
              Read Chapter 1 →
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
