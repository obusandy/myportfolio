import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      'https://meechum.vercel.app/api/public-bookmarks?curator_handle=recorder-152c&limit=3',
      {
        next: { revalidate: 300 }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Meechum thoughts:', error);
    return NextResponse.json(
      { thoughts: [], username: '', meechumUrl: '', error: 'Failed to load thoughts' },
      { status: 500 }
    );
  }
}