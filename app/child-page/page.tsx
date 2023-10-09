import {getCloudflareTimestamp} from "@/app/service";
import Link from "next/link";

export default async function ChildPage() {
    const timestamp = await getCloudflareTimestamp();
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold text-center">{timestamp}</h1>
            <p>Child Page Fetched at {new Date().toISOString()}</p>
            <Link href="/">Home Page</Link>
        </main>
    )
}
