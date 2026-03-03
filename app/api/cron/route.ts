import { NextResponse } from 'next/server'

const BASE_URL = 'https://www.filetoolworks.com'
const INDEXNOW_KEY = '6a0e17fe43174fd68eb13a7bd32c26f3'

async function getAllUrlsFromSitemap(): Promise<string[]> {
  try {
    const res = await fetch(`${BASE_URL}/sitemap.xml`, {
      headers: { 'Accept': 'application/xml' },
    })
    if (!res.ok) return []
    const xml = await res.text()
    const urls: string[] = []
    const locRegex = /<loc>([^<]+)<\/loc>/g
    let match
    while ((match = locRegex.exec(xml)) !== null) {
      urls.push(match[1])
    }
    return urls
  } catch {
    return []
  }
}

async function pingIndexNow(endpoint: string, urls: string[]): Promise<{ ok: boolean; status: number; urlCount: number }> {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'www.filetoolworks.com',
        key: INDEXNOW_KEY,
        keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    })
    return { ok: res.ok, status: res.status, urlCount: urls.length }
  } catch {
    return { ok: false, status: 0, urlCount: urls.length }
  }
}

async function pingYandexSitemap(): Promise<{ ok: boolean; status: number }> {
  try {
    const res = await fetch(
      `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(`${BASE_URL}/sitemap.xml`)}`,
    )
    return { ok: res.ok, status: res.status }
  } catch {
    return { ok: false, status: 0 }
  }
}

async function pingWebSub(): Promise<{ ok: boolean; status: number }> {
  try {
    const res = await fetch('https://pubsubhubbub.appspot.com/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `hub.mode=publish&hub.url=${encodeURIComponent(`${BASE_URL}/feed.xml`)}`,
    })
    return { ok: res.ok || res.status === 204, status: res.status }
  } catch {
    return { ok: false, status: 0 }
  }
}

export async function GET(request: Request) {
  // Verify cron secret if set (Vercel sends Authorization header for cron jobs)
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Dynamically fetch ALL URLs from sitemap (tools + blog posts + assets)
  const allUrls = await getAllUrlsFromSitemap()

  const results = {
    timestamp: new Date().toISOString(),
    urlCount: allUrls.length,
    indexNowApi: await pingIndexNow('https://api.indexnow.org/IndexNow', allUrls),
    indexNowBing: await pingIndexNow('https://www.bing.com/IndexNow', allUrls),
    indexNowYandex: await pingIndexNow('https://yandex.com/indexnow', allUrls),
    yandexSitemap: await pingYandexSitemap(),
    webSub: await pingWebSub(),
  }

  return NextResponse.json(results)
}
