import fetchRetry from "fetch-retry";

export async function getCloudflareTimestamp(): Promise<string> {
    const response = await fetchRetry((url, req) =>
        fetch(url, {
            ...req,
            next: {
                tags: ["cloudflare"]
            }
        }),
    )("https://1.1.1.1/cdn-cgi/trace");

    return await parseTimestamp(response);
}

async function parseTimestamp(result: Response) {
    const body = await result.text();

    let arr = body.trim().split('\n').map(e => e.split('='))
    const json = Object.fromEntries(arr)

    console.log("Got timestamp", json.ts);

    return json.ts;
}