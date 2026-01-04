import { supabase } from './supabaseServer'

export type ClaimInput = {
  employer_name: string
  last_salary: number
  job_loss_date: string
}

export async function createClaim(data: ClaimInput) {
  const { data: claim, error } = await supabase
    .from('claims')
    .insert([
      {
        employer_name: data.employer_name,
        last_salary: data.last_salary,
        job_loss_date: data.job_loss_date,
        status: 'submitted',
      },
    ])
    .select()
    .single()

  if (error) {
    throw error
  }

  return claim
}