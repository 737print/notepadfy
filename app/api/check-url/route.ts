import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    // Verifica se a URL já está em uso
    const existingNote = await prisma.note.findUnique({
      where: { customUrl: url },
    })

    return NextResponse.json({ available: !existingNote })
  } catch (error) {
    console.error('Erro ao verificar URL:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor', available: false },
      { status: 500 }
    )
  }
} 