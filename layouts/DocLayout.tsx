/**
 * ===========================================================================================
 * DocLayout.tsx — Docs 전용 2단계 사이드바 레이아웃
 * ===========================================================================================
 *
 * [아키텍처 요약]
 * - Docs 콘텐츠만을 위한 레이아웃. 블로그(Blog)에는 절대 영향 없음.
 * - 물리적 폴더 구조에서 섹션/서브섹션을 자동 파싱하여 사이드바를 생성.
 * - 3단계 정렬: sectionOrder → subSectionOrder → order
 *
 * [폴더 → 사이드바 매핑 규칙]
 * ┌─────────────────────────────────────────────────────────────┐
 * │ 물리 경로                           │ 사이드바 위치          │
 * │ Docs/intro.mdx                     │ General               │
 * │ Docs/EXAWin/intro.mdx              │ EXAWin (루트)          │
 * │ Docs/EXAWin/Theory/BAT-prior.mdx   │ EXAWin > Theory       │
 * │ Docs/EXAWin/Manual/M-stage.mdx     │ EXAWin > Manual       │
 * └─────────────────────────────────────────────────────────────┘
 *
 * [파일명 프리픽스 규칙]
 * - BAT-  : Bayesian Theory (이론 문서)
 * - BAG-  : Bayesian General (일반 개요)
 * - T-    : Template (기능 비종속 문서)
 * - M-    : Menu Manual (UI 화면 매뉴얼)
 *
 * [frontmatter 필드]
 * - title          : 표시용 문서 제목 (로직 무관, 언어별 자유 작성)
 * - section        : (옵션) 폴더에서 자동 추출. 명시하면 오버라이드.
 * - sectionOrder   : (옵션) 섹션 간 정렬 순서
 * - subSection     : (옵션) 폴더에서 자동 추출. 명시하면 오버라이드.
 * - subSectionOrder: (옵션) 서브섹션 간 정렬 순서
 * - order          : (옵션) 서브섹션 내 문서 정렬 순서
 *
 * [다국어 라우팅]
 * - 파일명(e.g. BAT-prior.mdx)은 모든 언어에서 동일해야 함.
 * - title만 언어별로 다르게 작성.
 * - 브라우저 언어 전환 시 동일 파일명 기반 자동 매칭.
 *
 * [⚠️ 주의사항 — 다른 AI 작업 시]
 * 1. 이 파일은 Docs 전용. Blog 관련 코드 수정 시 이 파일을 건드리지 말 것.
 * 2. autoDetectSection()은 filePath에서 "Docs/" 키워드를 찾음. 폴더명 변경 시 주의.
 * 3. uppercase CSS 사용 금지 — 폴더명 원본 대소문자 그대로 표시.
 * 4. 블로그 태그 시스템과 완전 분리됨. 서로 영향 없음.
 *
 * [EXAWin 도움말 연동]
 * - EXAWin 앱의 help JSON (public/help/ko/...)에서 docs_link로 이 문서를 참조.
 * - 경로 예: "/ko/Docs/EXAWin/Theory/BAT-prior"
 * - 파일 이동/리네임 시 반드시 help JSON의 docs_link도 함께 업데이트할 것.
 * ===========================================================================================
 */

import { CoreContent } from '@shipixen/pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
import Link from 'next/link';
import { ScrollTop } from '@/components/shared/ScrollTop';

// ── Docs 문서에 추가되는 frontmatter 필드 타입 ──
interface DocPost extends CoreContent<Blog> {
  section?: string;          // 1단계 그룹명 (폴더에서 자동 파싱됨)
  sectionOrder?: number;     // 1단계 정렬순서
  subSection?: string;       // 2단계 그룹명 (폴더에서 자동 파싱됨)
  subSectionOrder?: number;  // 2단계 정렬순서
  order?: number;            // 문서 간 정렬순서
}

interface DocLayoutProps {
  content?: DocPost;
  allDocPosts: DocPost[];
  toc?: { value: string; url: string; depth: number }[];
  locale?: string;
  isAuthenticated?: boolean; // [Selective Public Access] 로그인 상태 전달
  children: React.ReactNode;
}

// ── 사이드바 데이터 구조 ──
interface SubSectionGroup {
  name: string;
  subSectionOrder: number;
  posts: DocPost[];
}

interface SectionGroup {
  name: string;
  sectionOrder: number;
  rootPosts: DocPost[];        // 서브섹션 없이 섹션 루트에 있는 문서
  subSections: SubSectionGroup[];
}

/**
 * Auto-detect section/subSection from physical folder path (Docs only).
 * Path pattern: posts/[locale]/Docs/[Section]/[SubSection]/file.mdx
 *   e.g. posts/ko/Docs/EXAWin/Theory/BAT-prior.mdx
 *        → section: "EXAWin", subSection: "Theory"
 */
