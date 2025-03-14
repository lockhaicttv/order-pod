import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@app/tailwind.config'

export default resolveConfig(tailwindConfig).theme as any
