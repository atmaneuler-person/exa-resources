import { allBlogs } from 'contentlayer/generated';
import { NextResponse } from 'next/server';

export async function GET() {
  // Sort by Date Descending
  const posts = allBlogs
    .filter((post) => {
      const isDocs = post._raw.sourceFilePath.toLowerCase().split('/').includes('docs');
      return !post.draft && post.title && !isDocs;
    }) // Exclude drafts and Docs
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
