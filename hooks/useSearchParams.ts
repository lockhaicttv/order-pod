import { usePathname, useRouter, useSearchParams as useSearchParamsLib } from 'next/navigation'

const useSearchParams = () => {
  const searchParams = useSearchParamsLib()
  const router = useRouter()
  const pathname = usePathname()
  const current = new URLSearchParams(Array.from(searchParams.entries())) // -> has to use this form

  const setSearchParamsToUrl = () => {
    // cast to string
    const search = current.toString()
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`)
  }

  return {
    setSearchParamsToUrl,
    searchParams: current,
    pathname
  }
}

export default useSearchParams
