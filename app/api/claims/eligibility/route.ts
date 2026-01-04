import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const CLAIMS_TABLE = 'CLAIMS_TABLE_NAME'
const SUBSCRIPTIONS_TABLE = 'subscriptions'

export async function POST(req: Request) {
  const { user_id } = await req.json()

  if (!user_id) {
    return NextResponse.json({ eligible: false, reason: 'NO_USER' })
  }

  const today = new Date().toISOString().split('T')[0]

  /* 1. Active subscription check */
  const { data: subscription } = await supabase
    .from(SUBSCRIPTIONS_TABLE)
    .select('*')
    .eq('user_id', user_id)
    .eq('status', 'active')
    .single()

  if (!subscription) {
    return NextResponse.json({
      eligible: false,
      reason: 'NO_SUBSCRIPTION'
    })
  }

  /* 2. Waiting period check */
  if (today < subscription.eligible_from) {
    return NextResponse.json({
      eligible: false,
      reason: 'WAITING_PERIOD',
      eligible_from: subscription.eligible_from
    })
  }

  /* 3. Existing claim check */
  const { data: existingClaim } = await supabase
    .from(CLAIMS_TABLE)
    .select('id')
    .eq('user_id', user_id)
    .in('status', ['pending', 'approved'])
    .maybeSingle()

  if (existingClaim) {
    return NextResponse.json({
      eligible: false,
      reason: 'ALREADY_CLAIMED'
    })
  }

  return NextResponse.json({
    eligible: true,
    reason: null
  })
}