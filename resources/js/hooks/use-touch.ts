import { useEffect, useState } from 'react'

export function useIsTouch() {
  const [isTouch, setIsTouch] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)')

    function update() {
      setIsTouch(mediaQuery.matches)
    }

    update()

    mediaQuery.addEventListener('change', update)

    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  return !!isTouch
}
