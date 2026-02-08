/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const period = searchParams.get('period') || 'all'; // all, today, week, month
  
  try {
    const now = new Date();
    let startDate: Date | undefined;

    if (period === 'today') {
      startDate = new Date(now.setHours(0, 0, 0, 0));
    } else if (period === 'week') {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (period === 'month') {
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // 1. Total Metrics (Filtered by period if applicable)
    let totalViews, totalLikes, totalBotViews;
    
    if (startDate) {
      const events = await prisma.analyticsEvent.findMany({
        where: {
          createdAt: { gte: startDate }
        }
      });
      
      totalViews = events.filter(e => e.type === 'VIEW' && !e.isBot).length;
      totalLikes = events.filter(e => e.type === 'LIKE').length;
      totalBotViews = events.filter(e => e.type === 'VIEW' && e.isBot).length;
    } else {
      // Fallback to total counts if 'all'
      const stats = await prisma.postStats.findMany();
      totalLikes = stats.reduce((acc, s) => acc + s.likes, 0);
      totalViews = stats.reduce((acc, s) => acc + s.views, 0);
      totalBotViews = stats.reduce((acc, s) => acc + (s as any).botViews || 0, 0);
    }

    const totalComments = await prisma.comment.count({
      where: startDate ? { createdAt: { gte: startDate } } : undefined
    });

    // 2. Real-time Visitors (Active in last 30 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    const liveVisitors = await prisma.analyticsEvent.count({
      where: {
        type: 'VIEW',
        isBot: false,
        createdAt: { gte: fiveMinutesAgo }
      }
    });

    // 3. Top Posts (Real Data)
    const topPosts = await prisma.postStats.findMany({
      take: 5,
      orderBy: { views: 'desc' },
    });

    // 4. Daily Views (Last 7 days)
    const dailyViews: any[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const start = new Date(d.setHours(0, 0, 0, 0));
      const end = new Date(d.setHours(23, 59, 59, 999));
      
      const count = await prisma.analyticsEvent.count({
        where: {
          type: 'VIEW',
          isBot: false,
          createdAt: { gte: start, lte: end }
        }
      });
      
      dailyViews.push({
        name: d.toLocaleDateString('en-US', { weekday: 'short' }),
        views: count
      });
    }

    // 5. Recent Activity
    const recentComments = await prisma.comment.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        author: true,
        content: true,
        postId: true,
        createdAt: true,
      }
    });

    // 6. Top Countries & Referrers
    // @ts-ignore
    const topCountriesGroup = await prisma.analyticsEvent.groupBy({
      by: ['country'],
      _count: { _all: true },
      orderBy: { _count: { country: 'desc' } },
      where: {
        country: { not: null },
        // @ts-ignore
        createdAt: startDate ? { gte: startDate } : undefined
      },
      take: 5,
    });
    // @ts-ignore
    const topCountries = topCountriesGroup.map((g: any) => ({ 
      country: g.country || 'Unknown', 
      count: g._count._all 
    }));

    // @ts-ignore
    const topReferrersGroup = await prisma.analyticsEvent.groupBy({
      by: ['referrer'],
      _count: { _all: true },
      orderBy: { _count: { referrer: 'desc' } },
      where: {
        referrer: { not: null },
        // @ts-ignore
        createdAt: startDate ? { gte: startDate } : undefined
      },
      take: 5,
    });
    // @ts-ignore
    const topReferrers = topReferrersGroup.map((g: any) => ({
      referrer: g.referrer || 'Direct',
      count: g._count._all
    }));

    // 8. Top Devices
    // @ts-ignore
    const topDevicesGroup = await prisma.analyticsEvent.groupBy({
      by: ['device'],
      _count: { _all: true },
      where: {
        device: { not: null },
        // @ts-ignore
        createdAt: startDate ? { gte: startDate } : undefined
      },
    });

    // @ts-ignore
    const topDevices = topDevicesGroup.map((g: any) => ({
      name: (g.device || 'desktop').charAt(0).toUpperCase() + (g.device || 'desktop').slice(1),
      value: g._count._all
    }));

    return NextResponse.json({
      totalComments,
      totalLikes,
      totalViews,
      totalBotViews,
      liveVisitors,
      recentComments,
      topPosts,
      dailyViews,
      topCountries,
      topReferrers,
      topDevices,
      period
    });
  } catch (error: any) {
    console.error('Failed to fetch admin stats:', error);
    return NextResponse.json({
      error: 'Internal Server Error',
      message: error.message
    }, { status: 500 });
  }
}
