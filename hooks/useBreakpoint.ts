import { useMediaQuery } from 'react-responsive'
import theme from '@app/utils/theme'

const breakpoints = theme?.screens || {
  mobile: '640px',
  tablet: '768px',
  tabletLandscape: '1024px',
  desktop: '1280px'
}

export function useBreakpoint<K extends string>(breakpointKey: K) {
  const breakpointValue = breakpoints[breakpointKey as keyof typeof breakpoints]
  const bool = useMediaQuery({
    query: `(max-width: ${breakpointValue})`
  })
  const capitalizedKey = breakpointKey[0].toUpperCase() + breakpointKey.substring(1)

  type KeyAbove = `up${Capitalize<K>}`
  type KeyBelow = `down${Capitalize<K>}`

  return {
    [breakpointKey]: Number(String(breakpointValue).replace(/[^0-9]/g, '')),
    [`up${capitalizedKey}`]: !bool,
    [`down${capitalizedKey}`]: bool
  } as Record<K, number> & Record<KeyAbove | KeyBelow, boolean>
}
