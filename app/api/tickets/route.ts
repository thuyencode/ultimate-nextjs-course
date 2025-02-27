import tickets, { type Ticket } from '@/app/database'
import { NextResponse, type NextRequest } from 'next/server'

export function GET(request: NextRequest): NextResponse<Ticket[]> {
  const { searchParams } = request.nextUrl
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json(tickets)
  }

  const filteredTickets = tickets.filter((ticket) =>
    ticket.name.toLowerCase().includes(query.toLowerCase())
  )

  return NextResponse.json(filteredTickets)
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<Ticket>> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- OK
  const ticket = (await request.json()) as Omit<Ticket, 'id'>
  const length = tickets.push({ id: tickets.length + 1, ...ticket })

  return NextResponse.json(tickets[length - 1])
}
