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

    await delay(4000);

    return await parseTimestamp(response);
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

async function parseTimestamp(result: Response) {
    const body = await result.text();

    let arr = body.trim().split('\n').map(e => e.split('='))
    const json = Object.fromEntries(arr)

    console.log("Got timestamp", json.ts);

    return json.ts;
}