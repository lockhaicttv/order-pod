import { CircleCheckBigIcon, HandHeartIcon, LoaderIcon, RefreshCwOffIcon } from 'lucide-react'
import { Badge } from '@app/components/ui/badge'
import { Status } from '@app/containers/Orders2/types/order.types'

const statusIcon = {
  [Status.INITIAL]: <HandHeartIcon size={18} />,
  [Status.PROCESSING]: <LoaderIcon size={18} />,
  [Status.DONE]: <CircleCheckBigIcon size={18} />,
  [Status.CANCELED]: <RefreshCwOffIcon size={18} />
}

const statusColor = {
  [Status.INITIAL]: 'blue',
  [Status.PROCESSING]: 'yellow',
  [Status.DONE]: 'green',
  [Status.CANCELED]: 'red'
}

const StatusTag: React.FC<{ status: Status }> = ({ status }) => {
  return (
    <Badge className={`flex items-center gap-1 bg-${statusColor[status]}-500`}>
      {statusIcon[status]}
      <div className='capitalize'>{status}</div>
    </Badge>
  )
}

export default StatusTag
