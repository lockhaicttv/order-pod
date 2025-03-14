import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@app/lib/utils'

const typographyVariants = cva('text-foreground', {
  variants: {
    variant: {
      a: '',
      abbr: '',
      b: '',
      strong: '',
      cite: '',
      code: '',
      em: '',
      i: '',
      sub: '',
      sup: '',
      u: '',
      var: '',
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: '',
      h6: '',
      div: '',
      span: '',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
      ol: '',
      li: '',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      lead: 'text-xl text-muted-foreground',
      muted: 'text-sm text-muted-foreground',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      inlineCode: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'
    }
  }
})

type VariantPropType = VariantProps<typeof typographyVariants>

const excludedVariants = ['a', 'large', 'lead', 'muted'] as const

type TypographyProps =
  | (React.HTMLAttributes<HTMLElement> &
      VariantPropType & {
        as: 'a'
        asChild?: boolean
        href: string
      })
  | (React.HTMLAttributes<HTMLElement> &
      VariantPropType & {
        as?: Exclude<VariantPropType['variant'], (typeof excludedVariants)[number]>
        href?: never
        asChild?: boolean
      })

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, href, asChild, ...props }, ref) => {
    const Component = asChild
      ? Slot
      : (as as React.ElementType) ||
        (excludedVariants.includes(variant as (typeof excludedVariants)[number]) ? 'p' : variant) ||
        'p'

    return (
      <Component
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
        href={as === 'a' ? href : undefined}
      />
    )
  }
)

Typography.displayName = 'Typography'

export { Typography, typographyVariants }
