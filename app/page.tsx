import {getCloudflareTimestamp, getNoCacheCloudflareTimestamp} from "@/app/service";
import Link from "next/link";

export default async function Home() {
  const timestamp = await getCloudflareTimestamp();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">{timestamp}</h1>
      <p>Fetched at {new Date().toISOString()}</p>
      <Link href="/child-page">Child Page</Link>
      <Link href="/edge-page">Edge Page</Link>
    </main>
  )
}
