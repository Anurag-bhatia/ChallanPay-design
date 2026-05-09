import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export function LoadingPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const vehicle = searchParams.get('vehicle')

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/status?vehicle=${vehicle}`, { replace: true })
    }, 4000)
    return () => clearTimeout(timer)
  }, [navigate, vehicle])

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-white px-4"
      role="status"
      aria-live="polite"
    >
      <div aria-hidden="true">
        <DotLottieReact
          src="/lottie/loading.json"
          loop
          autoplay
          className="w-48 h-48"
        />
      </div>
      <p className="mt-4 text-text-secondary text-sm font-medium animate-pulse">
        Fetching your challan details...
      </p>
    </div>
  )
}
