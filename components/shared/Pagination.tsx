'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
        {/* Previous Button */}
        <div>
          {currentPage > 1 && (
            <Link
              href={createPageURL(currentPage - 1)}
              rel="prev"
              className="text-orange-600 hover:text-orange-700 font-bold"
            >
              &larr; Previous
            </Link>
          )}
        </div>

        {/* Page Numbers */}
        <span className="text-sm text-gray-500 font-medium">
          {currentPage} / {totalPages}
        </span>

        {/* Next Button */}
        <div>
          {currentPage < totalPages && (
            <Link
              href={createPageURL(currentPage + 1)}
              rel="next"
              className="text-orange-600 hover:text-orange-700 font-bold"
            >
              Next &rarr;
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
