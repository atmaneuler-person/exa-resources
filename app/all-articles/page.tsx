import { allCoreContent, sortPosts } from '@shipixen/pliny/utils/contentlayer';
import { allBlogs, allAuthors } from 'contentlayer/generated';
import { genPageMetadata } from 'app/seo';
import { POSTS_PER_PAGE } from '@/app/all-articles/settings';
import ListLayout from '@/layouts/ListLayoutWithTags';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export const metadata = genPageMetadata({ title: 'Blog' });

export default function BlogPage() {
  const sortedPosts = sortPosts(allBlogs).filter(
    (p) =>
      p._raw.flattenedPath.includes('/ko/') &&
      !p._raw.flattenedPath.includes('/vi/') &&
      !p._raw.flattenedPath.includes('/zh/') &&
      (process.env.NODE_ENV === 'development' || p.draft !== true)
  );
  const posts = allCoreContent(sortedPosts).map((post, index) => ({
    ...post,
    images: sortedPosts[index].images,
  }));
  const pageNumber = 1;
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber,
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return (
    <div className="flex flex-col w-full items-center justify-between">
      <Header />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Articles (KO)"
      />
      <Footer />
    </div>
  );
}
