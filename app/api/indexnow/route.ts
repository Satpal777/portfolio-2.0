import { NextResponse } from 'next/server';

// IndexNow instantly notifies Bing, Yandex, Seznam and Naver about new or
// updated URLs. Hit GET /api/indexnow after a deploy to submit the site.
// Google does not support IndexNow — use Search Console for Google.

export const dynamic = 'force-dynamic';

const HOST = 'www.satpal.cloud';
const KEY = 'b4c882a346938dbd5ea305817625b8e0';
const URLS = [`https://${HOST}/`, `https://${HOST}/projects`];

export async function GET() {
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `https://${HOST}/${KEY}.txt`,
        urlList: URLS,
      }),
    });

    return NextResponse.json({
      submitted: URLS,
      indexNowStatus: res.status,
      ok: res.ok,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'IndexNow submission failed', detail: String(error) },
      { status: 502 },
    );
  }
}
