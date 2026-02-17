/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { allBlogs } from 'contentlayer/generated';
import PostCard from '@/components/shared/PostCard';
import { BayesianLiveDemo } from '@/components/shared/BayesianLiveDemo';

export const ExaWinProductPage = ({ params }: { params: { locale: string } }) => {
  const { locale } = params;

  // 1. Language Data
  const content = {
    en: {
      hero: {
        label: "Sales Intelligence Engine",
        title: "Sales as a Rigorous Science.",
        desc: "Stop guessing. Start knowing. EXAWin transforms sales intuition into mathematical certainty using Recursive Bayesian Inference. Analyze opportunities, calculate winning probabilities, and close deals with confidence.",
        cta_primary: "Start for Free",
        cta_secondary: "Sign In",
        cta_pricing: "View Pricing"
      },
      integration: {
        title: "Enterprise Architecture",
        subtitle: "Unbounded Integration.",
        desc: "Unify with your infrastructure and extend unboundedly to match your unique business requirements.",
        cards: [
          {
            title: "On-Premise & Sovereignty",
            desc: "Complete data control. Deploy on your internal servers or air-gapped networks for maximum security.",
            icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          },
          {
            title: "Legacy & ERP Sync",
            desc: "Bidirectional synchronization with Global ERP, CRM, and SCM systems. No double entry, just data flow.",
            icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          },
          {
            title: "Hyper-Customization",
            desc: "Fine-tune algorithms and weight parameters to match your unique sales methodology.",
            icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          },
          {
            title: "EXA Neural API",
            desc: "Inject EXAWin's inference engine into your apps via robust RESTful / GraphQL APIs.",
            icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          }
        ],
        cta: "Contact Enterprise Sales"
      },
      dashboard: {
        title: "The Battlefield of Data",
        subtitle: "A Single Source of Truth for Your Sales Strategy",
        desc: "Visualize your entire pipeline in real-time. From signal detection to final negotiation, EXAWin provides a command center where every movement is tracked, analyzed, and optimized."
      },
      mobile: {
        title: "Intelligence in Your Pocket",
        subtitle: "A Complete Command Center, Anywhere",
        desc: "Sales happen in the field, not at a desk. Access real-time probabilities, log meeting notes via voice, and get instant signal alerts on your phone or tablet. Fully compatible with iOS and Android.",
        features: [
          { icon: "📱", title: "PWA Native Experience", desc: "Install directly to your home screen — no app store needed. Launches instantly like a native app with full offline capability." },
          { icon: "🎤", title: "Voice-First Input", desc: "Just finished a client meeting in the parking lot? Dictate your notes, signals, and action items hands-free. The engine processes it all." },
          { icon: "🔔", title: "Real-Time Push Alerts", desc: "A teammate just commented on your deal. Your P(Win) crossed 80%. Never miss a critical moment — alerts arrive in seconds." },
          { icon: "📴", title: "Offline-Ready", desc: "Underground garage. Rural client site. No signal? No problem. Log activities offline — everything syncs the moment you reconnect." },
          { icon: "⚡", title: "Live P(Win) Dashboard", desc: "Check your portfolio's real-time win probabilities between meetings. One glance tells you which deals need immediate attention." }
        ]
      },
      features: [
        {
          title: "Activity FAB",
          desc: "Log every interaction. Meetings, calls, and emails are instantly converted into quantitative data points.",
          icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        },
        {
          title: "Bayesian Engine",
          desc: "Our core engine continuously recalculates win probabilities based on new evidence, eliminating optimism bias.",
          icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        },
        {
          title: "Signal Master",
          desc: "Detect subtle customer buying signals. Categorize impact types and weigh their influence on the deal.",
          icon: "M13 10V3L4 14h7v7l9-11h-7z"
        }
      ],
      articles: {
        title: "Theoretical Architecture",
        subtitle: "The Structural Logic of Victory",
        loadMore: "Load More",
        showLess: "Show Less"
      },
      onboarding: {
        title: "How to Begin",
        steps: [
          { step: "01", title: "Create Account", desc: "Sign up for a free tier to access the core engine." },
          { step: "02", title: "Define Projects", desc: "Register your ongoing sales opportunities and customers." },
          { step: "03", title: "Log Activities", desc: "Input meeting results and detect key signals." },
          { step: "04", title: "Analyze & Win", desc: "Review the probability curve and execute the winning strategy." }
        ]
      },
      final_cta: {
        title: "Ready to dominate your market?",
        button: "Get Started Now"
      },
      useCases: {
        title: "Built for Every Sales Team",
        subtitle: "From solo agents to enterprise squads — EXAWin adapts to your industry.",
        b2cLabel: "B2C",
        b2bLabel: "B2B",
        b2cBadge: "Quick Start",
        cards: [
          { icon: "🏠", title: "Real Estate", desc: "Track deal probability per listing in real-time.", detail: "Client reaction signals → price negotiation → contract probability", category: "b2c" },
          { icon: "🛍️", title: "Retail & Distribution", desc: "Analyze purchase conversion rates per customer.", detail: "Visit → interest → quote → purchase signal tracking", category: "b2c" },
          { icon: "🚗", title: "Auto Dealers", desc: "Test drive → contract conversion pipeline.", detail: "Test drive reactions, financing terms, competitor comparison signals", category: "b2c" },
          { icon: "💄", title: "Beauty & Wellness", desc: "Consultation → contract → revisit probability.", detail: "First consultation response, price sensitivity, repurchase likelihood", category: "b2c" },
          { icon: "☁️", title: "IT / SaaS", desc: "PoC → contract conversion tracking.", detail: "Technical validation, internal approvals, competitor comparison", category: "b2b" },
          { icon: "🏗️", title: "Construction", desc: "Bid win rate prediction per project.", detail: "Stage-by-stage P(Win), Silence Penalty for stalls", category: "b2b" },
          { icon: "💊", title: "Pharma & MedTech", desc: "Multi-stakeholder decision management.", detail: "Multi-signal analysis, Impedance measurement for decision resistance", category: "b2b" },
          { icon: "🏦", title: "Finance & Insurance", desc: "Review → approval → contract pipeline.", detail: "Regulatory signals, multi-stage approval tracking", category: "b2b" }
        ]
      },
      dealTimeline: {
        title: "See How a Deal Unfolds",
        subtitle: "Watch the Bayesian engine track a real negotiation over 60 days.",
        steps: [
          { day: "Day 1", pWin: 25, label: "First Meeting", desc: "Initial discovery call. Baseline probability established.", alpha: "α 2.0", beta: "β 6.0" },
          { day: "Day 15", pWin: 55, label: "Positive Signal", desc: "Budget confirmed. Technical demo went well.", alpha: "α 4.5", beta: "β 3.7" },
          { day: "Day 30", pWin: 42, label: "Silence Period", desc: "No response for 2 weeks. Silence penalty applied.", alpha: "α 4.5", beta: "β 6.2" },
          { day: "Day 45", pWin: 78, label: "Key Signal", desc: "Legal counsel reviewed MSA. Champion confirmed internally.", alpha: "α 8.1", beta: "β 2.3" },
          { day: "Day 60", pWin: 95, label: "Deal Closed", desc: "Contract signed. Bayesian prediction confirmed → Won!", alpha: "α 12.4", beta: "β 0.7" }
        ]
      },
      collaboration: {
        title: "Sales War Room",
        subtitle: "Every deal is a team mission. Communicate, react, and align — right inside EXAWin.",
        badge: "Real-Time Collaboration",
        features: [
          { icon: "👍", title: "Reactions", desc: "Your junior rep just nailed a tough negotiation. Hit 'Great move' and the whole team sees it. Recognition drives performance — and the engine remembers team momentum.", color: "blue" },
          { icon: "💬", title: "Comment Threads", desc: "A deal is stalling at Day 30. Your manager comments: 'Try the champion approach.' Strategy flows where the data lives — no more switching between Slack, email, and CRM.", color: "purple" },
          { icon: "📌", title: "Pin & @Mention", desc: "Pin a make-or-break activity. @mention the VP when a $500K deal hits 85% P(Win). The right people see the right deals at the right moment.", color: "orange" },
          { icon: "🔔", title: "Live Notifications", desc: "Your teammate just logged a critical signal on Project Alpha. You get the push alert in 3 seconds. React before the competitor does.", color: "emerald" }
        ],
        feedTitle: "Activity Social Feed",
        feedDesc: "Forget scattered Slack threads and buried emails. Every meeting, every signal, every strategic insight — shared in one unified feed. Your team's collective intelligence compounds with every interaction.",
        hubTitle: "EXA Workspace Hub",
        hubBadge: "Coming Soon",
        hubDesc: "EXAWin's social feed is just the beginning. Integrate with EXA ERP Workspace Hub for a unified sales-operations-communication ecosystem.",
        hubModules: ["Team Chat", "Video Calls", "File Sharing", "Announcements"]
      },
      screens: {
        sectionLabel: "Product Screens",
        sectionTitle: "See It",
        sectionTitleAccent: "In Action",
        sectionSubtitle: "Democratizing Bayesian — powered by EXA.",
        reassurance: "You don't need to understand engine blueprints to drive a car. Leave the complex probability math in EXA's engine room — just steer where the data points. The most sophisticated intelligence, delivered as the simplest experience.",
        warRoom: {
          label: "Activity War Room",
          title: "Every Meeting Feeds the Engine",
          desc: "Each sales activity — discovery calls, demos, negotiations — is recorded with full context. The Bayesian engine analyzes signals in real time, updating P(Win), Momentum, and Impedance after every interaction.",
          checks: ["Real-time P(Win) calculation per activity", "Signal-based impact scoring", "AI-powered strategy insights"],
          badge: "LIVE DATA"
        },
        editor: {
          label: "Smart Activity Editor",
          title: "Capture Signals, Not Just Notes",
          desc: "The rich activity editor captures meeting context with structured data — signals observed, stage progression, and strategic action items. Every detail becomes evidence for the Bayesian engine.",
          checks: ["Signal tagging with impact weights", "Rich text meeting notes", "Automatic stage value calculation"],
          badge: "SIGNAL DETECTION"
        },
        config: {
          label: "Project Configuration",
          title: "Fine-Tune Your Bayesian Priors",
          desc: "Each project gets its own Bayesian configuration — custom priors (α, β), silence penalties, and stage weights. Tune the engine to match your industry and deal complexity.",
          checks: ["Per-project Bayesian prior tuning", "Silence penalty configuration", "Stage & signal impact customization"],
          badge: "CONFIGURABLE"
        }
      },
      insight: {
        label: "EXA Insight",
        title: "Help That Understands Context",
        desc: "No more searching through manuals. EXA Insight reads your current screen and delivers relevant guidance — from Bayesian fundamentals to advanced signal strategies. Every user becomes an expert.",
        checks: ["Page-aware contextual documentation", "Bayesian formula explanations with visuals", "Built-in onboarding for new team members"],
        badge: "SMART HELP"
      }
    },
    ko: {
      hero: {
        label: "지능형 영업 엔진",
        title: "영업은 이제 정교한 과학입니다.",
        desc: "추측을 멈추고, 확신을 가지십시오. EXAWin은 재귀적 베이지안 추론을 통해 영업 직관을 수학적 확실성으로 변환합니다. 기회를 분석하고, 수주 확률을 계산하여 자신 있게 딜을 성사시키세요.",
        cta_primary: "Start for Free",
        cta_secondary: "Sign In",
        cta_pricing: "View Pricing"
      },
      integration: {
        title: "엔터프라이즈 아키텍처",
        subtitle: "경계 없는 무한한 통합.",
        desc: "귀사의 인프라와 완벽하게 결합하며, 고유한 비즈니스 요구사항에 맞춰 무한히 확장할 수 있습니다.",
        cards: [
          {
            title: "On-Premise & Sovereignty",
            desc: "데이터 주권의 완성. 보안을 위해 귀사의 내부 서버나 폐쇄망 환경에 직접 설치하십시오.",
            icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          },
          {
            title: "Legacy & ERP Sync",
            desc: "Global ERP, CRM, SCM 등 기존 시스템과 양방향 동기화. 중복 입력 없이 데이터가 흐릅니다.",
            icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          },
          {
            title: "Hyper-Customization",
            desc: "귀사만의 영업 방법론에 맞춰 알고리즘 가중치와 파라미터를 정밀하게 조정(Fine-tuning)합니다.",
            icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          },
          {
            title: "EXA Neural API",
            desc: "강력한 RESTful / GraphQL API를 통해 EXAWin의 추론 엔진을 귀사의 모든 앱에 이식하십시오.",
            icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          }
        ],
        cta: "엔터프라이즈 도입 문의"
      },
      dashboard: {
        title: "데이터의 전장 (Battlefield)",
        subtitle: "영업 전략을 위한 단 하나의 진실",
        desc: "파이프라인 전체를 실시간으로 시각화하십시오. 신호 감지에서 최종 협상까지, EXAWin은 모든 움직임이 추적되고 분석되며 최적화되는 지휘 통제실을 제공합니다."
      },
      mobile: {
        title: "내 손안의 인텔리전스",
        subtitle: "언제 어디서나, 완벽한 지휘 통제",
        desc: "영업은 책상이 아닌 현장에서 이루어집니다. 실시간 확률을 확인하고, 음성으로 미팅 노트를 기록하며, 중요한 신호 알림을 휴대폰이나 태블릿에서 즉시 받으십시오. iOS 및 Android 완벽 지원.",
        features: [
          { icon: "📱", title: "PWA 네이티브 경험", desc: "앱스토어 없이 홈화면에 바로 설치. 네이티브 앱처럼 즉시 실행되며 완전한 오프라인 기능을 제공합니다." },
          { icon: "🎤", title: "음성 우선 입력", desc: "주차장에서 고객 미팅을 마쳤나요? 핸즈프리로 메모, 시그널, 액션 아이템을 구술하세요. 엔진이 모든 것을 처리합니다." },
          { icon: "🔔", title: "실시간 푸시 알림", desc: "팀원이 내 딜에 댓글을 달았습니다. P(Win)이 80%를 돌파했습니다. 결정적 순간을 놓치지 마세요 — 알림은 초 단위로 도착합니다." },
          { icon: "📴", title: "오프라인 지원", desc: "지하 주차장. 시골 고객사. 전파 없음? 문제 없습니다. 오프라인에서 활동을 기록하면 연결 시 자동 동기화됩니다." },
          { icon: "⚡", title: "실시간 P(Win) 대시보드", desc: "미팅 사이 이동 중 포트폴리오의 실시간 수주 확률을 확인하세요. 한 눈에 어떤 딜에 즉각 주의가 필요한지 알 수 있습니다." }
        ]
      },
      features: [
        {
          title: "Activity FAB",
          desc: "모든 상호작용을 기록하십시오. 미팅, 통화, 이메일은 즉시 정량적 데이터 포인트로 변환됩니다.",
          icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        },
        {
          title: "Bayesian Engine",
          desc: "핵심 엔진은 새로운 증거를 기반으로 수주 확률을 지속적으로 재계산하여 낙관 편향을 제거합니다.",
          icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        },
        {
          title: "Signal Master",
          desc: "미묘한 고객 구매 신호를 감지하십시오. 영향 유형을 분류하고 딜에 미치는 가중치를 측정합니다.",
          icon: "M13 10V3L4 14h7v7l9-11h-7z"
        }
      ],
      articles: {
        title: "이론적 아키텍처 (Theoretical Architecture)",
        subtitle: "승리를 위한 구조적 논리",
        loadMore: "Load More",
        showLess: "Show Less"
      },
      onboarding: {
        title: "How to Begin",
        steps: [
          { step: "01", title: "계정 생성", desc: "무료 등급에 가입하여 핵심 엔진에 액세스하십시오." },
          { step: "02", title: "프로젝트 정의", desc: "진행 중인 영업 기회와 고객을 등록하십시오." },
          { step: "03", title: "활동 기록", desc: "미팅 결과를 입력하고 핵심 신호를 감지하십시오." },
          { step: "04", title: "분석 및 수주", desc: "확률 곡선을 검토하고 승리 전략을 실행하십시오." }
        ]
      },
      final_cta: {
        title: "시장을 지배할 준비가 되셨습니까?",
        button: "Get Started Now"
      },
      useCases: {
        title: "모든 영업팀을 위해 만들어졌습니다",
        subtitle: "1인 에이전트부터 대규모 팀까지 — EXAWin은 귀사의 업종에 맞게 적응합니다.",
        b2cLabel: "B2C",
        b2bLabel: "B2B",
        b2cBadge: "빠른 시작",
        cards: [
          { icon: "🏠", title: "부동산", desc: "매물별 거래 성사율을 실시간 추적합니다.", detail: "고객 반응 시그널 → 가격 협상 → 계약 확률", category: "b2c" },
          { icon: "🛍️", title: "소매 & 유통", desc: "고객별 구매 전환율을 분석합니다.", detail: "방문 → 관심 → 견적 → 구매 시그널 추적", category: "b2c" },
          { icon: "🚗", title: "자동차 딜러", desc: "시승 → 계약 전환 파이프라인.", detail: "시승 반응, 금융 조건, 경쟁사 비교 시그널", category: "b2c" },
          { icon: "💄", title: "뷰티 & 웰니스", desc: "상담 → 계약 → 재방문 확률.", detail: "첫 상담 반응, 가격 민감도, 재구매 가능성", category: "b2c" },
          { icon: "☁️", title: "IT / SaaS", desc: "PoC → 계약 전환 추적.", detail: "기술 검증, 내부 승인, 경쟁사 비교", category: "b2b" },
          { icon: "🏗️", title: "건설 / 플랜트", desc: "프로젝트별 입찰 수주율 예측.", detail: "단계별 P(Win), 교착 시 Silence Penalty", category: "b2b" },
          { icon: "💊", title: "제약 & 의료기기", desc: "다수 의사결정자 관리.", detail: "Multi-signal 분석, 의사결정 저항 Impedance 측정", category: "b2b" },
          { icon: "🏦", title: "금융 & 보험", desc: "심사 → 승인 → 계약 파이프라인.", detail: "규제 시그널, 다단계 승인 추적", category: "b2b" }
        ]
      },
      dealTimeline: {
        title: "딜의 여정을 확인하세요",
        subtitle: "베이지안 엔진이 60일간의 실제 협상을 추적하는 모습을 확인하세요.",
        steps: [
          { day: "Day 1", pWin: 25, label: "첫 미팅", desc: "초기 탐색 미팅. 기준 확률 설정.", alpha: "α 2.0", beta: "β 6.0" },
          { day: "Day 15", pWin: 55, label: "긍정 시그널", desc: "예산 확인됨. 기술 데모 성공.", alpha: "α 4.5", beta: "β 3.7" },
          { day: "Day 30", pWin: 42, label: "침묵 기간", desc: "2주간 무응답. Silence Penalty 적용.", alpha: "α 4.5", beta: "β 6.2" },
          { day: "Day 45", pWin: 78, label: "핵심 시그널", desc: "법무팀 MSA 검토 완료. 내부 챔피언 확인.", alpha: "α 8.1", beta: "β 2.3" },
          { day: "Day 60", pWin: 95, label: "딜 클로즈", desc: "계약 체결. 베이지안 예측 확인 → 수주!", alpha: "α 12.4", beta: "β 0.7" }
        ]
      },
      collaboration: {
        title: "Sales War Room",
        subtitle: "모든 딜은 팀 미션입니다. EXAWin 안에서 바로 소통하고, 반응하고, 정렬하세요.",
        badge: "실시간 협업",
        features: [
          { icon: "👍", title: "리액션", desc: "신입 영업사원이 어려운 협상을 해냈습니다. '잘했다'를 누르면 팀 전체가 봅니다. 인정이 성과를 만들고, 엔진은 팀 모멘텀을 기억합니다.", color: "blue" },
          { icon: "💬", title: "댓글 스레드", desc: "Day 30에 딜이 교착 상태입니다. 매니저가 댓글을 답니다: '챔피언 전략을 써보세요.' 전략이 데이터가 있는 곳에서 바로 흐릅니다 — Slack, 이메일, CRM을 오가지 않아도 됩니다.", color: "purple" },
          { icon: "📌", title: "핀 & @멘션", desc: "결정적 활동을 고정하세요. 5억 딜이 P(Win) 85%에 도달하면 VP를 @멘션합니다. 적절한 사람이 적절한 딜을 적절한 순간에 봅니다.", color: "orange" },
          { icon: "🔔", title: "실시간 알림", desc: "팀원이 Project Alpha에 핵심 시그널을 기록했습니다. 3초 만에 푸시 알림을 받습니다. 경쟁사보다 먼저 대응하세요.", color: "emerald" }
        ],
        feedTitle: "Activity Social Feed",
        feedDesc: "흩어진 Slack 스레드와 묻혀버린 이메일은 잊으세요. 모든 미팅, 모든 시그널, 모든 전략적 인사이트가 하나의 통합 피드에서 공유됩니다. 팀의 집단 지성이 매 상호작용마다 복리로 성장합니다.",
        hubTitle: "EXA Workspace Hub",
        hubBadge: "Coming Soon",
        hubDesc: "EXAWin의 소셜 피드는 시작일 뿐입니다. EXA Workspace Hub와 통합되어 영업-운영-커뮤니케이션이 하나의 생태계로 연결됩니다.",
        hubModules: ["팀 채팅", "영상 통화", "파일 공유", "공지사항"]
      },
      screens: {
        sectionLabel: "Product Screens",
        sectionTitle: "See It",
        sectionTitleAccent: "In Action",
        sectionSubtitle: "베이지안의 대중화, EXA가 실현합니다.",
        reassurance: "자동차를 운전하기 위해 엔진 설계도를 이해할 필요는 없습니다. 복잡한 확률 수학은 EXA의 엔진룸에 맡기고, 당신은 데이터가 가리키는 방향으로 핸들만 꺾으십시오. 가장 정교한 지능을, 가장 단순한 경험으로 제공합니다.",
        warRoom: {
          label: "Activity War Room",
          title: "모든 미팅이 엔진을 움직입니다",
          desc: "모든 영업 활동 — 발굴 콜, 데모, 협상 — 이 전체 맥락과 함께 기록됩니다. 베이지안 엔진이 실시간으로 시그널을 분석하여 매 상호작용 후 P(Win), 모멘텀, 임피던스를 업데이트합니다.",
          checks: ["활동별 실시간 P(Win) 계산", "시그널 기반 임팩트 스코어링", "AI 전략 인사이트"],
          badge: "실시간 데이터"
        },
        editor: {
          label: "스마트 액티비티 에디터",
          title: "메모가 아닌, 시그널을 포착하세요",
          desc: "리치 액티비티 에디터가 구조화된 데이터로 미팅 맥락을 포착합니다 — 관찰된 시그널, 단계 진행, 전략적 액션 아이템. 모든 디테일이 베이지안 엔진의 증거가 됩니다.",
          checks: ["임팩트 가중치 기반 시그널 태깅", "리치 텍스트 미팅 노트", "자동 단계 가치 계산"],
          badge: "시그널 감지"
        },
        config: {
          label: "프로젝트 설정",
          title: "베이지안 사전확률을 미세 조정하세요",
          desc: "각 프로젝트는 고유한 베이지안 설정을 가집니다 — 커스텀 사전확률(α, β), 침묵 페널티, 단계 가중치. 업종과 딜 복잡도에 맞게 엔진을 조율하세요.",
          checks: ["프로젝트별 베이지안 사전확률 튜닝", "침묵 페널티 설정", "단계 및 시그널 임팩트 커스터마이징"],
          badge: "설정 가능"
        }
      },
      insight: {
        label: "EXA Insight",
        title: "맥락을 이해하는 도움말",
        desc: "더 이상 매뉴얼을 뒤질 필요가 없습니다. EXA Insight는 현재 화면을 읽고 베이지안 기초부터 고급 시그널 전략까지 관련 가이드를 즉시 제공합니다. 모든 사용자가 전문가가 됩니다.",
        checks: ["페이지 인식 상황별 도움말", "시각적 베이지안 공식 설명", "신규 팀원 온보딩 내장"],
        badge: "스마트 도움말"
      }
    },
    ja: {
      hero: {
        label: "Intelligent Sales Engine",
        title: "営業は今、精緻な科学です。",
        desc: "推測をやめ、確信を持ちましょう。EXAWinは再帰的ベイズ推論を用いて、営業の直感を数学的な確実性へと変換します。機会を分析し、勝率を計算して、自信を持って案件を成約させましょう。",
        cta_primary: "Start for Free",
        cta_secondary: "Sign In",
        cta_pricing: "View Pricing"
      },
      integration: {
        title: "エンタープライズ・アーキテクチャ",
        subtitle: "境界のない無限の統合。",
        desc: "既存インフラと完全に統合し、独自のビジネス要件に合わせて無限に拡張できます。",
        cards: [
          {
            title: "On-Premise & Sovereignty",
            desc: "データ主権の完成。セキュリティのために貴社の内部サーバーや閉域網環境に直接インストールします。",
            icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          },
          {
            title: "Legacy & ERP Sync",
            desc: "Global ERP、CRM、SCMなどの既存システムと双方向同期。重複入力なしでデータが流れます。",
            icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          },
          {
            title: "Hyper-Customization",
            desc: "貴社独自の営業手法に合わせてアルゴリズムの重みとパラメータを精密に調整（Fine-tuning）します。",
            icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          },
          {
            title: "EXA Neural API",
            desc: "強力なRESTful / GraphQL APIを通じて、EXAWinの推論エンジンを貴社のすべてのアプリに組み込みます。",
            icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          }
        ],
        cta: "エンタープライズ導入のお問い合わせ"
      },
      dashboard: {
        title: "データの戦場 (Battlefield)",
        subtitle: "営業戦略のための唯一の真実",
        desc: "パイプライン全体をリアルタイムで可視化します。シグナル検知から最終交渉まで、EXAWinはすべての動きが追跡、分析、最適化される指令本部を提供します。"
      },
      mobile: {
        title: "ポケットの中のインテリジェンス",
        subtitle: "いつでもどこでも、完全なコマンドセンター",
        desc: "営業はデスクではなく現場で起こります。リアルタイムの確率を確認し、音声で会議メモを記録し、携帯電話やタブレットで重要なシグナルアラートを即座に受け取ります。iOSおよびAndroidに完全対応。",
        features: [
          { icon: "📱", title: "PWAネイティブ体験", desc: "アプリストア不要でホーム画面に直接インストール。ネイティブアプリのように即起動し、完全なオフライン機能を提供します。" },
          { icon: "🎤", title: "音声ファースト入力", desc: "駐車場でクライアントとのミーティングを終えたばかり？ハンズフリーでメモ、シグナル、アクションアイテムを口述。エンジンがすべてを処理します。" },
          { icon: "🔔", title: "リアルタイムプッシュ通知", desc: "チームメイトがあなたのディールにコメント。P(Win)が80%を突破。決定的瞬間を逃しません — アラートは数秒で届きます。" },
          { icon: "📴", title: "オフライン対応", desc: "地下駐車場。地方のクライアントサイト。電波なし？問題ありません。オフラインで活動を記録 — 再接続時にすべて同期されます。" },
          { icon: "⚡", title: "リアルタイムP(Win)ダッシュボード", desc: "ミーティング間の移動中にポートフォリオのリアルタイム勝率を確認。一目でどのディールに即座の注意が必要かわかります。" }
        ]
      },
      features: [
        {
          title: "Activity FAB",
          desc: "すべてのやり取りを記録します。会議、電話、メールは即座に定量的なデータポイントに変換されます。",
          icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        },
        {
          title: "Bayesian Engine",
          desc: "コアエンジンは新しい証拠に基づいて勝率を継続的に再計算し、楽観性バイアスを排除します。",
          icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        },
        {
          title: "Signal Master",
          desc: "微細な購買シグナルを検知します。影響タイプを分類し、案件への重みを測定します。",
          icon: "M13 10V3L4 14h7v7l9-11h-7z"
        }
      ],
      articles: {
        title: "Theoretical Architecture (理論的アーキテクチャ)",
        subtitle: "勝利のための構造的論理",
        loadMore: "Load More",
        showLess: "Show Less"
      },
      onboarding: {
        title: "How to Begin",
        steps: [
          { step: "01", title: "Create Account", desc: "無料ティアに登録してコアエンジンにアクセスします。" },
          { step: "02", title: "Define Projects", desc: "進行中の営業案件と顧客を登録します。" },
          { step: "03", title: "Log Activities", desc: "会議の結果を入力し、主要なシグナルを検知します。" },
          { step: "04", title: "Analyze & Win", desc: "確率曲線を検討し、勝利戦略を実行します。" }
        ]
      },
      final_cta: {
        title: "市場を支配する準備はできていますか？",
        button: "Get Started Now"
      },
      useCases: {
        title: "あらゆる営業チームのために",
        subtitle: "個人エージェントから大規模チームまで — EXAWinは業種に合わせて最適化されます。",
        b2cLabel: "B2C",
        b2bLabel: "B2B",
        b2cBadge: "クイックスタート",
        cards: [
          { icon: "🏠", title: "不動産", desc: "物件ごとの取引成立確率をリアルタイム追跡。", detail: "顧客反応シグナル → 価格交渉 → 契約確率", category: "b2c" },
          { icon: "🛍️", title: "小売 & 流通", desc: "顧客ごとの購入コンバージョン率を分析。", detail: "訪問 → 関心 → 見積 → 購入シグナル追跡", category: "b2c" },
          { icon: "🚗", title: "自動車ディーラー", desc: "試乗 → 契約コンバージョンパイプライン。", detail: "試乗反応、融資条件、競合比較シグナル", category: "b2c" },
          { icon: "💄", title: "ビューティー & ウェルネス", desc: "カウンセリング → 契約 → 再来確率。", detail: "初回カウンセリング反応、価格感度、リピート可能性", category: "b2c" },
          { icon: "☁️", title: "IT / SaaS", desc: "PoC → 契約コンバージョン追跡。", detail: "技術検証、社内承認、競合比較", category: "b2b" },
          { icon: "🏗️", title: "建設 / プラント", desc: "プロジェクトごとの入札勝率予測。", detail: "段階別P(Win)、膠着時Silence Penalty", category: "b2b" },
          { icon: "💊", title: "製薬 & 医療機器", desc: "複数の意思決定者を管理。", detail: "Multi-signal分析、意思決定抵抗のImpedance測定", category: "b2b" },
          { icon: "🏦", title: "金融 & 保険", desc: "審査 → 承認 → 契約パイプライン。", detail: "規制シグナル、多段階承認追跡", category: "b2b" }
        ]
      },
      dealTimeline: {
        title: "ディールの軌跡を確認",
        subtitle: "ベイジアンエンジンが60日間の実際の交渉を追跡する様子をご覧ください。",
        steps: [
          { day: "Day 1", pWin: 25, label: "初回ミーティング", desc: "初期の探索ミーティング。基準確率設定。", alpha: "α 2.0", beta: "β 6.0" },
          { day: "Day 15", pWin: 55, label: "ポジティブシグナル", desc: "予算確認済み。技術デモ成功。", alpha: "α 4.5", beta: "β 3.7" },
          { day: "Day 30", pWin: 42, label: "沈黙期間", desc: "2週間無応答。Silence Penalty適用。", alpha: "α 4.5", beta: "β 6.2" },
          { day: "Day 45", pWin: 78, label: "キーシグナル", desc: "法務部MSAレビュー完了。社内チャンピオン確認。", alpha: "α 8.1", beta: "β 2.3" },
          { day: "Day 60", pWin: 95, label: "ディールクローズ", desc: "契約締結。ベイジアン予測確認 → 受注！", alpha: "α 12.4", beta: "β 0.7" }
        ]
      },
      collaboration: {
        title: "Sales War Room",
        subtitle: "すべてのディールはチームミッション。EXAWin内で直接コミュニケーション、リアクション、アラインメント。",
        badge: "リアルタイムコラボレーション",
        features: [
          { icon: "👍", title: "リアクション", desc: "新人営業がタフな交渉を成功させました。'Good'を押せばチーム全体が見ます。認知がパフォーマンスを生み、エンジンはチームモメンタムを記憶します。", color: "blue" },
          { icon: "💬", title: "コメントスレッド", desc: "Day 30でディールが停滞。マネージャーがコメント：'チャンピオン戦略を試して。' 戦略はデータのある場所で流れます — Slack、メール、CRMを行き来する必要はありません。", color: "purple" },
          { icon: "📌", title: "ピン & @メンション", desc: "重要な活動をピン留め。5億円のディールがP(Win) 85%に達したらVPを@メンション。適切な人が適切なディールを適切なタイミングで見ます。", color: "orange" },
          { icon: "🔔", title: "リアルタイム通知", desc: "チームメートがProject Alphaにキーシグナルを記録。3秒でプッシュ通知が届きます。競合より先に対応しましょう。", color: "emerald" }
        ],
        feedTitle: "Activity Social Feed",
        feedDesc: "散在するSlackスレッドや埋もれたメールは忘れてください。すべてのミーティング、すべてのシグナル、すべての戦略的インサイトが一つの統合フィードで共有されます。チームの集合知が毎回のインタラクションで複利成長します。",
        hubTitle: "EXA Workspace Hub",
        hubBadge: "Coming Soon",
        hubDesc: "EXAWinのソーシャルフィードは始まりに過ぎません。EXA Workspace Hubと統合し、営業・運営・コミュニケーションが一つのエコシステムに。",
        hubModules: ["チームチャット", "ビデオ通話", "ファイル共有", "お知らせ"]
      },
      screens: {
        sectionLabel: "Product Screens",
        sectionTitle: "See It",
        sectionTitleAccent: "In Action",
        sectionSubtitle: "ベイジアンの大衆化、EXAが実現します。",
        reassurance: "車を運転するためにエンジンの設計図を理解する必要はありません。複雑な確率数学はEXAのエンジンルームに任せて、データが指す方向にハンドルを切るだけです。最も精巧な知能を、最もシンプルな体験で提供します。",
        warRoom: {
          label: "Activity War Room",
          title: "すべてのミーティングがエンジンを動かす",
          desc: "すべての営業活動 — 発掘コール、デモ、交渉 — が完全なコンテキストとともに記録されます。ベイジアンエンジンがリアルタイムでシグナルを分析し、各インタラクション後にP(Win)、モメンタム、インピーダンスを更新します。",
          checks: ["活動ごとのリアルタイムP(Win)計算", "シグナルベースのインパクトスコアリング", "AI戦略インサイト"],
          badge: "ライブデータ"
        },
        editor: {
          label: "スマートアクティビティエディタ",
          title: "メモではなく、シグナルをキャプチャ",
          desc: "リッチアクティビティエディタが構造化データでミーティングコンテキストをキャプチャ — 観察されたシグナル、ステージ進行、戦略的アクションアイテム。すべてのディテールがベイジアンエンジンの証拠になります。",
          checks: ["インパクト加重シグナルタギング", "リッチテキストミーティングノート", "自動ステージ価値計算"],
          badge: "シグナル検出"
        },
        config: {
          label: "プロジェクト設定",
          title: "ベイジアン事前確率を微調整",
          desc: "各プロジェクトは独自のベイジアン設定を持ちます — カスタム事前確率(α, β)、サイレンスペナルティ、ステージウェイト。業界やディールの複雑さに合わせてエンジンを調整。",
          checks: ["プロジェクトごとのベイジアン事前確率チューニング", "サイレンスペナルティ設定", "ステージ＆シグナルインパクトカスタマイズ"],
          badge: "設定可能"
        }
      },
      insight: {
        label: "EXA Insight",
        title: "コンテキストを理解するヘルプ",
        desc: "マニュアルを探す必要はもうありません。EXA Insightは現在の画面を読み取り、ベイジアンの基礎から高度なシグナル戦略まで、関連するガイダンスを即座に提供します。すべてのユーザーがエキスパートになれます。",
        checks: ["ページ認識型コンテキストドキュメント", "視覚的ベイジアン公式解説", "新メンバー向け内蔵オンボーディング"],
        badge: "スマートヘルプ"
      }
    },
    zh: {
      hero: {
        label: "Intelligent Sales Engine",
        title: "销售现已成为一门严谨的科学。",
        desc: "停止猜测，开始确信。EXAWin 利用递归贝叶斯推断将销售直觉转化为数学确定性。分析机会，计算胜率，并充满信心地达成交易。",
        cta_primary: "Start for Free",
        cta_secondary: "Sign In",
        cta_pricing: "View Pricing"
      },
      integration: {
        title: "企业架构",
        subtitle: "无界限的无限整合。",
        desc: "与现有的基础设施无缝结合，并根据独特的业务需求进行无限扩展。",
        cards: [
          {
            title: "On-Premise & Sovereignty",
            desc: "完整的数据主权。为了安全，直接安装在您的内部服务器或封闭网络环境中。",
            icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          },
          {
            title: "Legacy & ERP Sync",
            desc: "与 Global ERP、CRM、SCM 等现有系统双向同步。无重复输入，数据自然流动。",
            icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          },
          {
            title: "Hyper-Customization",
            desc: "根据您独特的销售方法，精确调整（Fine-tuning）算法权重和参数。",
            icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          },
          {
            title: "EXA Neural API",
            desc: "通过强大的 RESTful / GraphQL API，将 EXAWin 的推理引擎植入您的所有应用中。",
            icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          }
        ],
        cta: "咨询企业版"
      },
      dashboard: {
        title: "数据战场 (Battlefield)",
        subtitle: "销售战略的唯一真理来源",
        desc: "实时可视化整个销售漏斗。从信号检测到最终谈判，EXAWin 提供了一个指挥中心，在此跟踪、分析和优化每一个动作。"
      },
      mobile: {
        title: "口袋里的智能",
        subtitle: "随时随地，完整的指挥中心",
        desc: "销售发生在现场，而不是在办公桌前。在手机或平板电脑上查看实时概率，通过语音记录会议笔记，并获取即时信号警报。完全兼容 iOS 和 Android。",
        features: [
          { icon: "📱", title: "PWA原生体验", desc: "无需应用商店，直接安装到主屏幕。像原生应用一样即时启动，提供完整的离线功能。" },
          { icon: "🎤", title: "语音优先输入", desc: "刚在停车场结束客户会议？免提口述备注、信号和行动项。引擎会处理一切。" },
          { icon: "🔔", title: "实时推送通知", desc: "队友刚评论了你的交易。P(Win)突破了80%。不要错过关键时刻——提醒在几秒内到达。" },
          { icon: "📴", title: "离线就绪", desc: "地下车库。偏远客户现场。没有信号？没问题。离线记录活动——重新连接时自动同步。" },
          { icon: "⚡", title: "实时P(Win)仪表盘", desc: "在会议间的移动中查看投资组合的实时胜率。一目了然哪些交易需要立即关注。" }
        ]
      },
      features: [
        {
          title: "Activity FAB",
          desc: "记录每一次互动。会议、电话和邮件即时转化为定量的像数据点。",
          icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        },
        {
          title: "Bayesian Engine",
          desc: "核心引擎根据新证据不断重新计算胜率，消除乐观偏差。",
          icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        },
        {
          title: "Signal Master",
          desc: "检测微妙的客户购买信号。分类影响类型并衡量其对交易的权重。",
          icon: "M13 10V3L4 14h7v7l9-11h-7z"
        }
      ],
      articles: {
        title: "Theoretical Architecture (理论架构)",
        subtitle: "胜利的结构逻辑",
        loadMore: "Load More",
        showLess: "Show Less"
      },
      onboarding: {
        title: "How to Begin",
        steps: [
          { step: "01", title: "Create Account", desc: "注册免费层级以访问核心引擎。" },
          { step: "02", title: "Define Projects", desc: "注册正在进行的销售机会和客户。" },
          { step: "03", title: "Log Activities", desc: "输入会议结果并检测关键信号。" },
          { step: "04", title: "Analyze & Win", desc: "审查概率曲线并执行制胜战略。" }
        ]
      },
      final_cta: {
        title: "准备好主宰你的市场了吗？",
        button: "Get Started Now"
      },
      useCases: {
        title: "为每个销售团队而生",
        subtitle: "从个人代理到大型团队 — EXAWin 适配您的行业。",
        b2cLabel: "B2C",
        b2bLabel: "B2B",
        b2cBadge: "快速开始",
        cards: [
          { icon: "🏠", title: "房地产", desc: "实时追踪每个房源的成交概率。", detail: "客户反应信号 → 价格谈判 → 签约概率", category: "b2c" },
          { icon: "🛍️", title: "零售与分销", desc: "分析每位客户的购买转化率。", detail: "访问 → 兴趣 → 报价 → 购买信号追踪", category: "b2c" },
          { icon: "🚗", title: "汽车经销商", desc: "试驾 → 签约转化管道。", detail: "试驾反应、融资条件、竞品比较信号", category: "b2c" },
          { icon: "💄", title: "美容与健康", desc: "咨询 → 签约 → 回访概率。", detail: "首次咨询反应、价格敏感度、复购可能性", category: "b2c" },
          { icon: "☁️", title: "IT / SaaS", desc: "PoC → 签约转化追踪。", detail: "技术验证、内部审批、竞品比较", category: "b2b" },
          { icon: "🏗️", title: "建筑工程", desc: "按项目预测投标中标率。", detail: "阶段性P(Win)、僵持时Silence Penalty", category: "b2b" },
          { icon: "💊", title: "制药与医疗器械", desc: "多方决策者管理。", detail: "Multi-signal分析、决策阻力Impedance测量", category: "b2b" },
          { icon: "🏦", title: "金融与保险", desc: "审核 → 审批 → 签约管道。", detail: "监管信号、多阶段审批追踪", category: "b2b" }
        ]
      },
      dealTimeline: {
        title: "查看交易如何展开",
        subtitle: "观察贝叶斯引擎追踪60天真实谈判的过程。",
        steps: [
          { day: "Day 1", pWin: 25, label: "首次会议", desc: "初步探索会议。建立基准概率。", alpha: "α 2.0", beta: "β 6.0" },
          { day: "Day 15", pWin: 55, label: "积极信号", desc: "预算已确认。技术演示成功。", alpha: "α 4.5", beta: "β 3.7" },
          { day: "Day 30", pWin: 42, label: "沉默期", desc: "两周无回应。应用Silence Penalty。", alpha: "α 4.5", beta: "β 6.2" },
          { day: "Day 45", pWin: 78, label: "关键信号", desc: "法务审查MSA完成。内部支持者确认。", alpha: "α 8.1", beta: "β 2.3" },
          { day: "Day 60", pWin: 95, label: "成交", desc: "合同签署。贝叶斯预测确认 → 赢单！", alpha: "α 12.4", beta: "β 0.7" }
        ]
      },
      collaboration: {
        title: "Sales War Room",
        subtitle: "每笔交易都是团队任务。在EXAWin内直接沟通、反应、对齐。",
        badge: "实时协作",
        features: [
          { icon: "👍", title: "反应", desc: "新人销售拿下了一场艰难的谈判。点击'好动作'，整个团队都能看到。认可驱动绩效——引擎会记住团队动量。", color: "blue" },
          { icon: "💬", title: "评论线程", desc: "Day 30交易陷入僵局。经理评论：'试试冠军策略。' 策略在数据所在的地方流动——不再在Slack、邮件和CRM之间来回切换。", color: "purple" },
          { icon: "📌", title: "置顶 & @提及", desc: "置顶关键活动。当500万交易的P(Win)达到85%时@提及VP。对的人在对的时刻看到对的交易。", color: "orange" },
          { icon: "🔔", title: "实时通知", desc: "队友刚在Project Alpha上记录了关键信号。3秒内收到推送通知。比竞争对手更快做出反应。", color: "emerald" }
        ],
        feedTitle: "Activity Social Feed",
        feedDesc: "忘掉散落的Slack线程和被淹没的邮件吧。每次会议、每个信号、每个战略洞察——在一个统一信息流中共享。团队的集体智慧随着每次互动复利增长。",
        hubTitle: "EXA Workspace Hub",
        hubBadge: "Coming Soon",
        hubDesc: "EXAWin的社交信息流只是开始。与EXA Workspace Hub整合，实现销售-运营-沟通的统一生态系统。",
        hubModules: ["团队聊天", "视频通话", "文件共享", "公告"]
      },
      screens: {
        sectionLabel: "Product Screens",
        sectionTitle: "See It",
        sectionTitleAccent: "In Action",
        sectionSubtitle: "贝叶斯大众化，EXA来实现。",
        reassurance: "开车不需要理解发动机设计图。将复杂的概率数学交给EXA的引擎室，您只需朝着数据指向的方向转动方向盘。以最简单的体验，提供最精密的智能。",
        warRoom: {
          label: "Activity War Room",
          title: "每次会议都驱动引擎",
          desc: "每项销售活动 — 发掘电话、演示、谈判 — 都附带完整上下文记录。贝叶斯引擎实时分析信号，在每次互动后更新P(Win)、动量和阻力。",
          checks: ["每活动实时P(Win)计算", "基于信号的影响力评分", "AI驱动的策略洞察"],
          badge: "实时数据"
        },
        editor: {
          label: "智能活动编辑器",
          title: "捕获信号，而非仅仅是笔记",
          desc: "丰富的活动编辑器以结构化数据捕获会议上下文 — 观察到的信号、阶段进展和战略行动项。每个细节都成为贝叶斯引擎的证据。",
          checks: ["带影响权重的信号标记", "富文本会议记录", "自动阶段价值计算"],
          badge: "信号检测"
        },
        config: {
          label: "项目配置",
          title: "微调您的贝叶斯先验",
          desc: "每个项目拥有独立的贝叶斯配置 — 自定义先验(α, β)、沉默惩罚和阶段权重。根据行业和交易复杂度调优引擎。",
          checks: ["项目级贝叶斯先验调优", "沉默惩罚配置", "阶段和信号影响力自定义"],
          badge: "可配置"
        }
      },
      insight: {
        label: "EXA Insight",
        title: "理解上下文的智能帮助",
        desc: "不再需要翻阅手册。EXA Insight读取当前屏幕，即时提供从贝叶斯基础到高级信号策略的相关指导。每位用户都能成为专家。",
        checks: ["页面感知的上下文文档", "可视化贝叶斯公式解说", "内置新成员入职引导"],
        badge: "智能帮助"
      }
    },
    vi: {
      hero: {
        label: "Intelligent Sales Engine",
        title: "Bán hàng là một Khoa học Chính xác.",
        desc: "Ngừng phỏng đoán. Bắt đầu nắm bắt sự thật. EXAWin chuyển đổi trực giác bán hàng thành sự chắc chắn toán học bằng Suy luận Bayesian Đệ quy. Phân tích cơ hội, tính toán xác suất thắng và chốt deal một cách tự tin.",
        cta_primary: "Start for Free",
        cta_secondary: "Sign In",
        cta_pricing: "View Pricing"
      },
      integration: {
        title: "Kiến trúc Doanh nghiệp",
        subtitle: "Hội nhập không giới hạn.",
        desc: "Hợp nhất liền mạch với cơ sở hạ tầng của bạn và mở rộng không giới hạn theo yêu cầu kinh doanh riêng biệt.",
        cards: [
          {
            title: "On-Premise & Sovereignty",
            desc: "Quyền kiểm soát dữ liệu hoàn toàn. Triển khai trên máy chủ nội bộ hoặc mạng kín của bạn để bảo mật tối đa.",
            icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          },
          {
            title: "Legacy & ERP Sync",
            desc: "Đồng bộ hóa hai chiều với các hệ thống Global ERP, CRM và SCM. Không nhập liệu kép, dữ liệu tự động lưu thông.",
            icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          },
          {
            title: "Hyper-Customization",
            desc: "Tinh chỉnh các thuật toán và trọng số tham số để phù hợp với phương pháp bán hàng độc đáo của bạn.",
            icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          },
          {
            title: "EXA Neural API",
            desc: "Tích hợp công cụ suy luận của EXAWin vào các ứng dụng của bạn thông qua API RESTful / GraphQL mạnh mẽ.",
            icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          }
        ],
        cta: "Liên hệ Bộ phận Doanh nghiệp"
      },
      dashboard: {
        title: "Chiến trường Dữ liệu (Battlefield)",
        subtitle: "Nguồn sự thật duy nhất cho chiến lược bán hàng của bạn",
        desc: "Trực quan hóa toàn bộ quy trình bán hàng trong thời gian thực. Từ phát hiện tín hiệu đến đàm phán cuối cùng, EXAWin cung cấp một trung tâm chỉ huy nơi mọi chuyển động đều được theo dõi, phân tích và tối ưu hóa."
      },
      mobile: {
        title: "Trí tuệ trong Tầm tay",
        subtitle: "Trung tâm Chỉ huy Hoàn chỉnh, Mọi lúc Mọi nơi",
        desc: "Bán hàng diễn ra tại hiện trường, không phải tại bàn làm việc. Truy cập xác suất thời gian thực, ghi lại ghi chú cuộc họp bằng giọng nói và nhận cảnh báo tín hiệu tức thì trên điện thoại hoặc máy tính bảng của bạn. Tương thích hoàn toàn với iOS và Android.",
        features: [
          { icon: "📱", title: "Trải nghiệm PWA gốc", desc: "Cài đặt trực tiếp lên màn hình chính — không cần app store. Khởi động nhanh như ứng dụng gốc với đầy đủ khả năng offline." },
          { icon: "🎤", title: "Ưu tiên nhập giọng nói", desc: "Vừa kết thúc cuộc họp khách hàng ở bãi đỗ xe? Đọc ghi chú, tín hiệu và hành động cần thực hiện bằng giọng nói. Engine xử lý tất cả." },
          { icon: "🔔", title: "Thông báo đẩy thời gian thực", desc: "Đồng nghiệp vừa bình luận về deal của bạn. P(Win) vượt 80%. Đừng bỏ lỡ khoảnh khắc quan trọng — thông báo đến trong vài giây." },
          { icon: "📴", title: "Sẵn sàng offline", desc: "Hầm để xe. Công trường khách hàng vùng sâu. Không có sóng? Không vấn đề. Ghi nhận hoạt động offline — tự động đồng bộ khi kết nối lại." },
          { icon: "⚡", title: "Bảng P(Win) thời gian thực", desc: "Kiểm tra xác suất thắng thời gian thực của danh mục giữa các cuộc họp. Một cái nhìn cho biết deal nào cần chú ý ngay lập tức." }
        ]
      },
      features: [
        {
          title: "Activity FAB",
          desc: "Ghi lại mọi tương tác. Cuộc họp, cuộc gọi và email được chuyển đổi ngay lập tức thành các điểm dữ liệu định lượng.",
          icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        },
        {
          title: "Bayesian Engine",
          desc: "Công cụ cốt lõi liên tục tính toán lại xác suất thắng dựa trên bằng chứng mới, loại bỏ thiên kiến lạc quan.",
          icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        },
        {
          title: "Signal Master",
          desc: "Phát hiện các tín hiệu mua hàng tinh tế. Phân loại loại tác động và đo lường trọng số của chúng đối với thỏa thuận.",
          icon: "M13 10V3L4 14h7v7l9-11h-7z"
        }
      ],
      articles: {
        title: "Theoretical Architecture (Kiến trúc Lý thuyết)",
        subtitle: "Logic Cấu trúc của Chiến thắng",
        loadMore: "Load More",
        showLess: "Show Less"
      },
      onboarding: {
        title: "How to Begin",
        steps: [
          { step: "01", title: "Create Account", desc: "Đăng ký gói miễn phí để truy cập công cụ cốt lõi." },
          { step: "02", title: "Define Projects", desc: "Đăng ký các cơ hội bán hàng và khách hàng đang diễn ra." },
          { step: "03", title: "Log Activities", desc: "Nhập kết quả cuộc họp và phát hiện các tín hiệu chính." },
          { step: "04", title: "Analyze & Win", desc: "Xem xét đường cong xác suất và thực hiện chiến lược chiến thắng." }
        ]
      },
      final_cta: {
        title: "Sẵn sàng thống lĩnh thị trường của bạn?",
        button: "Get Started Now"
      },
      useCases: {
        title: "Được tạo cho mọi đội ngũ bán hàng",
        subtitle: "Từ đại lý cá nhân đến đội ngũ lớn — EXAWin thích ứng với ngành nghề của bạn.",
        b2cLabel: "B2C",
        b2bLabel: "B2B",
        b2cBadge: "Bắt đầu nhanh",
        cards: [
          { icon: "🏠", title: "Bất động sản", desc: "Theo dõi xác suất giao dịch theo thời gian thực.", detail: "Tín hiệu phản ứng khách hàng → đàm phán giá → xác suất hợp đồng", category: "b2c" },
          { icon: "🛍️", title: "Bán lẻ & Phân phối", desc: "Phân tích tỷ lệ chuyển đổi mua hàng.", detail: "Truy cập → quan tâm → báo giá → theo dõi tín hiệu mua", category: "b2c" },
          { icon: "🚗", title: "Đại lý ô tô", desc: "Lái thử → pipeline chuyển đổi hợp đồng.", detail: "Phản ứng lái thử, điều kiện tài chính, tín hiệu so sánh đối thủ", category: "b2c" },
          { icon: "💄", title: "Sắc đẹp & Sức khỏe", desc: "Tư vấn → hợp đồng → xác suất tái khám.", detail: "Phản ứng tư vấn lần đầu, độ nhạy giá, khả năng mua lại", category: "b2c" },
          { icon: "☁️", title: "IT / SaaS", desc: "PoC → theo dõi chuyển đổi hợp đồng.", detail: "Xác nhận kỹ thuật, phê duyệt nội bộ, so sánh đối thủ", category: "b2b" },
          { icon: "🏗️", title: "Xây dựng", desc: "Dự đoán tỷ lệ trúng thầu.", detail: "P(Win) theo giai đoạn, Silence Penalty khi bế tắc", category: "b2b" },
          { icon: "💊", title: "Dược phẩm & Y tế", desc: "Quản lý nhiều bên ra quyết định.", detail: "Phân tích Multi-signal, đo Impedance kháng quyết định", category: "b2b" },
          { icon: "🏦", title: "Tài chính & Bảo hiểm", desc: "Xét duyệt → phê duyệt → pipeline hợp đồng.", detail: "Tín hiệu quy định, theo dõi phê duyệt đa cấp", category: "b2b" }
        ]
      },
      dealTimeline: {
        title: "Xem giao dịch diễn ra như thế nào",
        subtitle: "Theo dõi engine Bayesian truy vết cuộc đàm phán thực tế trong 60 ngày.",
        steps: [
          { day: "Day 1", pWin: 25, label: "Cuộc họp đầu tiên", desc: "Cuộc gọi khám phá ban đầu. Thiết lập xác suất cơ sở.", alpha: "α 2.0", beta: "β 6.0" },
          { day: "Day 15", pWin: 55, label: "Tín hiệu tích cực", desc: "Ngân sách đã xác nhận. Demo kỹ thuật thành công.", alpha: "α 4.5", beta: "β 3.7" },
          { day: "Day 30", pWin: 42, label: "Giai đoạn im lặng", desc: "Không phản hồi trong 2 tuần. Áp dụng Silence Penalty.", alpha: "α 4.5", beta: "β 6.2" },
          { day: "Day 45", pWin: 78, label: "Tín hiệu then chốt", desc: "Pháp lý đã xem xét MSA. Champion nội bộ xác nhận.", alpha: "α 8.1", beta: "β 2.3" },
          { day: "Day 60", pWin: 95, label: "Chốt giao dịch", desc: "Hợp đồng ký kết. Dự đoán Bayesian xác nhận → Thắng!", alpha: "α 12.4", beta: "β 0.7" }
        ]
      },
      collaboration: {
        title: "Sales War Room",
        subtitle: "Mọi giao dịch đều là nhiệm vụ đội nhóm. Giao tiếp, phản ứng và đồng bộ — ngay trong EXAWin.",
        badge: "Cộng tác Thời gian thực",
        features: [
          { icon: "👍", title: "Phản ứng", desc: "Nhân viên mới vừa xử lý thành công cuộc đàm phán khó. Nhấn 'Tốt lắm' và cả đội đều thấy. Sự công nhận thúc đẩy hiệu suất — engine ghi nhớ momentum đội nhóm.", color: "blue" },
          { icon: "💬", title: "Chuỗi bình luận", desc: "Deal đang bế tắc ở Day 30. Quản lý bình luận: 'Thử chiến lược champion.' Chiến lược lưu chuyển ngay tại nơi dữ liệu tồn tại — không cần chuyển qua Slack, email, CRM.", color: "purple" },
          { icon: "📌", title: "Ghim & @Nhắc", desc: "Ghim hoạt động quyết định. Deal 10 tỷ đạt P(Win) 85% thì @nhắc VP. Đúng người thấy đúng deal vào đúng thời điểm.", color: "orange" },
          { icon: "🔔", title: "Thông báo trực tiếp", desc: "Đồng nghiệp vừa ghi nhận tín hiệu quan trọng trên Project Alpha. Push notification đến trong 3 giây. Phản ứng trước đối thủ.", color: "emerald" }
        ],
        feedTitle: "Activity Social Feed",
        feedDesc: "Quên đi những thread Slack rời rạc và email bị chôn vùi. Mọi cuộc họp, mọi tín hiệu, mọi chiến lược — chia sẻ trong một feed thống nhất. Trí tuệ tập thể của đội tăng trưởng kép theo mỗi tương tác.",
        hubTitle: "EXA Workspace Hub",
        hubBadge: "Coming Soon",
        hubDesc: "Social feed của EXAWin chỉ là khởi đầu. Tích hợp với EXA Workspace Hub để thống nhất bán hàng-vận hành-giao tiếp.",
        hubModules: ["Nhắn tin nhóm", "Gọi video", "Chia sẻ tệp", "Thông báo"]
      },
      screens: {
        sectionLabel: "Product Screens",
        sectionTitle: "See It",
        sectionTitleAccent: "In Action",
        sectionSubtitle: "Đại chúng hóa Bayesian — EXA hiện thực hóa.",
        reassurance: "Bạn không cần hiểu bản vẽ thiết kế động cơ để lái xe. Hãy để toán xác suất phức tạp trong phòng máy của EXA — bạn chỉ cần bẻ lái theo hướng dữ liệu chỉ ra. Trí tuệ tinh vi nhất, được mang đến qua trải nghiệm đơn giản nhất.",
        warRoom: {
          label: "Activity War Room",
          title: "Mỗi cuộc họp đều nuôi dưỡng Engine",
          desc: "Mỗi hoạt động bán hàng — cuộc gọi khám phá, demo, đàm phán — được ghi lại với đầy đủ ngữ cảnh. Engine Bayesian phân tích tín hiệu theo thời gian thực, cập nhật P(Win), Momentum và Impedance sau mỗi tương tác.",
          checks: ["Tính P(Win) thời gian thực theo hoạt động", "Chấm điểm tác động dựa trên tín hiệu", "Phân tích chiến lược AI"],
          badge: "Dữ liệu trực tiếp"
        },
        editor: {
          label: "Trình soạn thảo hoạt động thông minh",
          title: "Nắm bắt Tín hiệu, Không chỉ Ghi chú",
          desc: "Trình soạn thảo hoạt động nắm bắt bối cảnh cuộc họp với dữ liệu có cấu trúc — tín hiệu quan sát được, tiến trình giai đoạn và hành động chiến lược. Mọi chi tiết đều trở thành bằng chứng cho engine Bayesian.",
          checks: ["Gắn thẻ tín hiệu với trọng số tác động", "Ghi chú cuộc họp rich text", "Tính giá trị giai đoạn tự động"],
          badge: "Phát hiện tín hiệu"
        },
        config: {
          label: "Cấu hình Dự án",
          title: "Tinh chỉnh Prior Bayesian của bạn",
          desc: "Mỗi dự án có cấu hình Bayesian riêng — prior tùy chỉnh (α, β), hình phạt im lặng và trọng số giai đoạn. Điều chỉnh engine phù hợp với ngành và độ phức tạp giao dịch.",
          checks: ["Tinh chỉnh prior Bayesian theo dự án", "Cấu hình hình phạt im lặng", "Tùy chỉnh tác động giai đoạn & tín hiệu"],
          badge: "Có thể cấu hình"
        }
      },
      insight: {
        label: "EXA Insight",
        title: "Trợ giúp thông minh theo ngữ cảnh",
        desc: "Không cần lục tìm tài liệu nữa. EXA Insight đọc màn hình hiện tại và cung cấp hướng dẫn phù hợp — từ nền tảng Bayesian đến chiến lược tín hiệu nâng cao. Mọi người dùng đều trở thành chuyên gia.",
        checks: ["Tài liệu nhận biết trang", "Giải thích công thức Bayesian trực quan", "Hướng dẫn sử dụng tích hợp cho thành viên mới"],
        badge: "Trợ giúp thông minh"
      }
    },
  };

  const t = content[locale as keyof typeof content] || content['en'];

  // 2. Fetch Related Articles
  const relatedPosts = allBlogs.filter(post => {
    const pathParts = post._raw.sourceFilePath.split('/');
    const postLocale = pathParts[1] || 'en';
    if (postLocale !== locale) return false;
    return post._raw.sourceFilePath.includes('-exawin_');
  });

  // Pagination State
  const [visiblePosts, setVisiblePosts] = useState(8);
  const [activeMobileTab, setActiveMobileTab] = useState(0);
  const [activeTextTab, setActiveTextTab] = useState(0);

  // Auto-slide mobile screenshots every 3 seconds (right side)
  // Alternates between dark and light mode images
  const darkIndices = [0, 2, 4, 6]; // dark mode image indices
  const lightIndices = [1, 3, 5, 7, 8, 9]; // light mode image indices
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMobileTab(prev => {
        // Check if current is dark (indices 0,2,4,6)
        const isDark = [0, 2, 4, 6].includes(prev);
        // Pick from opposite group
        const pool = isDark ? [1, 3, 5, 7, 8, 9] : [0, 2, 4, 6];
        return pool[Math.floor(Math.random() * pool.length)];
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Auto-cycle text focus every 4 seconds (left side, independent)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTextTab(prev => (prev + 1) % 5);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const displayPosts = relatedPosts.slice(0, visiblePosts);
  const hasMore = visiblePosts < relatedPosts.length;
  const isExpanded = visiblePosts > 8;

  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + 8);
  };

  const handleShowLess = () => {
    setVisiblePosts(8);
    const section = document.getElementById('research-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen flex flex-col transition-colors duration-500 font-sans w-screen overflow-x-hidden">
      <Header />

      {/* SECTION 1: HERO */}
      <main className="w-full pt-32 pb-24 relative overflow-hidden bg-gray-50 dark:bg-[#050505]">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-blue-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[600px] bg-orange-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-10 lg:pr-10"
            >
              <div className="flex items-center space-x-3">
                <span className="h-px w-8 bg-orange-600"></span>
                <span className="text-orange-600 font-bold tracking-widest text-sm uppercase">
                  {t.hero.label}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white leading-[0.95] tracking-tight">
                Sales as a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600 animate-gradient-x bg-[length:200%_auto]">
                  Rigorous Science.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
                {t.hero.desc}
              </p>

              <div className="flex flex-wrap gap-5 pt-4">
                <a
                  href={`/${locale}/pricing`}
                  className="px-10 py-5 bg-orange-600 text-white rounded-full font-bold text-lg shadow-xl shadow-orange-600/30 hover:bg-orange-700 hover:shadow-orange-600/50 hover:-translate-y-1 transition-all"
                >
                  {t.hero.cta_primary}
                </a>

                {/* Secondary CTA used as Pricing Link for now, or add a third button if needed. The design has 2 buttons in Hero. */}
                <a
                  href={`/${locale}/pricing`}
                  className="px-10 py-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-full font-bold text-lg hover:border-gray-400 dark:hover:border-gray-500 transition-all hover:-translate-y-1"
                >
                  {t.hero.cta_pricing}
                </a>
              </div>
            </motion.div>

            {/* Right: Live Bayesian Demo (Interactive) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative h-[650px] w-full"
            >
              <BayesianLiveDemo />
            </motion.div>

          </div>
        </div>
      </main>


      {/* SECTION 3: MOBILE SUPPORT — Interactive Showcase */}
      <section className="w-full py-24 bg-gray-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-orange-500/5 blur-[100px] pointer-events-none" />
        <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left: Text + Interactive Feature Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-orange-500 font-bold tracking-widest text-sm uppercase block">
              Any Device, Any Time
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight break-keep">
              <span className="block mb-3">{t.mobile.title}</span>
              <span className="text-gray-500 block">{t.mobile.subtitle}</span>
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
              {t.mobile.desc}
            </p>

            {/* Interactive Feature Tabs */}
            {(t as any).mobile?.features && (
              <div className="space-y-2 pt-2">
                {((t as any).mobile.features as Array<{ icon: string; title: string; desc: string }>).map((feat, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveTextTab(i)}
                    onMouseEnter={() => setActiveTextTab(i)}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all duration-300 ${activeTextTab === i
                      ? 'bg-orange-500/10 border-orange-500/40 shadow-lg shadow-orange-500/5'
                      : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10'
                      }`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <span className={`text-lg flex-shrink-0 mt-0.5 transition-transform duration-300 ${activeTextTab === i ? 'scale-125' : ''}`}>{feat.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-sm font-bold mb-0.5 transition-colors duration-300 ${activeTextTab === i ? 'text-orange-400' : 'text-white'}`}>{feat.title}</h4>
                      <p className={`text-xs leading-relaxed transition-all duration-300 ${activeTextTab === i ? 'text-gray-300 max-h-20 opacity-100' : 'text-gray-500 max-h-0 opacity-0 overflow-hidden'}`}>{feat.desc}</p>
                    </div>
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 transition-colors duration-300 ${activeTextTab === i ? 'bg-orange-500' : 'bg-gray-700'}`} />
                  </motion.button>
                ))}
              </div>
            )}

            {/* App Store Buttons */}
            <div className="flex gap-4 pt-4">
              <button className="flex items-center gap-3 bg-slate-800/80 hover:bg-slate-700 text-white px-6 py-3 rounded-2xl border border-slate-700 transition-colors duration-300 backdrop-blur-sm group">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 1.25.13 1.83.37-1.6 1-2.65 2.76-2.62 4.41.05 1.79 1.5 3.1 3.26 3.12.06.63.13 1.27.18 1.91zM13 3.5c.52-.7 1.15-1.4 1.97-1.5.17 1.84-1.68 3.56-3.29 3.53-.16-1.25.68-2.62 1.32-2.03z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 font-medium leading-none mb-0.5">Download on</div>
                  <div className="text-base font-bold leading-none">iOS App</div>
                </div>
              </button>

              <button className="flex items-center gap-3 bg-slate-800/80 hover:bg-slate-700 text-white px-6 py-3 rounded-2xl border border-slate-700 transition-colors duration-300 backdrop-blur-sm group">
                <svg className="w-6 h-6 fill-current text-green-400 group-hover:text-green-300 transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.523 15.3414C17.523 16.7118 16.4063 17.8213 15.0294 17.8213C13.6521 17.8213 12.5358 16.7118 12.5358 15.3414C12.5358 13.9714 13.6521 12.8615 15.0294 12.8615C16.4063 12.8615 17.523 13.9714 17.523 15.3414ZM6.5912 15.3414C6.5912 16.7118 5.47464 17.8213 4.09761 17.8213C2.72058 17.8213 1.60394 16.7118 1.60394 15.3414C1.60394 13.9714 2.72058 12.8615 4.09761 12.8615C5.47464 12.8615 6.5912 13.9714 6.5912 15.3414ZM16.2737 5.76007L18.4735 1.95079C18.5772 1.76997 18.5147 1.53934 18.3323 1.43555C18.1511 1.33203 17.9197 1.39414 17.8152 1.57468L15.5862 5.43475C13.4862 4.47954 11.085 4.47954 8.98506 5.43475L6.756 1.57468C6.65158 1.39414 6.42014 1.33203 6.23891 1.43555C6.05652 1.53934 5.99403 1.76997 6.0977 1.95079L8.29749 5.76007C3.32832 7.03923 0 11.9547 0 17.2965H24.5714C24.5714 11.9547 21.2427 7.03923 16.2737 5.76007Z" />
                </svg>
                <div className="text-left">
                  <div className="text-sm font-bold leading-none">Android</div>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Right: Auto-Sliding Phone Mockup with Real Screenshots */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative flex justify-center"
          >
            {(() => {
              const mobileScreens = [
                { src: '/static/images/mobile_projects.png', alt: 'My Projects - Dark', dark: true },
                { src: '/static/images/mobile_analytics_light.png', alt: 'Bayesian Analytics - Light', dark: false },
                { src: '/static/images/mobile_activity.png', alt: 'Activity Record - Dark', dark: true },
                { src: '/static/images/mobile_activity_list_light.png', alt: 'Activity List - Light', dark: false },
                { src: '/static/images/mobile_notifications.png', alt: 'Notifications - Dark', dark: true },
                { src: '/static/images/mobile_settings_light.png', alt: 'Settings - Light', dark: false },
                { src: '/static/images/mobile_analytics.png', alt: 'Bayesian Analytics - Dark', dark: true },
                { src: '/static/images/mobile_recent_light.png', alt: 'Recent Activities - Light', dark: false },
                { src: '/static/images/mobile_activity_light.png', alt: 'Activity Record - Light', dark: false },
                { src: '/static/images/mobile_projects_light.png', alt: 'My Projects - Light', dark: false },
              ];
              const currentScreen = mobileScreens[activeMobileTab] || mobileScreens[0];
              return (
                <div className="relative w-full max-w-[274px]">
                  {/* Phone Frame - border on outer, image in inner */}
                  <div className="rounded-[10px] border-[11px] border-black bg-black" style={{
                    boxShadow: currentScreen.dark
                      ? '0 0 35px rgba(59,130,246,0.18), 0 0 70px rgba(59,130,246,0.08), 0 25px 50px -12px rgba(0,0,0,0.55)'
                      : '0 0 40px rgba(255,255,255,0.15), 0 0 60px rgba(59,130,246,0.2), 0 25px 50px -12px rgba(0,0,0,0.55)'
                  }}>
                    <div className={`relative w-full h-[640px] rounded-[4px] overflow-hidden transition-colors duration-500 ${currentScreen.dark ? 'bg-[#0a1628]' : 'bg-white'}`}>

                      {mobileScreens.map((screen, idx) => (
                        <motion.div
                          key={idx}
                          className="absolute inset-0"
                          initial={false}
                          animate={{
                            opacity: activeMobileTab === idx ? 1 : 0,
                            x: activeMobileTab === idx ? 0 : activeMobileTab > idx ? -40 : 40,
                            scale: activeMobileTab === idx ? 1 : 0.95,
                          }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                          style={{ pointerEvents: activeMobileTab === idx ? 'auto' : 'none' }}
                        >
                          <Image
                            src={screen.src}
                            alt={screen.alt}
                            fill
                            className="object-cover object-top"
                            sizes="280px"
                            priority={idx === 0}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Slide Indicator Dots */}
                  <div className="flex justify-center gap-1.5 mt-4">
                    {mobileScreens.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveMobileTab(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${activeMobileTab === idx
                          ? 'bg-blue-500 w-5'
                          : 'bg-gray-600 hover:bg-gray-400'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </div>
      </section>
      {/* SECTION 4: CORE FEATURES */}
      <section className="w-full py-32 bg-white dark:bg-gray-900">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {t.features.map((feature, i) => (
              <div key={i} className="group p-10 rounded-[2rem] bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-orange-600 text-white flex items-center justify-center mb-8 shadow-lg shadow-orange-600/30 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* SECTION 4.7: DEAL INTELLIGENCE TIMELINE — 60-Day Deal Journey */}
      <section className="w-full py-32 bg-[#060612] relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold tracking-wider uppercase mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              Deal Intelligence
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              {(t as any).dealTimeline?.title || "See How a Deal Unfolds"}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {(t as any).dealTimeline?.subtitle || "Watch the Bayesian engine track a real negotiation over 60 days."}
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Connecting Line */}
            <div className="absolute top-[60px] left-0 right-0 h-1 bg-gradient-to-r from-red-500/30 via-orange-500/50 via-yellow-500/30 via-orange-500/50 to-emerald-500/80 rounded-full hidden lg:block" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4">
              {((t as any).dealTimeline?.steps || []).map((step: any, i: number) => {
                const isDown = step.pWin < ((t as any).dealTimeline?.steps?.[i - 1]?.pWin || 0);
                const isWin = step.pWin >= 90;
                const colorClass = isWin ? 'emerald' : isDown ? 'red' : 'orange';
                const bgGradient = isWin
                  ? 'from-emerald-500/20 to-emerald-500/5'
                  : isDown
                    ? 'from-red-500/20 to-red-500/5'
                    : 'from-orange-500/20 to-orange-500/5';
                const borderColor = isWin
                  ? 'border-emerald-500/40'
                  : isDown
                    ? 'border-red-500/30'
                    : 'border-orange-500/30';
                const textColor = isWin
                  ? 'text-emerald-400'
                  : isDown
                    ? 'text-red-400'
                    : 'text-orange-400';

                return (
                  <motion.div
                    key={i}
                    className="relative flex flex-col items-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                  >
                    {/* Node Circle */}
                    <div className={`relative z-20 w-[120px] h-[120px] rounded-full bg-gradient-to-b ${bgGradient} border-2 ${borderColor} flex flex-col items-center justify-center mb-6 shadow-lg`}>
                      <span className={`text-3xl font-black ${textColor}`}>
                        {step.pWin}%
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono mt-1">P(Win)</span>
                      {isDown && (
                        <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                        </span>
                      )}
                      {isWin && (
                        <span className="absolute -top-2 -right-2 text-xl">🏆</span>
                      )}
                    </div>

                    {/* Info Card */}
                    <div className={`p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/20 transition-all w-full text-center`}>
                      <span className={`text-xs font-bold ${textColor} tracking-wider block mb-1`}>{step.day}</span>
                      <h4 className="text-sm font-bold text-white mb-2">{step.label}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed mb-3">{step.desc}</p>
                      <div className="flex items-center justify-center gap-2 text-[10px] font-mono">
                        <span className="px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400">{step.alpha}</span>
                        <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400">{step.beta}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Progress bar visualization */}
            <motion.div
              className="mt-16 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>Day 1</span>
                <span className="text-emerald-400 font-bold">Day 60 → Won!</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white/[0.05] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 to-emerald-500"
                  initial={{ width: '0%' }}
                  whileInView={{ width: '95%' }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* SECTION 4: RELATED ARTICLES */}
      <section id="research-section" className="w-full py-32 bg-gray-50 dark:bg-[#050505] border-t border-gray-200 dark:border-gray-900">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="text-orange-600 font-bold tracking-widest text-sm uppercase mb-2 block">Knowledge Base</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">{t.articles.title}</h2>
            </div>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-xl text-right md:text-right hidden md:block">
              {t.articles.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayPosts.map((post) => (
              <PostCard key={post.path} post={post} />
            ))}
            {relatedPosts.length === 0 && (
              <div className="col-span-4 text-center py-24 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-300 dark:border-gray-800">
                <p className="text-gray-400 text-xl font-medium">No related articles found matching '-exawin_' for {locale}.</p>
              </div>
            )}
          </div>

          {relatedPosts.length > 8 && (
            <div className="mt-16 flex justify-center">
              {hasMore ? (
                <button
                  onClick={handleLoadMore}
                  className="px-10 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-bold border border-gray-200 dark:border-gray-700 hover:border-orange-500 transition-all shadow-sm"
                >
                  {t.articles.loadMore || "Load More"}
                </button>
              ) : (
                isExpanded && (
                  <button
                    onClick={handleShowLess}
                    className="px-10 py-3 text-gray-500 hover:text-orange-600 font-medium transition-colors"
                  >
                    {t.articles.showLess || "Show Less"}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </section>


      {/* SECTION 1.7: SEE IT IN ACTION — Real System Screenshots */}
      <section className="w-full py-24 lg:py-32 bg-gray-50 dark:bg-[#0a0a0a] relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 space-y-4"
          >
            <span className="text-orange-600 font-bold tracking-widest text-sm uppercase">{(t as any).screens?.sectionLabel || "Product Screens"}</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight">
              {(t as any).screens?.sectionTitle || "See It"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">{(t as any).screens?.sectionTitleAccent || "In Action"}</span>
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {(t as any).screens?.sectionSubtitle || "Manage every sales touchpoint with Bayesian precision — and turn uncertainty into winning strategies."}
            </p>
            <p className="text-base text-indigo-600/80 dark:text-indigo-400/80 max-w-3xl mx-auto mt-4 text-center leading-relaxed">
              <span className="italic">{(t as any).screens?.reassurance || "You don't need to understand engine blueprints to drive a car. Leave the complex probability math in EXA's engine room — just steer where the data points. The most sophisticated intelligence, delivered as the simplest experience."}</span>
            </p>
          </motion.div>

          {/* Screenshot 1: Activity War Room */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center"
            >
              {/* Text */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-xl">⚔️</span>
                  <span className="text-orange-600 font-bold text-sm uppercase tracking-wider">{(t as any).screens?.warRoom?.label || "Activity War Room"}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white">
                  {(t as any).screens?.warRoom?.title || "Every Meeting Feeds the Engine"}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {(t as any).screens?.warRoom?.desc || "Each sales activity — discovery calls, demos, negotiations — is recorded with full context. The Bayesian engine analyzes signals in real time, updating P(Win), Momentum, and Impedance after every interaction."}
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {((t as any).screens?.warRoom?.checks || ["Real-time P(Win) calculation per activity", "Signal-based impact scoring", "AI-powered strategy insights"]).map((check: string, i: number) => (
                    <li key={i} className="flex items-center gap-2"><span className="text-orange-500">✓</span> {check}</li>
                  ))}
                </ul>
              </div>
              {/* Image */}
              <motion.div
                className="lg:col-span-3 relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-gray-300/50 dark:shadow-black/50 border border-gray-200 dark:border-gray-800">
                  <Image
                    src="/static/images/exawin-activity-warroom.png"
                    alt="EXAWin Activity War Room — Real-time sales activity timeline with Bayesian analytics"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                    quality={90}
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {(t as any).screens?.warRoom?.badge || "LIVE DATA"}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Screenshot 2: Activity Editing (reversed layout) */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center"
            >
              {/* Image first (reversed order) */}
              <motion.div
                className="lg:col-span-3 relative group order-2 lg:order-1"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-gray-300/50 dark:shadow-black/50 border border-gray-200 dark:border-gray-800">
                  <Image
                    src="/static/images/exawin-activity-editing.png"
                    alt="EXAWin Activity Editor — Meeting notes, signals, and Bayesian parameters"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                    quality={90}
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-3 -left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {(t as any).screens?.editor?.badge || "SIGNAL DETECTION"}
                </div>
              </motion.div>
              {/* Text */}
              <div className="lg:col-span-2 space-y-4 order-1 lg:order-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xl">🎯</span>
                  <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">{(t as any).screens?.editor?.label || "Smart Activity Editor"}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white">
                  {(t as any).screens?.editor?.title || "Capture Signals, Not Just Notes"}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {(t as any).screens?.editor?.desc || "The rich activity editor captures meeting context with structured data — signals observed, stage progression, and strategic action items. Every detail becomes evidence for the Bayesian engine."}
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {((t as any).screens?.editor?.checks || ["Signal tagging with impact weights", "Rich text meeting notes", "Automatic stage value calculation"]).map((check: string, i: number) => (
                    <li key={i} className="flex items-center gap-2"><span className="text-blue-500">✓</span> {check}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Screenshot 3: EXA Insight — Contextual Help (Dark Mode Accent) */}
          <div className="relative -mx-6 px-6 py-16 rounded-3xl bg-gradient-to-br from-gray-900 via-[#0a0a1a] to-gray-900 border border-gray-800/50 my-8">
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center relative z-10"
            >
              {/* Image */}
              <motion.div
                className="lg:col-span-3 relative group order-2 lg:order-1"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-violet-500/10 border border-gray-700/50">
                  <Image
                    src="/static/images/exawin-insight-help.png"
                    alt="EXA Insight — Contextual help drawer explaining Bayesian analytics in real-time"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                    quality={90}
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-violet-500/30">
                  {(t as any).insight?.badge || "SMART HELP"}
                </div>
              </motion.div>
              {/* Text */}
              <div className="lg:col-span-2 space-y-4 order-1 lg:order-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-10 h-10 rounded-xl bg-violet-900/40 flex items-center justify-center text-xl">💡</span>
                  <span className="text-violet-400 font-bold text-sm uppercase tracking-wider">{(t as any).insight?.label || "EXA Insight"}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-black text-white">
                  {(t as any).insight?.title || "Help That Understands Context"}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {(t as any).insight?.desc || "No more searching through manuals. EXA Insight reads your current screen and delivers relevant guidance — from Bayesian fundamentals to advanced signal strategies. Every user becomes an expert."}
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  {((t as any).insight?.checks || ["Page-aware contextual documentation", "Bayesian formula explanations with visuals", "Built-in onboarding for new team members"]).map((check: string, i: number) => (
                    <li key={i} className="flex items-center gap-2"><span className="text-violet-400">✓</span> {check}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Screenshot 4: Project Master */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center"
            >
              {/* Text */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-xl">⚙️</span>
                  <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider">{(t as any).screens?.config?.label || "Project Configuration"}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white">
                  {(t as any).screens?.config?.title || "Fine-Tune Your Bayesian Priors"}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {(t as any).screens?.config?.desc || "Each project gets its own Bayesian configuration — custom priors (α, β), silence penalties, and stage weights. Tune the engine to match your industry and deal complexity."}
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {((t as any).screens?.config?.checks || ["Per-project Bayesian prior tuning", "Silence penalty configuration", "Stage & signal impact customization"]).map((check: string, i: number) => (
                    <li key={i} className="flex items-center gap-2"><span className="text-emerald-500">✓</span> {check}</li>
                  ))}
                </ul>
              </div>
              {/* Image */}
              <motion.div
                className="lg:col-span-3 relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-gray-300/50 dark:shadow-black/50 border border-gray-200 dark:border-gray-800">
                  <Image
                    src="/static/images/exawin-project-master.png"
                    alt="EXAWin Project Master — Bayesian prior configuration and project management"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                    quality={90}
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {(t as any).screens?.config?.badge || "CONFIGURABLE"}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* SECTION 4.5: INDUSTRY USE CASES — Built for Every Sales Team */}
      <section className="w-full py-32 bg-[#060612] relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-orange-500/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-t from-blue-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-bold tracking-wider uppercase mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              Industry Solutions
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              {(t as any).useCases?.title || "Built for Every Sales Team"}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {(t as any).useCases?.subtitle || "From solo agents to enterprise squads — EXAWin adapts to your industry."}
            </p>
          </motion.div>

          {/* B2C Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-bold tracking-wider">
                {(t as any).useCases?.b2cLabel || "B2C"}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-red-500/20 text-red-400 text-xs font-bold animate-pulse">
                🔥 {(t as any).useCases?.b2cBadge || "Quick Start"}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/30 to-transparent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {((t as any).useCases?.cards || []).filter((c: any) => c.category === 'b2c').map((card: any, i: number) => (
                <motion.div
                  key={i}
                  className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/30 hover:bg-emerald-500/[0.04] transition-all duration-500 cursor-pointer overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <span className="text-4xl mb-4 block">{card.icon}</span>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">{card.title}</h3>
                    <p className="text-sm text-gray-400 mb-3 leading-relaxed">{card.desc}</p>
                    <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500">
                      <div className="pt-3 border-t border-white/10">
                        <p className="text-xs text-emerald-400/80 font-mono leading-relaxed">{card.detail}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* B2B Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-sm font-bold tracking-wider">
                {(t as any).useCases?.b2bLabel || "B2B"}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {((t as any).useCases?.cards || []).filter((c: any) => c.category === 'b2b').map((card: any, i: number) => (
                <motion.div
                  key={i}
                  className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-blue-500/30 hover:bg-blue-500/[0.04] transition-all duration-500 cursor-pointer overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <span className="text-4xl mb-4 block">{card.icon}</span>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{card.title}</h3>
                    <p className="text-sm text-gray-400 mb-3 leading-relaxed">{card.desc}</p>
                    <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500">
                      <div className="pt-3 border-t border-white/10">
                        <p className="text-xs text-blue-400/80 font-mono leading-relaxed">{card.detail}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 4.9: SALES WAR ROOM — Communication & Collaboration */}
      <section className="w-full py-32 bg-[#0a0612] relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/8 to-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-t from-indigo-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold tracking-wider uppercase mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
              {(t as any).collaboration?.badge || "Real-Time Collaboration"}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              {(t as any).collaboration?.title || "Sales War Room"}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {(t as any).collaboration?.subtitle || "Every deal is a team mission."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Activity Social Feed */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {(t as any).collaboration?.feedTitle || "Activity Social Feed"}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {(t as any).collaboration?.feedDesc || "Every sales activity becomes a shared team asset."}
                </p>
              </div>

              {/* Mock Social Feed */}
              <div className="space-y-4">
                {((t as any).collaboration?.features || []).map((feat: any, i: number) => {
                  const colorMap: any = {
                    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', glow: 'from-blue-500/10' },
                    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', glow: 'from-purple-500/10' },
                    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400', glow: 'from-orange-500/10' },
                    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', glow: 'from-emerald-500/10' }
                  };
                  const c = colorMap[feat.color] || colorMap.blue;

                  return (
                    <motion.div
                      key={i}
                      className={`group relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:${c.border} transition-all duration-500 overflow-hidden`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: i * 0.12 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${c.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      <div className="relative z-10 flex items-start gap-4">
                        <span className="text-3xl flex-shrink-0">{feat.icon}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-base font-bold text-white mb-1 group-hover:${c.text} transition-colors`}>{feat.title}</h4>
                          <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right: EXA Workspace Hub Vision */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="mb-8 flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white">
                  {(t as any).collaboration?.hubTitle || "EXA Workspace Hub"}
                </h3>
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 border border-purple-500/30 text-purple-300 text-xs font-bold tracking-wider animate-pulse">
                  {(t as any).collaboration?.hubBadge || "Coming Soon"}
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                {(t as any).collaboration?.hubDesc || "EXAWin's social feed is just the beginning."}
              </p>

              {/* Hub Architecture Visualization */}
              <div className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />

                <div className="relative z-10">
                  {/* Central Hub */}
                  <div className="flex justify-center mb-8">
                    <motion.div
                      className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 border-2 border-purple-500/40 flex items-center justify-center shadow-[0_0_60px_rgba(147,51,234,0.3)]"
                      animate={{ boxShadow: ["0 0 30px rgba(147,51,234,0.2)", "0 0 60px rgba(147,51,234,0.5)", "0 0 30px rgba(147,51,234,0.2)"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <div className="text-center">
                        <span className="text-2xl block mb-1">🌐</span>
                        <span className="text-[10px] text-purple-300 font-bold tracking-wider">HUB</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Connected Modules */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* EXAWin Module */}
                    <motion.div
                      className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center"
                      animate={{ borderColor: ["rgba(249,115,22,0.2)", "rgba(249,115,22,0.5)", "rgba(249,115,22,0.2)"] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 0 }}
                    >
                      <span className="text-lg block mb-1">📊</span>
                      <span className="text-xs font-bold text-orange-400">EXAWin</span>
                      <p className="text-[10px] text-gray-500 mt-0.5">Sales Intelligence</p>
                    </motion.div>

                    {/* ERP Module */}
                    <motion.div
                      className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center"
                      animate={{ borderColor: ["rgba(59,130,246,0.2)", "rgba(59,130,246,0.5)", "rgba(59,130,246,0.2)"] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                    >
                      <span className="text-lg block mb-1">⚙️</span>
                      <span className="text-xs font-bold text-blue-400">EXA ERP</span>
                      <p className="text-[10px] text-gray-500 mt-0.5">Operations</p>
                    </motion.div>

                    {/* Hub Modules */}
                    {((t as any).collaboration?.hubModules || []).map((mod: string, i: number) => {
                      const icons = ["💬", "📹", "📁", "📢"];
                      return (
                        <motion.div
                          key={i}
                          className="p-3 rounded-xl bg-purple-500/[0.06] border border-purple-500/15 text-center"
                          animate={{ borderColor: ["rgba(147,51,234,0.15)", "rgba(147,51,234,0.4)", "rgba(147,51,234,0.15)"] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: 1 + i * 0.3 }}
                        >
                          <span className="text-sm block">{icons[i] || "📌"}</span>
                          <span className="text-[10px] font-bold text-purple-300 mt-0.5 block">{mod}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* NEW SECTION: ENTERPRISE INTEGRATION (Expanded) */}
      < section className="w-full py-32 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden" >
        {/* Subtle Grid Background */}
        < div className="absolute inset-0 bg-[url('/static/images/grid.svg')] opacity-[0.03]" />

        <div className="max-w-screen-2xl mx-auto px-6 relative z-10 text-white">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Column: Content & Cards */}
            <div>
              <div className="mb-12">
                <span className="text-orange-500 font-bold tracking-widest text-sm uppercase block mb-3">
                  {t.integration.title}
                </span>
                <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                  {t.integration.subtitle}
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed">
                  {t.integration.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {t.integration.cards.map((card, i) => (
                  <div key={i} className="group flex items-start gap-5 p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-orange-500 border border-gray-700 mt-1 shadow-lg shadow-orange-900/20 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors">{card.title}</h3>
                      <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors leading-relaxed mt-1">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <a href={`/${locale}/about`} className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors border-b border-gray-700 hover:border-white pb-0.5 uppercase tracking-wider group">
                  {t.integration.cta}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column: Integration Visual (Physical vs Chemical) */}
            <div className="relative h-[600px] flex items-center justify-center -mr-20 lg:mr-0 scale-90 lg:scale-100">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-blue-500/5 rounded-[3rem] blur-3xl pointer-events-none" />

              {/* Central Core (The Bridge) */}
              <motion.div
                className="relative z-30 w-48 h-48 bg-gray-900 rounded-full border-4 border-orange-500 shadow-[0_0_80px_rgba(249,115,22,0.4)] flex flex-col items-center justify-center group"
                animate={{ boxShadow: ["0 0 30px rgba(249,115,22,0.3)", "0 0 70px rgba(249,115,22,0.6)", "0 0 30px rgba(249,115,22,0.3)"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-xl font-black text-white text-center tracking-wider">EXA<br />CORE</div>
                <div className="absolute -bottom-10 text-xs text-orange-500 font-bold tracking-widest uppercase">Intelligence Hub</div>

                {/* Inner Pulse Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-orange-500/30"
                  animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>

              {/* Left Side: Physical Integration (Solid, Rooted) - STACKED */}
              <div className="absolute left-[0%] top-1/2 -translate-y-1/2 flex flex-col gap-8 items-end pr-8 border-r border-gray-800/50">
                {[
                  { label: "Global ERP", icon: "🌐", color: "blue", delay: 0 },
                  { label: "On-Premise Server", icon: "🏢", color: "gray", delay: 0.2 },
                  { label: "Legacy DB Pool", icon: "🗄️", color: "gray", delay: 0.4 }
                ].map((node, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: node.delay }}
                    className="relative flex items-center group"
                  >
                    <div className="text-right mr-6">
                      <div className="text-sm font-bold text-gray-200">{node.label}</div>
                      <div className="text-[10px] text-gray-500 font-mono">SECURE LINK</div>
                    </div>
                    <div className="w-16 h-16 bg-gray-900 border border-gray-700 rounded-xl flex items-center justify-center shadow-lg relative z-20 group-hover:border-white group-hover:bg-gray-800 transition-all">
                      <span className="text-2xl filter grayscale group-hover:src-none transition-all">{node.icon}</span>
                    </div>

                    {/* Solid Connector Line to Core */}
                    <div className="absolute left-full top-1/2 h-[2px] bg-gray-800 origin-left"
                      style={{
                        width: i === 1 ? '160px' : '180px',
                        transform: i === 0 ? "rotate(15deg)" : i === 2 ? "rotate(-15deg)" : "rotate(0deg)"
                      }}
                    >
                      <motion.div
                        className="w-20 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 1.5 + (i * 0.2), repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Side: Chemical Expansion (Fluid, Network) - RADIAL */}
              <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[50%] h-[100%] flex items-center">
                {/* Orbiting API Nodes */}
                {[
                  { label: "Analysis Module", angle: -60, dist: 180, icon: "🧩" },
                  { label: "Custom Logic", angle: -30, dist: 220, icon: "⚙️" },
                  { label: "API Mesh", angle: 0, dist: 190, icon: "⚡" },
                  { label: "Mobile SDK", angle: 30, dist: 210, icon: "📱" },
                  { label: "SaaS Tools", angle: 60, dist: 180, icon: "☁️" }
                ].map((node, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-0 pl-10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 + (i * 0.1), type: "spring" }}
                    style={{
                      transform: `translate(-50px, -50%) rotate(${node.angle}deg) translateX(${node.dist}px) rotate(${-node.angle}deg)`
                    }}
                  >
                    {/* Dotted Connector */}
                    <div className="absolute right-full top-1/2 h-[1px] bg-gradient-to-r from-orange-500 to-transparent origin-right"
                      style={{
                        transform: `translate(20px, -50%) rotate(${180 - node.angle + (node.angle)}deg)`, // Looking back at center
                        width: node.dist - 40
                      }}
                    />
                    <motion.div
                      className="absolute right-full top-1/2 w-2 h-2 rounded-full bg-orange-500 blur-[2px]"
                      animate={{ x: [0, node.dist], opacity: [1, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      style={{ transform: `translate(20px, -50%)` }} // Reset transform for animation
                    />

                    <div className="relative z-20 flex flex-col items-center group cursor-pointer hover:scale-110 transition-transform">
                      <div className="w-12 h-12 rounded-full bg-gray-950 border border-orange-500/30 group-hover:border-orange-500 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-colors">
                        <span className="text-lg">{node.icon}</span>
                      </div>
                      <div className="mt-2 text-[10px] font-bold text-orange-400/80 group-hover:text-orange-400 text-center whitespace-nowrap bg-black/50 px-2 py-0.5 rounded-full border border-orange-500/10 backdrop-blur-md">
                        {node.label}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Chemical Bond Effect Background (Glow) */}
                <motion.div
                  className="absolute top-1/2 left-[0px] -translate-y-1/2 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-3xl pointer-events-none"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
              </div>

            </div>

          </div>
        </div>
      </section >

      {/* SECTION 1.5: PORTFOLIO OVERVIEW — Multi-Project Real-Time Cards */}
      < section className="w-full py-24 lg:py-32 bg-white dark:bg-gray-950 relative overflow-hidden" >
        {/* Subtle background accent */}
        < div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <span className="text-orange-600 font-bold tracking-widest text-sm uppercase">Real-Time Pipeline</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight">
              Every Deal. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">Every Signal.</span>
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Track your entire portfolio at a glance. Each project updates in real-time as new evidence is gathered.
            </p>
          </motion.div>

          {/* 3-Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "GlobalMotion Corp",
                deal: "DX Consulting",
                pwin: 83.8,
                delta: "+45.3",
                deltaGood: true,
                status: "Won!",
                emoji: "🏆",
                statusBg: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400",
                meetings: 6,
                lastSignal: "Contract Agreed",
                sparkline: [38.5, 52.4, 79.1, 80.3, 81.6, 83.8],
              },
              {
                name: "NexaCore Systems",
                deal: "Cloud Migration",
                pwin: 80.4,
                delta: "+58.1",
                deltaGood: true,
                status: "Hot",
                emoji: "🔥",
                statusBg: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
                meetings: 5,
                lastSignal: "PoC Passed",
                sparkline: [22.3, 29.2, 47.1, 59.7, 80.4],
              },
              {
                name: "QuantumBridge",
                deal: "AI Platform PoC",
                pwin: 52.4,
                delta: "+30.1",
                deltaGood: true,
                status: "Growing",
                emoji: "📈",
                statusBg: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
                meetings: 5,
                lastSignal: "Re-engagement",
                sparkline: [22.3, 29.2, 45.5, 45.5, 52.4],
              },
            ].map((proj, idx) => {
              // Mini sparkline SVG
              const sw = 140, sh = 40, pad = 4;
              const minV = Math.min(...proj.sparkline);
              const maxV = Math.max(...proj.sparkline);
              const range = maxV - minV || 1;
              const pts = proj.sparkline.map((v, i) => {
                const x = pad + (i / (proj.sparkline.length - 1)) * (sw - pad * 2);
                const y = pad + (1 - (v - minV) / range) * (sh - pad * 2);
                return `${x},${y}`;
              }).join(' ');

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  className="group rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Top: Status + Project */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{proj.name}</h3>
                      <p className="text-sm text-gray-500">{proj.deal}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${proj.statusBg}`}>
                      {proj.emoji} {proj.status}
                    </span>
                  </div>

                  {/* P(Win) + Delta */}
                  <div className="flex items-end gap-3 mb-4">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.3, type: "spring" }}
                      className="text-4xl font-black text-gray-900 dark:text-white tabular-nums"
                    >
                      {proj.pwin}%
                    </motion.span>
                    <span className={`text-sm font-bold mb-1 ${proj.deltaGood ? 'text-emerald-600' : 'text-red-500'}`}>
                      {proj.deltaGood ? '↑' : '↓'} {proj.delta}
                    </span>
                  </div>

                  {/* Mini Sparkline */}
                  <div className="mb-4">
                    <svg width={sw} height={sh} viewBox={`0 0 ${sw} ${sh}`} className="w-full">
                      <defs>
                        <linearGradient id={`spark-${idx}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f97316" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <polygon
                        points={`${pad},${sh - pad} ${pts} ${pad + ((proj.sparkline.length - 1) / (proj.sparkline.length - 1)) * (sw - pad * 2)},${sh - pad}`}
                        fill={`url(#spark-${idx})`}
                      />
                      <motion.polyline
                        points={pts}
                        fill="none"
                        stroke="#f97316"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15 + 0.4, duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                  </div>

                  {/* Footer Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 border-t border-gray-200 dark:border-gray-800 pt-3">
                    <span>{proj.meetings} meetings</span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {proj.lastSignal}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section >


      {/* SECTION 5: ONBOARDING STEPS with Visual */}
      < section className="w-full py-32 bg-white dark:bg-gray-900" >
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-16 tracking-tight">{t.onboarding.title}</h2>
              <div className="space-y-8">
                {t.onboarding.steps.map((step, i) => (
                  <div key={i} className="flex gap-6 p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700 group cursor-default">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 font-bold flex items-center justify-center text-lg">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual: 3-Step Journey Montage */}
            <div className="order-1 lg:order-2 relative h-[500px] lg:h-[600px]">
              {/* Step 1: Sign Up (back, smallest) */}
              <motion.div
                className="absolute top-0 left-0 w-[75%] rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 shadow-2xl overflow-hidden z-10"
                initial={{ opacity: 0, y: 40, rotate: -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0 }}
              >
                <div className="bg-gray-800/80 px-4 py-2 flex items-center gap-2 border-b border-gray-700/50">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-[10px] text-gray-500 ml-2">exawin.app/signup</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-red-500 font-black text-lg">E</span>
                    <span className="text-white font-bold text-sm">XA</span>
                    <span className="text-gray-500 text-xs ml-2">Create Account</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-8 rounded-lg bg-gray-700/50 border border-gray-600/30 flex items-center px-3">
                      <span className="text-[10px] text-gray-400">Email</span>
                    </div>
                    <div className="h-8 rounded-lg bg-gray-700/50 border border-gray-600/30 flex items-center px-3">
                      <span className="text-[10px] text-gray-400">Password</span>
                    </div>
                    <div className="h-8 rounded-lg bg-orange-600 flex items-center justify-center">
                      <span className="text-[10px] text-white font-bold">Sign Up Free</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 2: Define Project (middle) */}
              <motion.div
                className="absolute top-16 left-[12%] w-[75%] rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 shadow-2xl overflow-hidden z-20"
                initial={{ opacity: 0, y: 40, rotate: -1 }}
                whileInView={{ opacity: 1, y: 0, rotate: -1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-gray-800/80 px-4 py-2 flex items-center gap-2 border-b border-gray-700/50">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-[10px] text-gray-500 ml-2">exawin.app/projects/new</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-bold text-sm">New Project</span>
                    <span className="text-[10px] text-gray-500 px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">Step 2/4</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-8 rounded-lg bg-gray-700/50 border border-gray-600/30 flex items-center px-3">
                      <span className="text-[10px] text-gray-400">Project: Samsung HQ Deal</span>
                    </div>
                    <div className="h-8 rounded-lg bg-gray-700/50 border border-gray-600/30 flex items-center px-3">
                      <span className="text-[10px] text-gray-400">Customer: Samsung Electronics</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 h-8 rounded-lg bg-gray-700/50 border border-gray-600/30 flex items-center px-3">
                        <span className="text-[10px] text-orange-400">Stage: Proposal</span>
                      </div>
                      <div className="flex-1 h-8 rounded-lg bg-gray-700/50 border border-gray-600/30 flex items-center px-3">
                        <span className="text-[10px] text-emerald-400">P(Win): 45%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 3: Dashboard (front, largest, HIGH IMPACT) */}
              <motion.div
                className="absolute top-24 left-[18%] w-[82%] rounded-2xl bg-gradient-to-br from-[#0d1117] to-[#161b22] border border-emerald-500/40 shadow-[0_0_60px_rgba(16,185,129,0.2),0_0_120px_rgba(16,185,129,0.05)] overflow-hidden z-30"
                initial={{ opacity: 0, y: 50, rotate: 1 }}
                whileInView={{ opacity: 1, y: 0, rotate: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                {/* Browser chrome */}
                <div className="bg-[#0d1117] px-4 py-2 flex items-center gap-2 border-b border-gray-700/50">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 mx-4 h-5 rounded bg-gray-800/80 flex items-center px-2">
                    <span className="text-[9px] text-gray-500">🔒 exawin.app/dashboard</span>
                  </div>
                </div>

                <div className="flex">
                  {/* Mini sidebar */}
                  <div className="w-10 bg-[#0d1117] border-r border-gray-800 py-3 flex flex-col items-center gap-3">
                    <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center">
                      <span className="text-[7px] text-white font-black">E</span>
                    </div>
                    <div className="w-5 h-5 rounded bg-gray-800 flex items-center justify-center text-[8px]">📊</div>
                    <div className="w-5 h-5 rounded bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-[8px]">📈</div>
                    <div className="w-5 h-5 rounded bg-gray-800 flex items-center justify-center text-[8px]">⚡</div>
                    <div className="w-5 h-5 rounded bg-gray-800 flex items-center justify-center text-[8px]">👥</div>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 p-4">
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-xs">Portfolio Dashboard</span>
                        <motion.span
                          className="text-[8px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1"
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block" />
                          Bayesian Engine Active
                        </motion.span>
                      </div>
                      <span className="text-[8px] text-gray-500">Last updated: 2m ago</span>
                    </div>

                    {/* KPI Row */}
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {[
                        { label: 'Win Rate', value: '78%', change: '+12%', icon: '🎯', bg: 'bg-emerald-500/5', border: 'border-emerald-500/15', labelColor: 'text-emerald-400', valueColor: 'text-emerald-300' },
                        { label: 'Pipeline', value: '$2.4M', change: '+$340K', icon: '💰', bg: 'bg-blue-500/5', border: 'border-blue-500/15', labelColor: 'text-blue-400', valueColor: 'text-blue-300' },
                        { label: 'Active Deals', value: '12', change: '+3', icon: '🔥', bg: 'bg-orange-500/5', border: 'border-orange-500/15', labelColor: 'text-orange-400', valueColor: 'text-orange-300' },
                        { label: 'Signals', value: '47', change: '+8', icon: '⚡', bg: 'bg-purple-500/5', border: 'border-purple-500/15', labelColor: 'text-purple-400', valueColor: 'text-purple-300' },
                      ].map((kpi, i) => (
                        <motion.div
                          key={i}
                          className={`p-2 rounded-lg ${kpi.bg} border ${kpi.border}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: false, amount: 0.3 }}
                          transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-[8px]">{kpi.icon}</span>
                            <span className={`text-[7px] ${kpi.labelColor} font-medium`}>{kpi.label}</span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className={`text-sm ${kpi.valueColor} font-black`}>{kpi.value}</span>
                            <span className="text-[7px] text-emerald-400">↑{kpi.change}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Two-column: Pipeline Funnel + Win Probability Chart */}
                    <div className="grid grid-cols-2 gap-2">
                      {/* Pipeline Funnel */}
                      <div className="p-2 rounded-lg bg-gray-800/40 border border-gray-700/30">
                        <span className="text-[8px] text-gray-400 font-medium block mb-2">Deal Pipeline</span>
                        <div className="space-y-1">
                          {[
                            { stage: 'Discovery', count: 5, width: '100%', color: 'bg-blue-500/60' },
                            { stage: 'Proposal', count: 4, width: '80%', color: 'bg-orange-500/60' },
                            { stage: 'Negotiation', count: 2, width: '50%', color: 'bg-yellow-500/60' },
                            { stage: 'Closing', count: 1, width: '30%', color: 'bg-emerald-500/70' },
                          ].map((s, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <span className="text-[7px] text-gray-500 w-12 truncate">{s.stage}</span>
                              <div className="flex-1 h-3 bg-gray-700/30 rounded overflow-hidden">
                                <motion.div
                                  className={`h-full ${s.color} rounded flex items-center justify-end pr-1`}
                                  initial={{ width: 0 }}
                                  whileInView={{ width: s.width }}
                                  viewport={{ once: false, amount: 0.3 }}
                                  transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                                >
                                  <span className="text-[6px] text-white font-bold">{s.count}</span>
                                </motion.div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Win Probability Gauge */}
                      <div className="p-2 rounded-lg bg-gray-800/40 border border-gray-700/30">
                        <span className="text-[8px] text-gray-400 font-medium block mb-2">P(Win) Trend</span>
                        <div className="flex items-end gap-1 h-12">
                          {[35, 42, 55, 48, 62, 58, 68, 72, 75, 78].map((h, i) => (
                            <motion.div
                              key={i}
                              className={`flex-1 rounded-t ${i >= 8 ? 'bg-emerald-500' : i >= 5 ? 'bg-emerald-500/50' : 'bg-gray-600/40'}`}
                              initial={{ height: 0 }}
                              whileInView={{ height: `${h}%` }}
                              viewport={{ once: false, amount: 0.3 }}
                              transition={{ duration: 0.3, delay: 0.7 + i * 0.04 }}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-[6px] text-gray-600">Jan</span>
                          <span className="text-[6px] text-emerald-400 font-bold">78% ▲</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section >

      {/* SECTION 6: FINAL CTA */}
      < section className="w-full py-32 bg-gray-900 text-white relative overflow-hidden" >
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/static/images/business_meeting.png" alt="bg" fill className="object-cover grayscale" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-900 z-10" />

        <div className="max-w-6xl mx-auto px-6 relative z-20 text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tight whitespace-nowrap overflow-visible">
            {t.final_cta.title}
          </h2>
          <a
            href={`/${locale}/pricing`}
            className="inline-flex items-center justify-center px-16 py-6 bg-orange-600 text-white rounded-full font-bold text-2xl shadow-2xl hover:bg-orange-700 hover:scale-105 transition-all"
          >
            {t.final_cta.button}
          </a>
        </div>
      </section >

      <Footer />
    </div >
  );
}
