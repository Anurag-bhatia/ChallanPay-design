import { Star } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { useTranslation } from '@/hooks/useTranslation'

interface Testimonial {
  name: string
  avatar: string
  meta: string
  savings: string
  rating: number
  text: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Dweep',
    avatar: '/images/Polish.webp',
    meta: 'Two-Wheeler Owner \u2022 Delhi',
    savings: '\u20B92,300 Saved',
    rating: 5,
    text: '"Challan dekh ke tension ho gayi thi, par is service ne process bahut simple bana diya. Kahi bhaagne ki zarurat hi nahi padi."',
  },
  {
    name: 'Tina',
    avatar: '/images/anjali.webp',
    meta: 'Car Owner \u2022 Jaipur',
    savings: '\u20B91,700 Saved',
    rating: 5,
    text: '"WhatsApp pe link aaya, maine details check ki aur turant payment ho gaya. Pehle kabhi itna smooth nahi laga challan bharna."',
  },
  {
    name: 'Karan',
    avatar: '/images/karan.webp',
    meta: 'Car Owner \u2022 Mumbai',
    savings: '\u20B92,000 Saved',
    rating: 5,
    text: '"I had multiple pending challans and was worried about deadlines, but this service cleared them all smoothly in one go."',
  },
  {
    name: 'Anjali Sharma',
    avatar: '/images/ABC.webp',
    meta: 'Two-Wheeler Owner \u2022 Ahmedabad',
    savings: '\u20B92,500 Saved',
    rating: 5,
    text: '"The step-by-step updates made me feel confident about the process. Honestly, the easiest challan payment I have done."',
  },
  {
    name: 'Rohit Mehra',
    avatar: '/images/karan.webp',
    meta: 'Two-Wheeler Owner \u2022 Bengaluru',
    savings: '\u20B92,100 Saved',
    rating: 5,
    text: '"I did not expect WhatsApp support to be this responsive. Got my query solved instantly and payment done without delay."',
  },
  {
    name: 'Meena',
    avatar: '/images/Sweety.webp',
    meta: 'Car Owner \u2022 Varanasi',
    savings: '\u20B92,850 Saved',
    rating: 5,
    text: '"WhatsApp pe link aaya, maine click karke payment kar diya. Bilkul court jaane ki tension hi nahi rahi."',
  },
]

export function TestimonialsSection() {
  const { t } = useTranslation()

  return (
    <section className="py-16 md:py-20" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              {t.testimonials.title}
            </h2>
            <p className="font-body text-white/80 mt-3 text-lg">
              {t.testimonials.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Testimonial Cards */}
        <div className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:snap-none sm:pb-0 scrollbar-hide">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 0.1} className="min-w-[85%] snap-center sm:min-w-0">
              <div className="bg-white rounded-2xl p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-full bg-cover bg-center flex-shrink-0 border-2 border-primary/20"
                    style={{ backgroundImage: `url('${testimonial.avatar}')` }}
                    role="img"
                    aria-label={`Photo of ${testimonial.name}`}
                  />
                  <div>
                    <h4 className="font-display text-base font-semibold text-text-primary">
                      {testimonial.name}
                    </h4>
                    <p className="font-body text-xs text-text-light">
                      {testimonial.meta}
                    </p>
                  </div>
                </div>

                {/* Savings badge */}
                <div className="inline-flex self-start px-3 py-1 rounded-full bg-success/10 text-success text-sm font-semibold font-body mb-3">
                  {testimonial.savings}
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="font-body text-sm text-text-secondary leading-relaxed flex-1">
                  {testimonial.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
