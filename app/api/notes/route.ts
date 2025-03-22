import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { id, content, isProtected, password, customUrl } = await request.json()

    const note = await prisma.note.upsert({
      where: { id },
      update: {
        content,
        isProtected,
        password,
        customUrl,
      },
      create: {
        id,
        content,
        isProtected,
        password,
        customUrl,
      },
    })

    return NextResponse.json(note)
  } catch (error) {
    console.error('Error saving note:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 