import { easeInOut, motion } from "framer-motion"


export default function HeroContent() {
  return (
    <main className="absolute bottom-8 left-8 z-20 max-w-lg">
      <div className="text-left">
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration: .5, ease: easeInOut}}
          className="inline-flex items-center px-3 py-2 relative"
          style={{
            filter: "url(#glass-effect)",
          }}
        >
          <div className="absolute top-0 left-1 right-1 h-full  rounded-sm" />
          <span className="text-white/90 text-xs font-light relative z-10 ">New Paper Shaders Experience</span>
        </motion.div>

        <motion.div
        initial={{y:50, opacity:0 }}
        animate={{y:0, opacity: 1}}
        transition={{duration: 0.5, ease: "easeInOut"}}
        className="opacity-100 translate-y-0">
            {/* Main Heading */}
            <h1
            style={{mixBlendMode: "difference"}} 
            className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-4">
                <span className="font-medium italic instrument">Beautiful</span> Shader
                <br />
                <span className="font-light tracking-tight text-white">Experiences</span>
            </h1>

            {/* Description */}
            <p className="text-xs font-light text-white/70 mb-4 leading-relaxed">
                Create stunning visual experiences with our advanced shader technology. Interactive lighting, smooth
                animations, and beautiful effects that respond to your every move.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-4 flex-wrap">
                <button className="px-8 py-3 rounded-sm bg-transparent border-primary-foreground border-l-8 border-t-8 border-r-2 border-b-2 border  text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer">
                    Pricing
                </button>
                <button className="px-8 py-3 rounded-sm bg-white border-primary border-l-2 border-t-2 border-r-8 border-b-8 text-primary font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer">
                    Get Started
                </button>
            </div>
        </motion.div>
      </div>
    </main>
  )
}
