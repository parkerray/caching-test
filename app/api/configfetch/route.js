import { NextResponse } from 'next/server';

export async function GET() {
	const response = await fetch(
		'https://api.vercel.com/v1/edge-config/ecfg_ywduxqx2s4ca8i61fw6z8rjimbrf/items',
		{
			headers: {
				Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
			},
			next: {
				revalidate: 60,
			},
		}
	);
	const responseBody = await response.json();

	const res = NextResponse.json(responseBody);

	res.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=59');

	return res;
}
