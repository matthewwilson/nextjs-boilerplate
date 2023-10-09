export async function getCloudflareTimestamp(): Promise<string> {
    const result = await fetch("https://1.1.1.1/cdn-cgi/trace", {
        next: {
            tags: ["cloudflare"]
        }
    });

    return await parseTimestamp(result);
}

export async function getNoCacheCloudflareTimestamp(): Promise<string> {
    const result = await fetch("https://1.1.1.1/cdn-cgi/trace", {
        next: {
           revalidate: 0,
        }
    });

    return await parseTimestamp(result);
}

async function parseTimestamp(result: Response) {
    const body = await result.text();

    let arr = body.trim().split('\n').map(e => e.split('='))
    const json = Object.fromEntries(arr)

    console.log("Got timestamp", json.ts);

    return json.ts;
}