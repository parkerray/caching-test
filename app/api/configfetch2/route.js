import { NextResponse, NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(req) {
	const shouldRevalidate = req.nextUrl.searchParams.get('revalidate') === 1;
	console.log(shouldRevalidate);

	if (shouldRevalidate) {
		revalidatePath('/api/configfetch2');
		return NextResponse.json({ revalidated: true });
	} else {
		const response = await fetch(
			'https://api.vercel.com/v1/edge-config/ecfg_ywduxqx2s4ca8i61fw6z8rjimbrf/items',
			{
				headers: {
					Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
				},
				next: {
					revalidate: 300,
				},
			}
		);
		const responseBody = await response.json();

		const res = NextResponse.json(responseBody);

		res.headers.set(
			'Cache-Control',
			's-maxage=300, stale-while-revalidate=299'
		);

		return res;
	}
}
