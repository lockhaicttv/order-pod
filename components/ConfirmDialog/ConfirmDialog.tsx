import { Button } from '@app/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@app/components/ui/dialog'

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  onReject: () => void
  dialogTitle?: string
  dialogDescription?: string
  confirmBtnLabel?: string
  rejectBtnLabel?: string
  confirmMessage?: string
}
const ConfirmDialog = ({
  open,
  dialogTitle,
  onConfirm,
  confirmBtnLabel,
  rejectBtnLabel,
  onReject,
  onClose,
  dialogDescription,
  confirmMessage
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {!!dialogDescription && <DialogDescription>{dialogDescription}</DialogDescription>}
        </DialogHeader>
        <div className='flex items-center space-x-2 text-foreground'>{confirmMessage}</div>
        <DialogFooter>
          <Button type='button' variant='outline' onClick={onReject}>
            {!!rejectBtnLabel || 'Close'}
          </Button>
          <Button type='button' variant='default' onClick={onConfirm}>
            {!!confirmBtnLabel || 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDialog
