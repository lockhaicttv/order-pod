import { formatCurrency } from '@app/utils/formatCurrency'

interface MoneyWithCurrencyProps {
  amount: number
}

const MoneyWithCurrency = ({ amount }: MoneyWithCurrencyProps) => {
  return <span className={amount < 0 ? 'text-destructive' : ''}>{formatCurrency(amount)}</span>
}

export default MoneyWithCurrency
