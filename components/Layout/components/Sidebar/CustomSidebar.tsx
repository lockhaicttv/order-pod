'use client'
import { Sidebar, Menu, MenuItem, SubMenu, MenuItemProps } from 'react-pro-sidebar'
import '../../styles/Sidebar.scss'
import styled from 'styled-components'
import React, { ReactNode, useEffect } from 'react'
import { Button } from '@app/components/ui/button'
import { ChevronLeft, ChevronRight, LogOutIcon } from 'lucide-react'
import useStore from '@app/store/useStore'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import classNames from 'classnames'
import useGetOrders from '@app/containers/Orders/hooks/useGetOrders'
import { menu, menuIconProps } from '@app/components/Layout/components/Sidebar/constants/menu.constants'
import { useBreakpoint } from '@app/hooks/useBreakpoint'
import cookieStorage from '@app/utils/cookieStorage'

export interface MenuProps {
  name: string
  path?: string
  roles: string[]
  icon: ReactNode
  children?: MenuProps[]
}

const CustomSidebar = () => {
  const { collapse, toggleCollapse, toggled, toggleNavigation, changeBroken } = useStore((state) => state)
  const pathname = usePathname()
  const { data: orders } = useGetOrders()
  const { downMobile } = useBreakpoint('mobile')
  const router = useRouter()

  const handleLogout = () => {
    cookieStorage.remove()
    cookieStorage.destroy()

    router.push('/login')
  }

  const menuList = menu({ orders, pathname }).map((item, idx) => {
    // let isFoundedRole = item.roles.some((role) => listRoles.includes(role));
    if (!item.children) {
      return (
        <CustomMenuItem
          item={item}
          key={idx}
          className={classNames([
            'text-white hover:bg-white hover:text-primary',
            { 'border-l-[#C96D1C] border-l-4 ps-active': pathname.includes(item?.path || '') }
          ])}
        />
      )
    }

    if (item.children && item.children.length > 0)
      return (
        <Menu className='p-0' key={item.name}>
          <SubMenuStyled
            label={item.name}
            icon={item.icon}
            className='text-white hover:text-primary'
            component={<Link href={`${item?.path}`} className='text-white text-decoration-none' />}
          >
            {item.children.map((subItem) => {
              return (
                <SubMenuItemStyled
                  icon={subItem.icon}
                  key={subItem.name}
                  component={<Link href={`${subItem?.path} `} className='text-white text-decoration-none' />}
                  className={classNames([
                    'text-white hover:bg-white hover:text-primary',
                    { 'border-l-[#C96D1C] border-l-4 ps-active': pathname.includes(subItem?.path || '') }
                  ])}
                >
                  {subItem.name}
                </SubMenuItemStyled>
              )
            })}
          </SubMenuStyled>
        </Menu>
      )
  })

  useEffect(() => {
    if (downMobile) {
      toggleCollapse()
    }
  }, [downMobile])

  return (
    <SidebarStyled
      backgroundColor={'black'}
      collapsed={collapse}
      breakPoint='xs'
      toggled={toggled}
      onBackdropClick={() => toggleNavigation(false)}
      onBreakPoint={changeBroken}
      hidden={downMobile}
    >
      <div className='flex flex-col justify-between	h-full'>
        <div>
          {/*<SidebarHeader rtl={false} />*/}
          <Menu>
            {menuList}
            <MenuItemStyled
              icon={<LogOutIcon {...menuIconProps} />}
              key={'logout'}
              className='text-white'
              onClick={handleLogout}
            >
              Log out
            </MenuItemStyled>
          </Menu>
        </div>
      </div>
      <CollapseButton size='icon' variant='default' className='h-6 w-6' onClick={toggleCollapse}>
        {collapse ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </CollapseButton>
    </SidebarStyled>
  )
}
export default CustomSidebar

const CustomMenuItem: React.FC<{ item: MenuProps } & MenuItemProps> = ({ item, ...props }) => {
  return (
    <MenuItemStyled
      // activeClassName='fw-bold'
      icon={item.icon}
      key={item.name}
      component={<Link href={`${item?.path} `} className='text-white text-decoration-none' />}
      {...props}
    >
      {item.name}
    </MenuItemStyled>
  )
}

export const MenuItemStyled = styled(MenuItem)`
  :hover {
    color: hsl(var(--primary));
    svg {
      stroke: hsl(var(--primary));
    }
  }

  &.ps-active {
    background-color: #f3f3f3;
    color: hsl(var(--primary));
    svg {
      stroke: hsl(var(--primary));
    }
  }
`

const SubMenuStyled = styled(SubMenu)`
  :hover {
    > span {
      > svg {
        stroke: hsl(var(--primary));
      }
    }

    > .ps-menu-label {
      color: hsl(var(--primary));
    }

    > .ps-submenu-expand-icon {
      color: hsl(var(--primary));
    }
  }

  & .popper-inner {
    background-color: #8292fe !important;
  }
`

const SubMenuItemStyled = styled(MenuItem)`
  background-color: hsl(var(--primary));

  :hover {
    svg {
      stroke: hsl(var(--primary));
    }

    > .ps-menu-label {
      color: hsl(var(--primary));
    }

    > .ps-submenu-expand-icon {
      color: hsl(var(--primary));
    }
  }

  &.ps-active {
    background-color: #f3f3f3;
    color: hsl(var(--primary));
    svg {
      stroke: hsl(var(--primary));
    }
  }
`

const CollapseButton = styled(Button)`
  position: absolute;
  top: 65vh;
  bottom: 20px;
  right: -12px;
  border-radius: 50%;

  @media screen and (max-width: 480px) {
    display: none;
  }
`

const SidebarStyled = styled(Sidebar)`
  .ps-sidebar-container {
    background-color: hsl(var(--sidebar));
  }

  height: inherit;

  .ps-submenu-expand-icon {
    margin-bottom: 5px;
  }

  @media only screen and (min-width: 480px) {
    .ps-sidebar-container {
      position: unset;
    }
  }
`
