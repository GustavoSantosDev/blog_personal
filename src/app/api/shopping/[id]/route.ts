import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { auth } from '@/lib/auth'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { completed } = body

    if (typeof completed !== 'boolean') {
      return NextResponse.json({ error: 'Completed status is required' }, { status: 400 })
    }

    // Check if user owns this item
    const { data: item, error: fetchError } = await supabase
      .from('shopping_items')
      .select('user_id')
      .eq('id', id)
      .single()

    if (fetchError || !item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    if (item.user_id !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { data, error } = await supabase
      .from('shopping_items')
      .update({ completed })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating shopping item:', error)
      return NextResponse.json({ error: 'Failed to update shopping item' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in PATCH /api/shopping/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}