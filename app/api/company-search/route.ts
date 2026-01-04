import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')

  if (!query || query.length < 2) {
    return NextResponse.json([])
  }

  const res = await fetch(
    `https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(
      query
    )}`
  )

  if (!res.ok) {
    return NextResponse.json([])
  }

  const data = await res.json()

  return NextResponse.json(
    data.map((c: any) => ({
      name: c.name,
      domain: c.domain
    }))
  )
}