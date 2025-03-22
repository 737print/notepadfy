import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { password } = await request.json()

    // Busca a nota pelo ID ou URL personalizada
    const note = await prisma.note.findFirst({
      where: {
        OR: [
          { id: params.id },
          { customUrl: params.id }
        ]
      }
    })

    if (!note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      )
    }

    // Verifica se a nota está protegida e se a senha está correta
    if (!note.isProtected) {
      return NextResponse.json(note)
    }

    if (note.password !== password) {
      return NextResponse.json(
        { error: 'Incorrect password' },
        { status: 401 }
      )
    }

    return NextResponse.json(note)
  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 