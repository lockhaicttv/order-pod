import {
  BadgeAlertIcon,
  BarChart3Icon,
  BoltIcon,
  CalendarCheckIcon,
  CalendarDaysIcon,
  CombineIcon,
  ContactRound,
  CrosshairIcon,
  FlaskConicalIcon,
  LayoutTemplateIcon,
  NotebookPenIcon,
  PackageIcon,
  ReceiptTextIcon,
  SettingsIcon,
  SquareKanban,
  UserRoundCogIcon,
  UsersIcon,
  UsersRoundIcon,
  WaypointsIcon,
  WrenchIcon
} from 'lucide-react'
import { PLAN_LIST_ROUTE } from '@app/containers/Plans/constants/plan-routes.constants'
import { ORDER_LIST_ROUTE } from '@app/containers/Orders/constants/order-routes.constants'
import { DAILY_REPORT_LIST_ROUTE } from '@app/containers/DailyReports/constants/daily-report-routes.constants'
import { MenuItemProps } from '@app/components/Layout/components/Sidebar/types/sidebar.types'
import { PRODUCT_SCHEDULE_ROUTE } from '@app/containers/ProductsSchedule/constants/products-schedule.constants'
import { MACHINES_SCHEDULE_ROUTE } from '@app/containers/MachinesSchedule/constants/machines-schedule.constants'
import { TICKET_PLANNING_LIST_ROUTE } from '@app/containers/TicketPlanning/constants/ticket-planning-routes.constants'
import { DEPARTMENT_LIST_ROUTE } from '@app/containers/Departments/constants/department-routes.constants'
import { STAGE_LIST_ROUTE } from '@app/containers/Stages/constants/stage-routes.constants'
import { PRODUCTION_QUOTA_LIST_ROUTE } from '@app/containers/ProductionQuotas/constants/production-quota-routes.constants'
import { RECIPE_LIST_ROUTE } from '@app/containers/Recipe/constants/recipe-routes.constants'
import { TOOL_LIST_ROUTE } from '@app/containers/Tools/constants/tool-routes.constants'
import { PROCESS_LIST_ROUTE } from '@app/containers/Processes/constants/process-routes.constants'
import { PRODUCT_ISSUE_LIST_ROUTE } from '@app/containers/ProductIssues/constants/product-issue-routes.constants'
import { PRODUCT_LIST_ROUTE } from '@app/containers/Products/constants/product-routes.constants'
import { POSITION_LIST_ROUTE } from '@app/containers/Positions/constants/position-routes.constants'
import { EMPLOYEE_GROUP_LIST_ROUTE } from '@app/containers/EmployeeGroups/constants/employee-group-routes.constants'
import { EMPLOYEE_LIST_ROUTE } from '@app/containers/Employees/constants/employee-routes.constants'
import { MACHINE_LIST_ROUTE } from '@app/containers/Machines/constants/machine-routes.constants'
import { DataEntry } from '@app/api'
import { Order } from '@app/containers/Orders/types/order.types'
import { ROLE_LIST_ROUTE } from '@app/containers/Roles/constants/role-routes.constants'
import { USER_LIST_ROUTE } from '@app/containers/Users/constants/user-routes.constants'

export const menuIconProps = {
  size: 16,
  color: 'white'
}

interface MenuProps {
  pathname: string
  orders: DataEntry<Order[], true> | undefined
}

