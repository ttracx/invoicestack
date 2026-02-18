import { NextRequest, NextResponse } from 'next/server'
// import { hash } from 'bcryptjs'
// import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, businessName } = await request.json()

    // For demo purposes, just return success
    // In production, you would save to database
    console.log('Registration attempt:', { name, email, businessName })

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}