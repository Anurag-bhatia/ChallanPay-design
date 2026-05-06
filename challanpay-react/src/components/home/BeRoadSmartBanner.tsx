import { ScrollReveal } from '@/components/shared/ScrollReveal'

export function BeRoadSmartBanner() {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <picture>
            <source media="(max-width: 480px)" srcSet="/images/PG-mobile.png" />
            <img
              src="/images/PG.png"
              alt="As seen on IdeaBaaz Season 1 - Be Road Smart"
              className="w-full h-auto rounded-2xl"
            />
          </picture>
        </ScrollReveal>
      </div>
    </section>
  )
}
