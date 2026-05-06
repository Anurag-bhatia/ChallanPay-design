import { PageTransition } from '@/components/shared/PageTransition'

export function EventsPage() {
  return (
    <PageTransition>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-text-primary">Events</h1>
        <p className="text-text-secondary mt-2">Upcoming road safety and awareness events.</p>
      </div>
    </PageTransition>
  )
}