export const menu = ({ pathname, orders }: MenuProps): MenuItemProps[] => [
  // {
  //   name: 'User',
  //   path: USER_LIST_ROUTE,
  //   roles: ['admin'],
  //   icon: <UsersIcon {...menuIconProps} />
  // },
  // {
  //   name: 'Role',
  //   path: ROLE_LIST_ROUTE,
  //   roles: ['admin'],
  //   icon: <UserRoundCogIcon {...menuIconProps} />
  // },
  // {
  //   name: 'Daily Report',
  //   path: DAILY_REPORT_LIST_ROUTE,
  //   roles: ['admin'],
  //   icon: <CalendarCheckIcon {...menuIconProps} />
  // },
  {
    name: 'Orders',
    path: ORDER_LIST_ROUTE,
    roles: ['admin'],
    icon: <ReceiptTextIcon {...menuIconProps} />
  }

  // {
  //   name: 'Planning',
  //   path: PLAN_LIST_ROUTE,
  //   roles: ['admin'],
  //   icon: <NotebookPenIcon {...menuIconProps} />
  // },
  // {
  //   name: 'Product Schedule',
  //   roles: ['admin'],
  //   icon: <CalendarDaysIcon {...menuIconProps} />,
  //   path: PRODUCT_SCHEDULE_ROUTE + '/' + orders?.data?.[0]?.code
  // },
  // {
  //   name: 'Machine Schedule',
  //   path: MACHINES_SCHEDULE_ROUTE + '/' + orders?.data?.[0]?.code,
  //   roles: ['admin'],
  //   icon: <CalendarDaysIcon {...menuIconProps} />
  // },
  // {
  //   name: 'Ticket Planning',
  //   path: TICKET_PLANNING_LIST_ROUTE,
  //   roles: ['admin'],
  //   icon: <SquareKanban {...menuIconProps} />
  // },
  // {
  //   name: 'System configs',
  //   path: pathname,
  //   roles: ['admin'],
  //   icon: <BoltIcon {...menuIconProps} />,
  //   children: [
  //     {
  //       name: 'Department',
  //       path: DEPARTMENT_LIST_ROUTE,
  //       roles: ['admin'],
  //       icon: <LayoutTemplateIcon {...menuIconProps} />
  //     },
  //     {
  //       name: 'Employee',
  //       path: EMPLOYEE_LIST_ROUTE,
  //       roles: ['admin'],
  //       icon: <ContactRound {...menuIconProps} />
  //     },
  //     {
  //       name: 'Employee Group',
  //       path: EMPLOYEE_GROUP_LIST_ROUTE,
  //       roles: ['admin'],
  //       icon: <UsersRoundIcon {...menuIconProps} />
  //     },
  //     {
  //       name: 'Position',
  //       path: POSITION_LIST_ROUTE,
  //       roles: ['admin'],
  //       icon: <UserRoundCogIcon {...menuIconProps} />
  //     },
  //     {
  //       name: 'Product',
  //       roles: ['admin'],
  //       icon: <PackageIcon {...menuIconProps} />,
  //       path: PRODUCT_LIST_ROUTE
  //     },
  //     {
  //       name: 'Product Issue',
  //       roles: ['admin'],
  //       icon: <BadgeAlertIcon {...menuIconProps} />,
  //       path: PRODUCT_ISSUE_LIST_ROUTE
  //     },
  //     {
  //       name: 'Process',
  //       roles: ['admin'],
  //       icon: <CombineIcon {...menuIconProps} />,
  //       path: PROCESS_LIST_ROUTE
  //     },
  //     {
  //       name: 'Machine',
  //       roles: ['admin'],
  //       icon: <SettingsIcon {...menuIconProps} />,
  //       path: MACHINE_LIST_ROUTE
  //     },
  //     {
  //       name: 'Stage',
  //       roles: ['admin'],
  //       icon: <WaypointsIcon {...menuIconProps} />,
  //       path: STAGE_LIST_ROUTE
  //     },
  //     {
  //       name: 'Production Quota',
  //       roles: ['admin'],
  //       icon: <CrosshairIcon {...menuIconProps} />,
  //       path: PRODUCTION_QUOTA_LIST_ROUTE
  //     },
  //
  //     {
  //       name: 'Recipe',
  //       path: RECIPE_LIST_ROUTE,
  //       roles: ['admin'],
  //       icon: <FlaskConicalIcon {...menuIconProps} />
  //     },
  //     {
  //       name: 'Tool',
  //       path: TOOL_LIST_ROUTE,
  //       roles: ['admin'],
  //       icon: <WrenchIcon {...menuIconProps} />
  //     }
  //   ]
  // },
  // {
  //   name: 'Dashboard',
  //   path: '/dashboard',
  //   roles: ['admin'],
  //   icon: <BarChart3Icon {...menuIconProps} />
  // }
]
