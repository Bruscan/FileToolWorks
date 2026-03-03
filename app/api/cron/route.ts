import { NextResponse } from 'next/server'

const BASE_URL = 'https://www.filetoolworks.com'
const INDEXNOW_KEY = '6a0e17fe43174fd68eb13a7bd32c26f3'

// Top priority URLs to submit (tools + key pages)
const TOP_URLS = [
  '',
  '/compress-audio',
  '/compress-video',
  '/remove-background',
  '/merge-pdf',
  '/sign-pdf',
  '/word-to-pdf',
  '/image-to-pdf',
  '/video-to-gif',
  '/resize-image',
  '/compress-mp3',
  '/svg-to-png',
  '/png-to-pdf',
  '/webm-to-mp4',
  '/mkv-to-mp4',
  '/avi-to-mp4',
  '/gif-to-mp4',
  '/aac-to-mp3',
  '/ogg-to-mp3',
  '/compress-jpg',
  '/compress-png',
  '/flac-to-mp3',
  '/m4a-to-mp3',
  '/mov-to-mp4',
  '/mp4-to-mp3',
  '/image-to-text',
  '/compress-image',
  '/crop-image',
  '/blur-image',
  '/sharpen-image',
  '/rotate-image',
  '/jpg-to-pdf',
  '/png-to-jpg',
  '/jpg-to-png',
  '/image-to-webp',
  '/webp-to-png',
  '/video-to-mp4',
  '/video-to-webm',
  '/trim-video',
  '/trim-audio',
  '/extract-audio',
  '/wav-to-mp3',
  '/mp3-to-wav',
  '/pdf-to-text',
  '/extract-pdf-pages',
  '/html-to-pdf',
  '/excel-to-pdf',
  '/zip-files',
  '/unzip-files',
  '/tools',
  '/blog',
  '/file-formats',
  '/file-size-limits',
  '/privacy-comparison',
  '/security',
  '/compress-video-for-discord',
  '/compress-video-for-whatsapp',
  '/compress-audio-for-discord',
  '/compress-video-for-email',
  // Tool pages previously missing
  '/heic-to-jpg',
  '/webp-to-jpg',
  '/compress-pdf',
  '/split-pdf',
  '/ppt-to-pdf',
  '/pdf-to-jpg',
  '/image-to-heic',
  // VS comparison pages (high-intent "alternatives" queries)
  '/vs/convertio',
  '/vs/ilovepdf',
  '/vs/cloudconvert',
  '/vs/zamzar',
  '/vs/smallpdf',
  '/vs/freeconvert',
  '/vs/pdf24',
  '/vs/online-convert',
  '/vs/media-io',
  '/vs/xconvert',
  '/vs/adobe-acrobat',
  '/vs/handbrake',
  '/vs/tinypng',
  '/vs/powercompress',
  '/vs/ezyzip',
  // Linkable assets
  '/compare',
  '/file-size-calculator',
  '/format-finder',
  '/format-guide',
  '/free-tools-widget',
  '/is-my-converter-safe',
  // Trust pages (E-E-A-T)
  '/about',
  '/contact',
  '/privacy',
  '/terms',
].map(path => `${BASE_URL}${path}`)

async function pingIndexNow(endpoint: string): Promise<{ ok: boolean; status: number }> {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'www.filetoolworks.com',
        key: INDEXNOW_KEY,
        keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: TOP_URLS,
      }),
    })
    return { ok: res.ok, status: res.status }
  } catch {
    return { ok: false, status: 0 }
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

  const results = {
    timestamp: new Date().toISOString(),
    urlCount: TOP_URLS.length,
    indexNowApi: await pingIndexNow('https://api.indexnow.org/IndexNow'),
    indexNowBing: await pingIndexNow('https://www.bing.com/IndexNow'),
    indexNowYandex: await pingIndexNow('https://yandex.com/indexnow'),
    yandexSitemap: await pingYandexSitemap(),
    webSub: await pingWebSub(),
  }

  return NextResponse.json(results)
}
