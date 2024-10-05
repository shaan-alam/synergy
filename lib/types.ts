export interface User {
  id: number
  name: string
  email: string
  phone: string
  username: string
  website: string
  company: {
    name: string
  }
  address: {
    street: string
    city: string
  }
}