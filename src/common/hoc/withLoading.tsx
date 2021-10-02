import { FunctionalComponent } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useLocation } from 'wouter-preact'
import { HourGlassLoading } from '@/common/components/Loading'

export function withLoading(
  WrappedComponent: FunctionalComponent
): FunctionalComponent {
  return () => {
    const [loading, setLoading] = useState<boolean>(true)

    const [location] = useLocation()

    useEffect(() => {
      const sleep = async () => {
        await new Promise((res) =>
          setTimeout(() => {
            res(undefined)
          }, 2500)
        )
        setLoading(false)
      }

      sleep()
    }, [location])

    return loading ? <HourGlassLoading /> : <WrappedComponent />
  }
}
