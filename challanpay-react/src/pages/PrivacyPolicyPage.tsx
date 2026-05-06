import { PageTransition } from '@/components/shared/PageTransition'

export function PrivacyPolicyPage() {
  return (
    <PageTransition>
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-text-primary">Privacy Policy</h1>
        <div className="mt-8 prose prose-sm text-text-secondary">
          <p>Last updated: January 2026</p>
        </div>
      </div>
    </PageTransition>
  )
}
