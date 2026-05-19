import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // Only handle files ending with .html (Google / Bing verification files)
  if (!filename.toLowerCase().endsWith('.html')) {
    return new NextResponse("Not Found", { status: 404 });
  }

  try {
    // Dynamically determine the backend URL
    const apiBaseUrl = process.env.NODE_ENV === 'development'
      ? 'http://localhost:5002/api'
      : (process.env.NEXT_PUBLIC_API_URL || 'https://europackindia.com/api');

    const res = await fetch(`${apiBaseUrl}/site-settings/file/${filename}`, {
      next: { revalidate: 60 } // Cache the response for 1 minute
    });

    if (!res.ok) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const htmlContent = await res.text();
    
    return new NextResponse(htmlContent, {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "public, max-age=60, s-maxage=60"
      },
    });
  } catch (err) {
    console.error("Error serving dynamic verification file:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