function autoDetectSection(post: DocPost): { section: string; subSection?: string } {
  const filePath = post.filePath || '';
  const parts = filePath.split('/');
  const docsIdx = parts.findIndex((p: string) => p.toLowerCase() === 'docs');

  if (docsIdx < 0) {
    return { section: post.section || 'General' };
  }

  // afterDocs: everything after "Docs/"
  // e.g. [EXAWin, Theory, BAT-prior.mdx] or [intro.mdx] or [EXAWin, intro.mdx]
  const afterDocs = parts.slice(docsIdx + 1);

  if (afterDocs.length <= 1) {
    // File directly under Docs/ (root level) → General
    return { section: post.section || 'General' };
  }

  if (afterDocs.length === 2) {
    // 1-level folder: Docs/EXAWin/intro.mdx → section: "EXAWin"
    return { section: post.section || afterDocs[0] };
  }

  // 2-level folder: Docs/EXAWin/Theory/BAT-prior.mdx → section: "EXAWin", subSection: "Theory"
  return {
    section: post.section || afterDocs[0],
    subSection: post.subSection || afterDocs[1],
  };
}

function sortByOrder(posts: DocPost[]): DocPost[] {
  return [...posts].sort((a, b) => {
    const orderA = a.order ?? 999;
    const orderB = b.order ?? 999;
    if (orderA !== orderB) return orderA - orderB;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

function groupBySection(posts: DocPost[]): SectionGroup[] {
  const sectionMap = new Map<string, SectionGroup>();

  for (const post of posts) {
    const detected = autoDetectSection(post);
    const sectionName = detected.section;
    const subSectionName = detected.subSection;
    const sectionOrder = post.sectionOrder ?? 999;

    if (!sectionMap.has(sectionName)) {
      sectionMap.set(sectionName, {
        name: sectionName,
        sectionOrder,
        rootPosts: [],
        subSections: [],
      });
    }

    const group = sectionMap.get(sectionName)!;
    // Update sectionOrder if this post has a lower (more specific) value
    if (sectionOrder < group.sectionOrder) {
      group.sectionOrder = sectionOrder;
    }

    if (subSectionName) {
      // Add to sub-section
      let subGroup = group.subSections.find(s => s.name === subSectionName);
      if (!subGroup) {
        subGroup = {
          name: subSectionName,
          subSectionOrder: post.subSectionOrder ?? 999,
          posts: [],
        };
        group.subSections.push(subGroup);
      }
      // Update subSectionOrder if lower
      const subOrder = post.subSectionOrder ?? 999;
      if (subOrder < subGroup.subSectionOrder) {
        subGroup.subSectionOrder = subOrder;
      }
      subGroup.posts.push(post);
    } else {
      // Root-level post in this section
      group.rootPosts.push(post);
    }
  }

  // Sort everything
  const sections = Array.from(sectionMap.values());
  sections.sort((a, b) => a.sectionOrder - b.sectionOrder);
  sections.forEach(section => {
    section.rootPosts = sortByOrder(section.rootPosts);
    section.subSections.sort((a, b) => a.subSectionOrder - b.subSectionOrder);
    section.subSections.forEach(sub => {
      sub.posts = sortByOrder(sub.posts);
    });
  });

  return sections;
}

export default function DocLayout({ content, allDocPosts, toc, locale, isAuthenticated = true, children }: DocLayoutProps) {
  const sections = groupBySection(allDocPosts);

  // [Selective Public Access] 비로그인 시 공개 문서만 클릭 가능, 나머지 잠금
  const renderPostLink = (post: DocPost) => {
    const isActive = content?.path === post.path;
    const rawPath = post.path.startsWith('/') ? post.path : `/${post.path}`;
    const fullPath = locale ? `/${locale}${rawPath}` : rawPath;
    const isPostPublic = (post as any).public === true;
    const isLocked = !isAuthenticated && !isPostPublic && !isActive;

    if (isLocked) {
      // 잠금 상태: 클릭 불가, 자물쇠 아이콘 표시
      return (
        <span
          key={post.path}
          className="group flex items-center gap-2 px-3 py-1.5 text-[13px] rounded-lg text-gray-400 dark:text-gray-600 cursor-not-allowed select-none"
          title="Log in to read this document"
        >
          <span className="w-3.5 h-3.5 flex-shrink-0 text-[10px]">🔒</span>
          <span className="line-clamp-1">{post.title}</span>
        </span>
      );
    }

    return (
      <Link
        key={post.path}
        href={fullPath}
        className={`group flex items-center gap-2 px-3 py-1.5 text-[13px] rounded-lg transition-all ${isActive
          ? 'bg-orange-600 text-white font-bold shadow-md shadow-orange-900/20'
          : 'text-gray-600 dark:text-gray-400 font-medium hover:bg-white dark:hover:bg-gray-800 hover:text-orange-600 dark:hover:text-orange-400'
          }`}
      >
        <span className={`w-1 h-1 rounded-full flex-shrink-0 transition-colors ${isActive ? 'bg-white' : 'bg-gray-300 dark:bg-gray-600 group-hover:bg-orange-400'
          }`} />
        {post.title}
      </Link>
    );
  };

  return (
    <div className="flex flex-col md:flex-row max-w-screen-2xl mx-auto w-full" style={{ height: 'calc(100vh - 80px)', marginTop: '80px' }}>
      <ScrollTop />
      {/* LEFT SIDEBAR: Fixed, independently scrollable */}
      <aside className="hidden md:block w-64 lg:w-72 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 p-6 pt-8 overflow-y-auto">

        <nav className="space-y-3">
          {sections.map((section) => {
            const allSectionPosts = [
              ...section.rootPosts,
              ...section.subSections.flatMap(s => s.posts),
            ];
            const isActiveSection = allSectionPosts.some(p => p.path === content?.path);

            return (
              <div key={section.name}>
                <details open={isActiveSection || section.name === 'General'}>
                  {/* Section Header — collapsible */}
                  <summary className="text-[13px] font-extrabold tracking-[0.02em] text-gray-500 dark:text-gray-400 mb-1.5 px-3 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden flex items-center justify-between hover:text-orange-500 transition-colors">
                    {section.name}
                    <svg className="w-3.5 h-3.5 flex-shrink-0 transition-transform [[open]>*>&]:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </summary>

                  {/* Root-level posts in this section */}
                  {section.rootPosts.length > 0 && (
                    <div className="space-y-0.5 mt-1 pl-2">
                      {section.rootPosts.map(renderPostLink)}
                    </div>
                  )}

                  {/* Sub-sections */}
                  {section.subSections.map((sub) => {
                    const isActiveSub = sub.posts.some(p => p.path === content?.path);
                    return (
                      <div key={sub.name} className="mt-1.5 pl-2">
                        <details open={isActiveSub}>
                          <summary className="text-[12px] font-bold tracking-[0.02em] text-gray-400 dark:text-gray-500 px-3 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden flex items-center justify-between hover:text-orange-500 transition-colors">
                            {sub.name}
                            <svg className="w-3 h-3 flex-shrink-0 transition-transform [[open]>*>&]:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </summary>
                          <div className="space-y-0.5 mt-0.5 pl-2">
                            {sub.posts.map(renderPostLink)}
                          </div>
                        </details>
                      </div>
                    );
                  })}
                </details>
              </div>
            );
          })}
        </nav>

        {/* [Selective Public Access] 비로그인 사용자에게 로그인 유도 CTA */}
        {!isAuthenticated && (
          <div className="mt-6 mx-3 p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 border border-orange-200/50 dark:border-orange-800/30">
            <p className="text-xs font-bold text-orange-700 dark:text-orange-400 mb-2">
              🔒 Full Access Required
            </p>
            <p className="text-[11px] text-orange-600/80 dark:text-orange-400/60 mb-3 leading-relaxed">
              Log in to unlock all documentation.
            </p>
            <a
              href="/login"
              className="block w-full text-center text-xs font-bold py-2 px-3 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition-colors"
            >
              Log In
            </a>
          </div>
        )}
      </aside>

      {/* MAIN CONTENT AREA: Only this part scrolls */}
      <main className="flex-1 p-8 md:p-12 lg:p-16 bg-white dark:bg-gray-950 overflow-y-auto">
        <div className="max-w-4xl mx-auto xl:mr-auto xl:ml-0">
          {content && (
            <header className="mb-12 pb-8 border-b border-gray-100 dark:border-white/5">
              <div className="space-y-4">
                <div className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">
                  DOCUMENTATION
                </div>
                <h1 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                  {content.title}
                </h1>
                {content.summary && (
                  <p className="text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                    {content.summary}
                  </p>
                )}
              </div>
            </header>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none 
                          prose-headings:font-black prose-headings:tracking-tighter
                          prose-a:text-orange-600 dark:prose-a:text-orange-400 no-underline hover:prose-a:underline
                          prose-img:rounded-2xl prose-img:shadow-2xl">
            {children}
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR: Fixed, independently scrollable */}
      {toc && toc.length > 0 && (
        <aside className="hidden xl:block w-64 flex-shrink-0 p-8 pt-8 overflow-y-auto">
          <h3 className="font-bold text-[10px] mb-6 uppercase tracking-[0.2em] text-gray-400">
            JUMP TO SECTION
          </h3>
          <nav className="space-y-3">
            {toc.map((heading) => (
              <a
                key={heading.url}
                href={heading.url}
                className={`block text-[13px] font-medium transition-colors hover:text-orange-600 dark:hover:text-orange-400 ${heading.depth > 2 ? 'pl-4 text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'
                  }`}
              >
                {heading.value}
              </a>
            ))}
          </nav>
        </aside>
      )}
    </div>
  );
}
