import { motion } from 'framer-motion'
import { ChevronRight, MessageCircle, HelpCircle } from 'lucide-react'
import { Link } from 'react-router'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { useTranslation } from '@/hooks/useTranslation'

export function NeedHelpSection() {
  const { t } = useTranslation()

  const handleWhatsAppClick = () => {
    window.open(
      'https://wa.me/919599648108?text=Hi%2C%20I%20need%20help%20with%20my%20challan',
      '_blank'
    )
  }

  return (
    <section id="support" className="py-16 md:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
              {t.needHelp.title}
            </h2>
            <p className="font-body text-text-secondary mt-3 text-lg">
              {t.needHelp.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Help Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {/* WhatsApp Card */}
          <ScrollReveal delay={0.1}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-between p-6 rounded-2xl border border-border bg-white hover:bg-gray-50 transition-colors text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-text-primary mb-1">
                    {t.needHelp.whatsAppTitle}
                  </h3>
                  <p className="font-body text-sm text-text-secondary">
                    {t.needHelp.whatsAppDesc}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-text-light group-hover:text-[#25D366] transition-colors flex-shrink-0" />
            </motion.button>
          </ScrollReveal>

          {/* FAQs Card */}
          <ScrollReveal delay={0.2}>
            <Link to="/faq">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between p-6 rounded-2xl border border-border bg-white hover:bg-gray-50 transition-colors text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-text-primary mb-1">
                      {t.needHelp.faqTitle}
                    </h3>
                    <p className="font-body text-sm text-text-secondary">
                      {t.needHelp.faqDesc}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-text-light group-hover:text-primary transition-colors flex-shrink-0" />
              </motion.div>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
