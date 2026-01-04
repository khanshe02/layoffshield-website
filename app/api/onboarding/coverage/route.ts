import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseServer'

export async function POST(req: Request) {
  const body = await req.json()
  const { plan_name, coverage_months, monthly_payout } = body

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const onboardingDate = new Date()
  const waitingDays = 180
  const eligibleDate = new Date(onboardingDate)
  eligibleDate.setDate(eligibleDate.getDate() + waitingDays)

  const { error } = await supabase.from('coverage_contract').insert({
    user_id: user.id,
    plan_name,
    coverage_months,
    monthly_payout,
    max_total_payout: coverage_months * monthly_payout,
    onboarding_date: onboardingDate,
    waiting_period_days: waitingDays,
    claim_eligible_from: eligibleDate
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}