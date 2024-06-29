import { NextResponse } from 'next/server';
import { getAll } from '@vercel/edge-config';

export async function GET() {
	const configItems = await getAll();
	return NextResponse.json(configItems);
}
