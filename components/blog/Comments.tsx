/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Heart, MessageCircle, Reply, User, Send, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import Image from '@/components/shared/Image';
import { cn } from '@/lib/utils';
import { Session } from 'next-auth';

interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  createdAt: string;
  likes: number;
  replies: Comment[];
  parentId?: string;
}

const CommentItem = ({ 
  comment, 
  depth = 0, 
  onReply, 
  replyTo, 
  setReplyTo,
  handleAddComment,
  newComment,
  setNewComment,
  session,
  onLike
}: { 
  comment: Comment, 
  depth?: number, 
  onReply: (id: string) => void,
  replyTo: string | null,
  setReplyTo: (id: string | null) => void,
  handleAddComment: (e: React.FormEvent) => void,
  newComment: string,
  setNewComment: (val: string) => void,
  session: any,
  onLike: (id: string) => void
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes);
  const [showReplies, setShowReplies] = useState(true);

  const handleLike = () => {
    if (!isLiked) {
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
      onLike(comment.id);
    }
  };

  const isReplying = replyTo === comment.id;

  return (
    <div className={cn("flex flex-col space-y-4", depth > 0 && "ml-4 md:ml-12 mt-4 border-l-2 border-gray-100 dark:border-gray-800 pl-4 md:pl-6")}>
      <div className="flex space-x-4">
        <div className="flex-shrink-0">
          {comment.avatar ? (
            <Image src={comment.avatar} alt={comment.author} width={40} height={40} className="w-10 h-10 rounded-full" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <User size={20} />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-bold text-sm text-gray-900 dark:text-gray-100">{comment.author}</span>
            <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {comment.content}
          </p>
          <div className="flex items-center space-x-4 mt-3">
            <button 
              onClick={handleLike}
              className={cn(
                "flex items-center space-x-1 text-xs font-medium transition-colors",
                isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
              )}
            >
              <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
              <span>{likesCount}</span>
            </button>
            <button 
              onClick={() => onReply(comment.id)}
              className={cn(
                "flex items-center space-x-1 text-xs font-medium transition-colors",
                isReplying ? "text-orange-500" : "text-gray-500 hover:text-orange-500"
              )}
            >
              <Reply size={14} />
              <span>답글</span>
            </button>
            {comment.replies && comment.replies.length > 0 && (
              <button 
                onClick={() => setShowReplies(!showReplies)}
                className="flex items-center space-x-1 text-xs font-medium text-gray-500 hover:text-blue-500 transition-colors"
              >
                {showReplies ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                <span>{showReplies ? "숨기기" : `답글 ${comment.replies.length}개`}</span>
              </button>
            )}
          </div>

          {/* Inline Reply Form */}
          {isReplying && (
            <form onSubmit={handleAddComment} className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="relative group">
                <textarea
                  autoFocus
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={`${comment.author}님에게 답글 달기...`}
                  className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm min-h-[80px] focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all resize-none shadow-inner"
                />
                <div className="flex justify-end mt-2 space-x-2">
                  <button 
                    type="button"
                    onClick={() => setReplyTo(null)}
                    className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-700 uppercase"
                  >
                    취소
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-1.5 bg-orange-600 text-white rounded-lg text-xs font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/20 flex items-center"
                  >
                    <Send size={14} className="mr-1" /> 등록
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      
      {showReplies && comment.replies && comment.replies.length > 0 && (
        <div className="space-y-4">
          {comment.replies.map(reply => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              depth={depth + 1} 
              onReply={onReply}
              replyTo={replyTo}
              setReplyTo={setReplyTo}
              handleAddComment={handleAddComment}
              newComment={newComment}
              setNewComment={setNewComment}
              session={session}
              onLike={onLike}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Comments({ postId }: { postId: string }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [totalLikes, setTotalLikes] = useState(0);
  const [isTotalLiked, setIsTotalLiked] = useState(false);
  const [totalViews, setTotalViews] = useState(0);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?postId=${encodeURIComponent(postId)}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (err) {
      console.error('Fetch comments error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`/api/post-stats/${encodeURIComponent(postId)}`);
      if (res.ok) {
        const data = await res.json();
        setTotalLikes(data.likes);
        setTotalViews(data.views);
      }
    } catch (err) {
      console.error('Fetch stats error:', err);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
    fetchStats();
  }, [fetchComments, fetchStats]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const authorName = session?.user?.name || session?.user?.email || 'Guest';
    const avatar = session?.user?.image || undefined;

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          author: authorName,
          content: newComment,
          avatar,
          parentId: replyTo
        }),
      });

      if (res.ok) {
        setNewComment('');
        setReplyTo(null);
        fetchComments(); // Refresh comments
      }
    } catch (err) {
      console.error('Post comment error:', err);
    }
  };

  const handleLikeComment = async (id: string) => {
    try {
      await fetch(`/api/comments/${id}/like`, { method: 'POST' });
    } catch (err) {
      console.error('Like comment error:', err);
    }
  };

  const handleLikeArticle = async () => {
    if (isTotalLiked) return;

    try {
      const res = await fetch(`/api/post-stats/${encodeURIComponent(postId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'like' }),
      });
      if (res.ok) {
        setTotalLikes(prev => prev + 1);
        setIsTotalLiked(true);
      }
    } catch (err) {
      console.error('Like article error:', err);
    }
  };

  return (
    <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-800">
      {/* Like Section */}
      <div className="flex flex-col items-center justify-center mb-12">
        <button 
          onClick={handleLikeArticle}
          disabled={isTotalLiked}
          className={cn(
            "group flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300",
            isTotalLiked ? "bg-red-50 dark:bg-red-900/10 cursor-default" : "bg-gray-50 dark:bg-gray-900/50 hover:bg-red-50 dark:hover:bg-red-900/10"
          )}
        >
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300",
            !isTotalLiked && "group-hover:scale-110",
            isTotalLiked ? "bg-red-500 text-white animate-pulse" : "bg-white dark:bg-gray-800 text-gray-400 group-hover:text-red-500"
          )}>
            <Heart size={32} fill={isTotalLiked ? "currentColor" : "none"} />
          </div>
          <span className={cn(
            "mt-4 text-lg font-bold",
            isTotalLiked ? "text-red-600 dark:text-red-400" : "text-gray-500 transition-colors"
          )}>
            {totalLikes}
          </span>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">이 글이 마음에 드셨나요?</p>
          <p className="text-[10px] text-gray-300 mt-2 uppercase font-medium">{totalViews} views</p>
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold flex items-center">
            <MessageCircle className="mr-3 text-orange-500" size={24} />
            Comments
            <span className="ml-3 px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 text-sm rounded-full">
              {/* Count all comments including nesting */}
              {(() => {
                const count = (list: Comment[]): number => 
                  list.reduce((acc, c) => acc + 1 + (c.replies ? count(c.replies) : 0), 0);
                return count(comments);
              })()}
            </span>
        </h3>
      </div>

      {/* Main Comment Form (Top level only) */}
      {!replyTo && (
        <form onSubmit={handleAddComment} className="mb-10 animate-in fade-in duration-500">
          <div className="relative group">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="게시글에 대한 생각을 남겨보세요..."
              className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 min-h-[120px] focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all resize-none shadow-sm group-hover:shadow-md"
            />
            <button 
              type="submit"
              className="absolute bottom-4 right-4 p-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/20"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      )}

      {/* Comments List */}
      <div className="space-y-10">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-orange-500" size={32} />
          </div>
        ) : comments.length > 0 ? (
          comments.map(comment => (
            <CommentItem 
              key={comment.id} 
              comment={comment} 
              onReply={setReplyTo} 
              replyTo={replyTo}
              setReplyTo={setReplyTo}
              handleAddComment={handleAddComment}
              newComment={newComment}
              setNewComment={setNewComment}
              session={session}
              onLike={handleLikeComment}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-400 font-medium italic">
            첫 번째 댓글을 남겨보세요!
          </div>
        )}
      </div>
    </div>
  );
}
