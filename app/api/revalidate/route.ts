import {NextRequest, NextResponse} from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret')

    if (secret !== process.env.WEBHOOK_SECRET) {
        new NextResponse(JSON.stringify({ message: "invalid secret" }), { status: 401 });
    }

    const tagPrefix = process.env.VERCEL_GIT_COMMIT_SHA ?? "";

    console.log("revalidating cloudflare tag");
    revalidateTag(`${tagPrefix}:cloudflare`);

    return new NextResponse(JSON.stringify({ revalidated: true, now: Date.now()}));
}