import { allBlogs } from 'contentlayer/generated';
import { NextResponse } from 'next/server';

export async function GET() {
  // Sort by Date Descending
  const posts = allBlogs
    .filter((post) => !post.draft && post.title) // Exclude drafts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Simplify payload for external homepage
  const payload = posts.map((post) => ({
    title: post.title,
    summary: post.summary,
    date: post.date,
    url: `https://blog.exasolution.com/${post.path}`, // TODO: Update domain
    tags: post.tags,
    category: post.path.split('/')[2] || 'General',
    thumbnail: post.images?.[0] || null,
  }));

  return NextResponse.json(payload);
}
