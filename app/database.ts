export interface Ticket {
  id: number
  name: string
  status: 'open' | 'closed'
  type: 'bug' | 'feature' | 'refactor'
}

const tickets: Ticket[] = [
  { id: 1, name: 'Fix Next.js API route', status: 'open', type: 'bug' },
  {
    id: 2,
    name: 'Add the password recovery feature',
    status: 'open',
    type: 'feature'
  },
  {
    id: 3,
    name: 'Refactor the app for no reasons',
    status: 'open',
    type: 'refactor'
  },
  {
    id: 4,
    name: 'Upgrade dependencies',
    status: 'open',
    type: 'refactor'
  }
]

export default tickets
