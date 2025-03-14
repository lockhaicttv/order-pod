export interface Customer {
  id: string
  name: string
}

export interface CreateCustomer extends Omit<Customer, 'id'> {}

export interface DeleteCustomersParams {
  id: string[]
}

export interface GetMachineParams {
  id: string
}

export interface UpdateCustomerPayload extends Customer {}
