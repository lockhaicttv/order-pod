interface Product {
  id: string
  name: string
  description: string
  unit: string
  exchangeRate: Record<string, unknown> // You can define a more specific type if needed
}

export interface Detail {
  id: string
  Product: Product
  Quantity: number
}

export interface Customer {
  id: string
  name: string
}

export interface Order {
  id: string
  code: string
  customer: Customer
  detail: Detail[]
}
