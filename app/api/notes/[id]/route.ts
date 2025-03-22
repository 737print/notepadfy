import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Primeiro tenta encontrar por URL personalizada
    let note = await prisma.note.findFirst({
      where: { customUrl: params.id }
    })

    // Se não encontrar, tenta por ID
    if (!note) {
      note = await prisma.note.findUnique({
        where: { id: params.id }
      })
    }

    if (!note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      )
    }

    // Se a nota estiver protegida, retorna apenas os metadados
    if (note.isProtected) {
      return NextResponse.json({
        id: note.id,
        isProtected: note.isProtected,
        customUrl: note.customUrl
      })
    }

    return NextResponse.json(note)
  } catch (error) {
    console.error('GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { content, isProtected, password, customUrl } = await request.json()

    // Se tiver URL personalizada, verifica se já existe
    if (customUrl) {
      const existingNote = await prisma.note.findFirst({
        where: {
          customUrl,
          NOT: {
            OR: [
              { id: params.id },
              { customUrl: params.id }
            ]
          }
        }
      })

      if (existingNote) {
        return NextResponse.json(
          { error: 'This URL is already in use' },
          { status: 400 }
        )
      }
    }

    // Primeiro tenta encontrar a nota existente
    let existingNote = await prisma.note.findFirst({
      where: {
        OR: [
          { id: params.id },
          { customUrl: params.id }
        ]
      }
    })

    let note
    if (existingNote) {
      // Atualiza a nota existente
      note = await prisma.note.update({
        where: { id: existingNote.id },
        data: {
          content,
          isProtected: isProtected || false,
          password: isProtected ? password : null,
          customUrl: customUrl || null
        }
      })
    } else {
      // Cria uma nova nota
      note = await prisma.note.create({
        data: {
          id: params.id,
          content,
          isProtected: isProtected || false,
          password: isProtected ? password : null,
          customUrl: customUrl || null
        }
      })
    }

    return NextResponse.json(note)
  } catch (error) {
    console.error('POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 