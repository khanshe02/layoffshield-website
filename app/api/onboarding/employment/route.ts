import { NextResponse } from 'next/server'
import { supabaseServer } from "@/lib/supabaseServer";
 from '@/lib/supabaseServer'

export async function POST(req: Request) {
  const body = await req.json()

  const {
    employer_name,
    employer_domain,
    employment_type,
    job_start_date,
    declared_salary,
    role_category
  } = body

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { error } = await supabase.from('onboarding_employment').insert({
    user_id: user.id,
    employer_name,
    employer_domain,
    employment_type,
    job_start_date,
    declared_salary,
    role_category
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}