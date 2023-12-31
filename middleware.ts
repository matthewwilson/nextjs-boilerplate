import {NextRequest, NextResponse} from "next/server";

const supportedLanguages: string[] = ["en-GB"];

export function middleware(request: NextRequest): NextResponse {
    const url = request.nextUrl.clone();
    const pathname = request.nextUrl.pathname;

    const pathnameIsMissingLocale = supportedLanguages.every(
        (language) => !pathname.startsWith(`/${language}/`) && pathname !== `/${language}`,
    );

    if (pathnameIsMissingLocale) {
        const locale = "en-GB"
        url.pathname = buildUrlPath(request, locale);
        return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
}

function buildUrlPath(request: NextRequest, locale: string): string {
    const pathname = removeLeadingAndTrailingSlashes(request.nextUrl.pathname);
    return `/${locale}/${pathname}`;
}

function removeLeadingAndTrailingSlashes(path: string): string {
    return path.replace(/^\/|\/$/g, "");
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        "/((?!api|_next/static|_next/image|favicon|sitemap.xml|en-GB).*)",
        {source: "/"},
        // Optional: only run on root (/) URL
        // '/'
    ],
};
