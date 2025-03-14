import styled from 'styled-components'
import React from 'react'
import logo from '@app/assets/logo/KMAPP_logo.png'
import Image from 'next/image'
interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  rtl: boolean
}

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`
export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ ...rest }) => {
  return (
    <StyledSidebarHeader {...rest}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Image
          src={logo}
          style={{
            height: '100%',
            width: '100%'
          }}
          alt={'sidebar-header-logo'}
        />
      </div>
    </StyledSidebarHeader>
  )
}
