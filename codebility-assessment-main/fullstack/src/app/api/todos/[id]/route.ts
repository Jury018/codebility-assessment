import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { sanitizeTodoTitle, sanitizeBoolean, sanitizeUuid, checkRateLimit } from '@/lib/sanitize'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { id } = await params
    
    // Validate UUID
    try {
      sanitizeUuid(id)
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid todo ID' },
        { status: 400 }
      )
    }
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Rate limiting
    if (!checkRateLimit(user.id, 100, 60000)) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { title, completed } = body

    const updateData: any = {}
    
    if (title !== undefined) {
      try {
        updateData.title = sanitizeTodoTitle(title)
      } catch (error) {
        return NextResponse.json(
          { error: error instanceof Error ? error.message : 'Invalid title' },
          { status: 400 }
        )
      }
    }
    

    if (completed !== undefined) {
      try {
        updateData.completed = sanitizeBoolean(completed)
      } catch (error) {
        return NextResponse.json(
          { error: 'Invalid completed value' },
          { status: 400 }
        )
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      )
    }

    const { data: todo, error } = await supabase
      .from('todos')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    if (!todo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ todo })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { id } = await params
    
    try {
      sanitizeUuid(id)
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid todo ID' },
        { status: 400 }
      )
    }
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!checkRateLimit(user.id, 100, 60000)) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }

    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
