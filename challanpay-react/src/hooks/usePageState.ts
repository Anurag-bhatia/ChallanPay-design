import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

export type PageState = 'loading' | 'error' | 'empty' | 'success'

// Simulates an API lifecycle for the data pages while there's no real backend.
// Override the resolved state via `?state=loading|error|empty|success` for QA.
//
// Pass `simulateMs` to control how long the loading state lasts (default 600ms).
// Returns the resolved state plus a `retry` callback that re-runs the simulation.
export function usePageState(simulateMs = 600) {
  const [searchParams] = useSearchParams()
  const forced = searchParams.get('state') as PageState | null
  const [state, setState] = useState<PageState>(forced ?? 'loading')
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (forced) {
      setState(forced)
      return
    }
    setState('loading')
    const timer = setTimeout(() => setState('success'), simulateMs)
    return () => clearTimeout(timer)
  }, [forced, simulateMs, tick])

  const retry = () => {
    setTick((n) => n + 1)
  }

  return { state, retry }
}
