import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isbot } from 'isbot';

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ postId: string }> }
) {
  const params = await props.params;
  const { postId } = params;
  const userAgent = req.headers.get('user-agent') || '';
  const isABot = isbot(userAgent);

  try {
    let stats = await prisma.postStats.findUnique({
      where: { postId },
    });

    if (!stats) {
      stats = await prisma.postStats.create({
        data: { 
          postId, 
          views: isABot ? 0 : 1,
          botViews: isABot ? 1 : 0
        },
      });
    } else {
      stats = await prisma.postStats.update({
        where: { postId },
        data: { 
          views: isABot ? undefined : { increment: 1 },
          botViews: isABot ? { increment: 1 } : undefined
        },
      });
    }

    // Device Detection
    let device = 'desktop';
    if (/mobile/i.test(userAgent)) device = 'mobile';
    if (/tablet|ipad/i.test(userAgent)) device = 'tablet';

    const referrer = req.headers.get('referer') || null;
    const country = req.headers.get('x-vercel-ip-country') || null;

    // NEW: Log granular event for time-period tracking with enhanced metadata
    // @ts-ignore
    await prisma.analyticsEvent.create({
      data: {
        type: 'VIEW',
        postId,
        isBot: isABot,
        device,
        referrer,
        country
      }
    });

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  props: { params: Promise<{ postId: string }> }
) {
  const params = await props.params;
  const { postId } = params;
  const { action } = await req.json();

  try {
    if (action === 'like') {
      const stats = await prisma.postStats.upsert({
        where: { postId },
        create: { postId, likes: 1 },
        update: { likes: { increment: 1 } },
      });

      // Device Detection for Likes
      const userAgent = req.headers.get('user-agent') || '';
      let device = 'desktop';
      if (/mobile/i.test(userAgent)) device = 'mobile';
      if (/tablet|ipad/i.test(userAgent)) device = 'tablet';

      const referrer = req.headers.get('referer') || null;
      const country = req.headers.get('x-vercel-ip-country') || null;

      // Log granular event
      // @ts-ignore
      await prisma.analyticsEvent.create({
        data: {
          type: 'LIKE',
          postId,
          isBot: false, // Likes are assumed human here
          device,
          referrer,
          country
        }
      });

      return NextResponse.json(stats);
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
