import type { Ticket } from '@/app/database'
import tickets from '@/app/database'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<Ticket | undefined>> {
  const { id } = await params
  const ticket = tickets.find((ticket) => ticket.id === Number.parseInt(id))

  return NextResponse.json(ticket)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<Ticket | Error>> {
  const { id } = await params
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- OK
  const { name, status, type } = (await request.json()) as Omit<
    Partial<Ticket>,
    'id'
  >

  const ticket = tickets.find((ticket) => ticket.id === Number.parseInt(id))

  if (!ticket) {
    return NextResponse.json(new Error('Ticket not found'), { status: 404 })
  }

  if (name) ticket.name = name
  if (status) ticket.status = status
  if (type) ticket.type = type

  return NextResponse.json(ticket)
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<Ticket | Error>> {
  const { id } = await params

  const ticketIndex = tickets.findIndex(
    (ticket) => ticket.id === Number.parseInt(id)
  )

  if (ticketIndex === -1) {
    return NextResponse.json(new Error('Ticket not found'), { status: 404 })
  }

  const deletedTickets = tickets.splice(ticketIndex, 1)

  return NextResponse.json(deletedTickets[0])
}
