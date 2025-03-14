import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@app/components/ui/tooltip'
import { PropsWithChildren, ReactNode } from 'react'

interface Props extends PropsWithChildren {
  popupContent?: ReactNode
}
export default function CTooltip({ popupContent, children }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{popupContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
