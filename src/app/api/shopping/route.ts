import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { auth } from '@/lib/auth'

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('shopping_items')
      .select('*')
      .eq('user_id', session.user.id)
      .order('completed', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching shopping items:', error)
      return NextResponse.json({ error: 'Failed to fetch shopping items' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET /api/shopping:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, category, quantity } = body

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('shopping_items')
      .insert({
        name,
        category: category || null,
        quantity: quantity || 1,
        user_id: session.user.id,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating shopping item:', error)
      return NextResponse.json({ error: 'Failed to create shopping item' }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/shopping:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}