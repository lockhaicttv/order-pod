import React, { ReactNode } from 'react'
import { Button } from '@app/components/ui/button'
import Tooltip from '@app/components/Tooltip'
import classNames from 'classnames'

export enum LayoutEnum {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

export type Layout = LayoutEnum.VERTICAL | LayoutEnum.HORIZONTAL
interface InfoWithIconProps {
  icon: ReactNode
  info: ReactNode
  title: string
  isShowFull?: boolean
  layout?: Layout
}
const InfoWithIcon = ({ icon, info, title, isShowFull = false, layout = LayoutEnum.HORIZONTAL }: InfoWithIconProps) => (
  <div className={classNames(['flex items-center', { 'flex-col space-y-2': layout === LayoutEnum.VERTICAL }])}>
    <span className='text-neutral-500 dark:text-foreground'>
      <Tooltip popupContent={title}>
        <Button variant={'ghost'} className='rounded-full p-0 mr-2 hover:bg-background'>
          {isShowFull ? (
            <div className='flex gap-2'>
              <div>
                {icon}
                <div />
              </div>
              <div>{title}:</div>
            </div>
          ) : (
            icon
          )}
        </Button>
      </Tooltip>
    </span>
    <span className='text-foreground'>{info}</span>
  </div>
)

export default InfoWithIcon
