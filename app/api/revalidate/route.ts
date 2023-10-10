import {NextRequest, NextResponse} from 'next/server'
import { revalidateTag } from 'next/cache'

export const runtime = "edge";

export async function POST(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret')

    if (secret !== process.env.WEBHOOK_SECRET) {
        new NextResponse(JSON.stringify({ message: "invalid secret" }), { status: 401 });
    }

    console.log("revalidating cloudflare tag");
    revalidateTag("cloudflare");

    return new NextResponse(JSON.stringify({ revalidated: true, now: Date.now()}));
}