import {getCloudflareTimestamp} from "@/app/[lang]/service";
import Link from "next/link";

export const dynamic = "force-static";

export default async function Home() {
  const timestamp = await getCloudflareTimestamp(100, "home");
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="p-4">
        <h1 className="text-4xl font-bold text-center">{timestamp}</h1>
        <p>Fetched at {new Date().toISOString()}</p>
      </div>
      <div className="p-4 flex flex-col items-center">
        <Link href="/child-page" prefetch={false}>Child Page</Link>
      </div>
    </main>
  )
}
