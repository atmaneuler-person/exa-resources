'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MessageSquare, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

interface Comment {
  id: string;
  postId: string;
  author: string;
  avatar?: string;
  content: string;
  createdAt: string;
  likes: number;
  parentId?: string;
  replies?: Comment[];
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function AdminCommentsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchComments(currentPage);
    }
  }, [status, currentPage]);

  const fetchComments = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/comments?page=${page}&limit=20`);
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  const getPostTitle = (postId: string) => {
    // Extract title from postId (e.g., "posts/ko/AI/rl1-intro" -> "rl1-intro")
    const parts = postId.split('/');
    return parts[parts.length - 1];
  };

  const goToPost = (postId: string) => {
    router.push(`/${postId}`);
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#020617]">
      <Header />
      
      <main className="flex-grow pt-20 pb-12">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">댓글 관리</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              전체 댓글 {pagination.total}개
            </p>
          </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            {/* Comment Header */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                {comment.avatar ? (
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                    {comment.author[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-semibold">{comment.author}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => goToPost(comment.postId)}
                className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                포스트 보기
              </button>
            </div>

            {/* Post Info */}
            <div className="mb-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MessageSquare className="h-4 w-4" />
              <span>{getPostTitle(comment.postId)}</span>
            </div>

            {/* Comment Content */}
            <div className="mb-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
              <p className="whitespace-pre-wrap">{comment.content}</p>
            </div>

            {/* Comment Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>❤️ {comment.likes} 좋아요</span>
              {comment.replies && comment.replies.length > 0 && (
                <span>💬 {comment.replies.length} 답글</span>
              )}
            </div>

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-4 space-y-3 border-l-2 border-gray-300 pl-4 dark:border-gray-600">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="font-semibold text-sm">{reply.author}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(reply.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-gray-300 p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:hover:bg-gray-800"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              let pageNum;
              if (pagination.totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= pagination.totalPages - 2) {
                pageNum = pagination.totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`h-10 w-10 rounded-lg ${
                    currentPage === pageNum
                      ? 'bg-blue-500 text-white'
                      : 'border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={currentPage === pagination.totalPages}
            className="rounded-lg border border-gray-300 p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:hover:bg-gray-800"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {comments.length === 0 && !loading && (
        <div className="py-12 text-center text-gray-500 dark:text-gray-400">
          아직 댓글이 없습니다.
        </div>
      )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
