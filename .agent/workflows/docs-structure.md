---
description: Docs 문서 추가/수정 및 도움말 연동 워크플로우
---
// turbo-all

# Docs 문서 구조 워크플로우

## 1. 전체 아키텍처

```
posts/[locale]/Docs/
├── intro.mdx                      → "General" 섹션
├── getting-started.mdx            → "General" 섹션
└── [ProductName]/                 → 1단계 섹션 (예: EXAWin)
    ├── intro.mdx                  → 섹션 루트 문서
    ├── Theory/                    → 2단계 서브섹션
    │   ├── BAT-prior.mdx          → BAT- 접두사: Bayesian Theory
    │   └── BAT-impedance.mdx
    └── Manual/                    → 2단계 서브섹션
        ├── M-stage-master.mdx     → M- 접두사: Menu Manual
        └── M-signal-master.mdx
```

## 2. 파일명 프리픽스 규칙

| 프리픽스 | 의미 | 용도 |
|----------|------|------|
| `BAT-` | Bayesian Theory | 베이지안 이론 문서 |
| `BAG-` | Bayesian General | 일반 개요 문서 |
| `T-` | Template | 기능 비종속 문서 |
| `M-` | Menu Manual | UI 화면별 매뉴얼 |

## 3. 새 문서 추가하기

### 3.1 MDX 파일 생성

해당 폴더에 MDX 파일을 생성합니다. **모든 언어에서 동일한 파일명 사용.**

```yaml
---
title: '한국어 문서 제목'     # 언어별 자유 작성 (로직에 영향 없음)
date: '2026-02-18'
order: 1                       # 같은 서브섹션 내 정렬 순서
sectionOrder: 1                # (옵션) 섹션 간 순서
subSectionOrder: 1             # (옵션) 서브섹션 간 순서
tags: ['Guide', 'EXAWin']
draft: false
summary: '설명'
---
```

### 3.2 section/subSection은 자동 파싱

`section`과 `subSection`은 **폴더 경로에서 자동 추출**됩니다.
- `Docs/EXAWin/Theory/BAT-prior.mdx` → section: "EXAWin", subSection: "Theory"
- frontmatter에 명시하면 오버라이드됨 (하지만 불필요)

### 3.3 새 서브섹션 추가

폴더만 만들면 됩니다:
```bash
mkdir -p data/posts/ko/Docs/EXAWin/NewSection/
```
그 안에 MDX 파일을 넣으면 사이드바에 자동 등장.

## 4. 다국어 문서 추가

```bash
# 한국어
data/posts/ko/Docs/EXAWin/Theory/BAT-prior.mdx
# 영어 (같은 파일명!)
data/posts/en/Docs/EXAWin/Theory/BAT-prior.mdx
# 일본어
data/posts/ja/Docs/EXAWin/Theory/BAT-prior.mdx
```

파일명이 동일하므로 브라우저에서 언어 전환 시 자동 매칭.

## 5. EXAWin 도움말 연동

EXAWin 앱의 help JSON에서 Docs 문서를 링크:

```json
{
  "docs_link": "/ko/Docs/EXAWin/Theory/BAT-prior",
  "docs_title": "베이지안 이론—적용: Prior Alpha, Beta"
}
```

**⚠️ 중요:** 문서 이동/리네임 시 반드시 `public/help/` 내 JSON의 `docs_link`도 함께 수정.

## 6. 관련 파일

| 파일 | 역할 |
|------|------|
| `layouts/DocLayout.tsx` | 2단계 사이드바 렌더링 + 자동 폴더 파싱 |
| `contentlayer.config.ts` | subSection, subSectionOrder 필드 정의 |
| `app/[...slug]/page.tsx` | Docs 라우팅 및 DocLayout 호출 |
| `public/help/[lang]/` | EXAWin 도움말 JSON (docs_link 포함) |

## 7. ⚠️ 절대 금지 사항

1. **DocLayout.tsx에 Blog 관련 코드 혼입 금지** — Docs 전용.
2. **파일명에 한국어/특수문자 사용 금지** — 영문+하이픈만.
3. **uppercase CSS 사용 금지** — 폴더명 원본 대소문자 유지.
4. **docs_link 미동기화 금지** — 문서 이동 시 help JSON 반드시 업데이트.
