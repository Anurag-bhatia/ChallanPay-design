import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { useTranslation } from '@/hooks/useTranslation'
import { useModalA11y } from '@/hooks/useModalA11y'

interface VideoItem {
  id: number
  src: string
}

const videos: VideoItem[] = [
  { id: 1, src: '/videos/V1.mp4' },
  { id: 2, src: '/videos/V2.mp4' },
  { id: 3, src: '/videos/V3.mp4' },
  { id: 4, src: '/videos/V1.mp4' },
]

export function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const { t } = useTranslation()

  const openVideo = (src: string) => setActiveVideo(src)
  const closeVideo = () => setActiveVideo(null)

  useModalA11y(activeVideo !== null, closeVideo)

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
              {t.videoTestimonials.title}
            </h2>
            <p className="font-body text-text-secondary mt-3 text-lg">
              {t.videoTestimonials.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Video Cards */}
        <div className="flex gap-3 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:snap-none sm:pb-0 scrollbar-hide">
          {videos.map((video, index) => (
            <ScrollReveal key={video.id} delay={index * 0.1} className="min-w-[45%] snap-center sm:min-w-0">
              <div
                className="aspect-[9/16] cursor-pointer group"
                onClick={() => openVideo(video.src)}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black transition-transform duration-300 group-hover:scale-[1.02]">
                  {/* Video preview / thumbnail */}
                  <video
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-14 h-14 md:w-[70px] md:h-[70px] rounded-full bg-white/95 flex items-center justify-center z-10"
                      aria-label="Play video testimonial"
                    >
                      <Play className="w-6 h-6 md:w-7 md:h-7 text-red-500 ml-0.5" fill="currentColor" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full max-w-sm bg-black rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeVideo}
                className="absolute top-3 right-3 z-20 w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[9/16] max-h-[90vh] flex items-center justify-center bg-black">
                <video
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                >
                  <source src={activeVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
