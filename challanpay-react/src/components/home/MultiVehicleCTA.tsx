import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { useTranslation } from '@/hooks/useTranslation'

export function MultiVehicleCTA() {
  const { t } = useTranslation()

  const handleWhatsAppClick = () => {
    window.open(
      'https://wa.me/919988441033?text=Hi%2C%20I%20want%20to%20check%20challans%20for%20multiple%20vehicles',
      '_blank'
    )
  }

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="bg-white rounded-3xl p-6 md:p-10 overflow-hidden border border-border shadow-sm">
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
                  className="inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-display font-semibold py-3.5 px-7 rounded-xl transition-colors "
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M317.12 285.93c-9.69 3.96-15.88 19.13-22.16 26.88-3.22 3.97-7.06 4.59-12.01 2.6-36.37-14.49-64.25-38.76-84.32-72.23-3.4-5.19-2.79-9.29 1.31-14.11 6.06-7.14 13.68-15.25 15.32-24.87 3.64-21.28-24.18-87.29-60.92-57.38C48.62 232.97 330.7 461.46 381.61 337.88c14.4-35.03-48.43-58.53-64.49-51.95zM256 467.28c-37.39 0-74.18-9.94-106.39-28.76-5.17-3.03-11.42-3.83-17.2-2.26l-69.99 19.21 24.38-53.71a22.34 22.34 0 0 0-2.22-22.32C58.5 343.29 44.71 300.61 44.71 256c0-116.51 94.78-211.29 211.29-211.29S467.28 139.49 467.28 256c0 116.5-94.78 211.28-211.28 211.28zM256 0C114.84 0 0 114.84 0 256c0 49.66 14.1 97.35 40.89 138.74L2 480.39a22.37 22.37 0 0 0 3.34 23.76A22.403 22.403 0 0 0 22.36 512c14.42 0 93.05-24.71 113.06-30.2C172.41 501.59 213.9 512 256 512c141.15 0 256-114.85 256-256C512 114.84 397.15 0 256 0z" />
                  </svg>
                  {t.multiVehicle.chatOnWhatsApp}
                </motion.button>
              </div>

              {/* Right image */}
              <div className="flex-shrink-0 w-full md:w-auto md:max-w-[360px]">
                <img
                  src="/images/multi-vehicle-illustration.png"
                  alt="Stressed fleet owner with stack of pending challans"
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
