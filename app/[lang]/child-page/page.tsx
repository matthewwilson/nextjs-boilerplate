import {getCloudflareTimestamp} from "@/app/[lang]/service";
import Link from "next/link";

interface Params {
    lang: "en-GB";
}

export function generateStaticParams(): Params[] {
    return [{ lang: "en-GB" }];
}

export default async function ChildPage() {
    const timestamp = await getCloudflareTimestamp(4000, "edge");
    return (
        <main className="flex flex-col items-center justify-between p-24">
            <div className="p-4">
                <h1 className="text-4xl font-bold text-center">{timestamp}</h1>
                <p>Fetched at {new Date().toISOString()}</p>
            </div>
            <div className="p-4 flex flex-col items-center">
                <Link href="/" prefetch={false}>Home Page</Link>
            </div>
        </main>
    )
}
