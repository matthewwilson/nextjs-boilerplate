import fetchRetry from "fetch-retry";

export async function getCloudflareTimestamp(delayInMs: number, page: "home" | "child" | "edge"): Promise<string> {
    //const tagPrefix = process.env.VERCEL_GIT_COMMIT_SHA ?? "";

    await delay(delayInMs);

    const response = await fetchRetry((url, req) =>
        fetch(url, {
            ...req,
            next: {
                tags: ["cloudflare"]
            }
        }),
    )("https://1.1.1.1/cdn-cgi/trace");

    return await parseTimestamp(response, page);
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

async function parseTimestamp(result: Response, page: "home" | "child" | "edge"): Promise<string> {
    const body = await result.text();

    let arr = body.trim().split('\n').map(e => e.split('='))
    const json = Object.fromEntries(arr)

    console.log(`Got timestamp for page: ${page}`, json.ts);

    return json.ts;
}