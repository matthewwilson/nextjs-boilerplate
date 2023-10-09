import {getCloudflareTimestamp} from "@/app/service";
import Link from "next/link";

export const runtime = "edge";

export default async function EdgePage() {
    const timestamp = await getCloudflareTimestamp();
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold text-center">{timestamp}</h1>
            <p>Edge Page Fetched at {new Date().toISOString()}</p>
            <Link href="/">Home Page</Link>
            <Link href="/child-page">Child Page</Link>
        </main>
    )
}
