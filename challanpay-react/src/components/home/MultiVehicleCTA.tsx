import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { useTranslation } from '@/hooks/useTranslation'

export function MultiVehicleCTA() {
  const { t } = useTranslation()

  const handleWhatsAppClick = () => {
    window.open(
      'https://wa.me/919599648108?text=Hi%2C%20I%20want%20to%20check%20challans%20for%20multiple%20vehicles',
      '_blank'
    )
  }

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="rounded-3xl p-6 md:p-10 overflow-hidden border border-border">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              {/* Left content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-2">
                  {t.multiVehicle.title}
                </h3>
                <p className="font-body text-text-secondary text-lg mb-6">
                  {t.multiVehicle.subtitle}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleWhatsAppClick}
                  className="inline-flex items-center gap-2.5 bg-[#059669] hover:bg-[#047857] text-white font-display font-semibold py-3.5 px-7 rounded-xl transition-colors "
                >
                  <MessageCircle className="w-5 h-5" />
                  {t.multiVehicle.chatOnWhatsApp}
                </motion.button>
              </div>

              {/* Right image */}
              <div className="flex-shrink-0 w-full md:w-auto max-w-[280px] md:max-w-[320px]">
                <img
                  src="/images/image-121.png"
                  alt="Multiple Vehicles Check"
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
