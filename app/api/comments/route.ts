 
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json({ error: 'postId is required' }, { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'desc' },
      include: {
        replies: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    // Root comments only (replies are included in root comments)
    const rootComments = comments.filter(c => !c.parentId);
    return NextResponse.json(rootComments);
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { postId, author, content, avatar, parentId } = body;

    if (!postId || !author || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const session = await auth();
    const userId = session?.user?.id;

    const comment = await prisma.comment.create({
      data: {
        postId,
        author,
        content,
        avatar,
        parentId,
        userId: userId && userId !== "env-admin" ? userId : null,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error('Failed to create comment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
