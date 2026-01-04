export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import supabase from '../../../src/supabase/supabaseServer'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('claims')
      .select('*')

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    )
  }
}