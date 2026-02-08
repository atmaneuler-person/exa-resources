"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { allBlogs } from 'contentlayer/generated';
import PostCard from '@/components/shared/PostCard'; 

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
        desc: "Sales happen in the field, not at a desk. Access real-time probabilities, log meeting notes via voice, and get instant signal alerts on your phone or tablet. Fully compatible with iOS and Android."
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
            desc: "영업은 책상이 아닌 현장에서 이루어집니다. 실시간 확률을 확인하고, 음성으로 미팅 노트를 기록하며, 중요한 신호 알림을 휴대폰이나 태블릿에서 즉시 받으십시오. iOS 및 Android 완벽 지원."
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
            desc: "営業はデスクではなく現場で起こります。リアルタイムの確率を確認し、音声で会議メモを記録し、携帯電話やタブレットで重要なシグナルアラートを即座に受け取ります。iOSおよびAndroidに完全対応。"
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
            desc: "销售发生在现场，而不是在办公桌前。在手机或平板电脑上查看实时概率，通过语音记录会议笔记，并获取即时信号警报。完全兼容 iOS 和 Android。"
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
            desc: "Bán hàng diễn ra tại hiện trường, không phải tại bàn làm việc. Truy cập xác suất thời gian thực, ghi lại ghi chú cuộc họp bằng giọng nói và nhận cảnh báo tín hiệu tức thì trên điện thoại hoặc máy tính bảng của bạn. Tương thích hoàn toàn với iOS và Android."
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
  const displayPosts = relatedPosts.slice(0, visiblePosts);
  const hasMore = visiblePosts < relatedPosts.length;
  const isExpanded = visiblePosts > 8;

  const handleLoadMore = () => {
      setVisiblePosts(prev => prev + 8);
  };

  const handleShowLess = () => {
      setVisiblePosts(8);
      const section = document.getElementById('research-section');
      if(section) section.scrollIntoView({ behavior: 'smooth' });
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
                Sales as a <br/>
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

            {/* Right: Realistic Business Visual with 3D Tilt Effect */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              style={{ perspective: 1000 }}
              className="relative h-[650px] w-full rounded-[2rem] overflow-hidden group shadow-2xl shadow-gray-200 dark:shadow-black/50"
            >
               <Image 
                 src="/static/images/business_meeting.png"
                 alt="Professional Business Meeting"
                 fill
                 className="object-cover transition-transform duration-700 group-hover:scale-105"
                 priority
               />
               {/* Soft overlay gradient */}
               <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
            </motion.div>

          </div>
        </div>
      </main>

      {/* SECTION 2: DASHBOARD PREVIEW with 3D Isometric View */}
      <section className="w-full py-32 bg-[#050505] relative overflow-hidden text-white min-h-[900px] flex flex-col justify-center">
          {/* Layer 0: Deep Void Grid Background */}
          <div className="absolute inset-0 bg-[url('/static/images/grid.svg')] opacity-10" />
          
          <div className="max-w-screen-2xl mx-auto px-6 relative z-10 w-full">
             <div className="text-center mb-12 space-y-4">
                 <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 tracking-tight"
                 >
                    {t.dashboard.title}
                 </motion.h2>
                 <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl md:text-3xl font-medium text-gray-400 max-w-4xl mx-auto"
                 >
                    {t.dashboard.desc}
                 </motion.p>
             </div>

             {/* 3D Isometric Command Center Container */}
             <div className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center perspective-[2000px]">
                
                {/* Layer 1: Digital Terrain (Base) - Tilted Plane */}
                <motion.div 
                    initial={{ opacity: 0, rotateX: 20, scale: 0.8 }}
                    whileInView={{ opacity: 1, rotateX: 45, scale: 1.2 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute w-[120%] h-[120%] top-[-10%] left-[-10%] z-0"
                >
                     <Image 
                        src="/static/images/digital_terrain.png" 
                        alt="Digital Terrain" 
                        fill 
                        className="object-cover opacity-60"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
                     <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
                </motion.div>

                {/* Layer 2: Isometric Dashboard Panel (Floating Core) */}
                <motion.div 
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    animate={{ y: [0, -20, 0] }}
                    // @ts-ignore
                    transition={{ 
                        y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
                    }}
                    className="relative z-10 w-[90%] md:w-[70%] aspect-[4/3] max-w-5xl"
                >
                    <Image 
                        src="/static/images/iso_dashboard.png" 
                        alt="Isometric Dashboard Interface" 
                        fill
                        className="object-contain drop-shadow-[0_20px_50px_rgba(59,130,246,0.5)]"
                    />
                    
                    {/* Floating Hotspots on Iso Dashboard */}
                    <div className="absolute top-[30%] left-[20%] z-20">
                        <div className="relative group/iso-spot">
                            <span className="flex h-4 w-4 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.8)]"></span>
                            </span>
                            <div className="absolute left-6 top-0 w-48 bg-black/80 backdrop-blur border border-orange-500/30 p-3 rounded-lg opacity-0 group-hover/iso-spot:opacity-100 transition-all text-xs border-l-2 border-l-orange-500">
                                <span className="text-orange-400 font-bold block mb-1">REAL-TIME PROBABILITY</span>
                                98.4% Win Confidence
                            </div>
                        </div>
                    </div>
                    
                    <div className="absolute bottom-[40%] right-[25%] z-20">
                        <div className="relative group/iso-spot">
                             <span className="flex h-4 w-4 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"></span>
                            </span>
                             <div className="absolute right-6 top-0 w-48 bg-black/80 backdrop-blur border border-blue-500/30 p-3 rounded-lg opacity-0 group-hover/iso-spot:opacity-100 transition-all text-xs border-r-2 border-r-blue-500 text-right">
                                <span className="text-blue-400 font-bold block mb-1">PIPELINE VELOCITY</span>
                                Trend: +12% WoW
                            </div>
                        </div>
                    </div>

                </motion.div>

                {/* Layer 3: Holographic Atmosphere (Overlay) */}
                <motion.div 
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
                >
                    <Image 
                        src="/static/images/holo_overlay.png" 
                        alt="Holographic Data" 
                        fill
                        className="object-cover opacity-50"
                    />
                </motion.div>

             </div>
          </div>
      </section>

      {/* SECTION 3: MOBILE SUPPORT */}
      <section className="w-full py-24 bg-gray-900 overflow-hidden relative">
           <div className="absolute top-0 right-0 w-[50%] h-full bg-orange-500/5 blur-[100px] pointer-events-none" />
           <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
               {/* Left: Text */}
               <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="space-y-8"
               >
                   <span className="text-orange-500 font-bold tracking-widest text-sm uppercase block">
                       Any Device, Any Time
                   </span>
                   <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight break-keep">
                       <span className="block mb-3">{t.mobile.title}</span>
                       <span className="text-gray-500 block">{t.mobile.subtitle}</span>
                   </h2>
                   <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                        {t.mobile.desc}
                   </p>

                   {/* App Store Buttons */}
                   <div className="flex gap-4 pt-4">
                        <button className="flex items-center gap-3 bg-slate-800/80 hover:bg-slate-700 text-white px-6 py-3 rounded-2xl border border-slate-700 transition-colors duration-300 backdrop-blur-sm group">
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 1.25.13 1.83.37-1.6 1-2.65 2.76-2.62 4.41.05 1.79 1.5 3.1 3.26 3.12.06.63.13 1.27.18 1.91zM13 3.5c.52-.7 1.15-1.4 1.97-1.5.17 1.84-1.68 3.56-3.29 3.53-.16-1.25.68-2.62 1.32-2.03z"/>
                            </svg>
                            <div className="text-left">
                                <div className="text-[10px] text-slate-400 font-medium leading-none mb-0.5">Download on</div>
                                <div className="text-base font-bold leading-none">iOS App</div>
                            </div>
                        </button>
                        
                        <button className="flex items-center gap-3 bg-slate-800/80 hover:bg-slate-700 text-white px-6 py-3 rounded-2xl border border-slate-700 transition-colors duration-300 backdrop-blur-sm group">
                             <svg className="w-6 h-6 fill-current text-green-400 group-hover:text-green-300 transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.523 15.3414C17.523 16.7118 16.4063 17.8213 15.0294 17.8213C13.6521 17.8213 12.5358 16.7118 12.5358 15.3414C12.5358 13.9714 13.6521 12.8615 15.0294 12.8615C16.4063 12.8615 17.523 13.9714 17.523 15.3414ZM6.5912 15.3414C6.5912 16.7118 5.47464 17.8213 4.09761 17.8213C2.72058 17.8213 1.60394 16.7118 1.60394 15.3414C1.60394 13.9714 2.72058 12.8615 4.09761 12.8615C5.47464 12.8615 6.5912 13.9714 6.5912 15.3414ZM16.2737 5.76007L18.4735 1.95079C18.5772 1.76997 18.5147 1.53934 18.3323 1.43555C18.1511 1.33203 17.9197 1.39414 17.8152 1.57468L15.5862 5.43475C13.4862 4.47954 11.085 4.47954 8.98506 5.43475L6.756 1.57468C6.65158 1.39414 6.42014 1.33203 6.23891 1.43555C6.05652 1.53934 5.99403 1.76997 6.0977 1.95079L8.29749 5.76007C3.32832 7.03923 0 11.9547 0 17.2965H24.5714C24.5714 11.9547 21.2427 7.03923 16.2737 5.76007Z"/>
                            </svg>
                            <div className="text-left">
                                <div className="text-sm font-bold leading-none">Android</div>
                            </div>
                        </button>
                   </div>
               </motion.div>

               {/* Right: Realistic Mobile Visual (POV) */}
               <motion.div 
                 initial={{ opacity: 0, x: 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="relative flex justify-center"
               >
                   <div className="relative w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl shadow-orange-500/20 border-8 border-gray-900 bg-gray-950 group">
                        <Image 
                            src="/static/images/mobile_dashboard_real.png" 
                            alt="EXAWin Mobile App - Real World Usage" 
                            width={600}
                            height={800}
                            className="object-cover w-full h-auto"
                        />
                        
                        {/* Dynamic Screen Overlay */}
                        <div className="absolute top-[21%] left-[33%] w-[39%] h-[53%] bg-black/80 backdrop-blur-[1px] rounded-lg overflow-hidden p-2 flex flex-col items-center text-center">
                            {/* Header */}
                            <div className="flex justify-between w-full items-center mb-2 px-1">
                                <span className="text-[8px] font-bold text-orange-500">EXAWin AI</span>
                                <div className="flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-[6px] text-gray-400">LIVE</span>
                                </div>
                            </div>
                            
                            {/* Project Name */}
                            <div className="text-[8px] text-gray-300 mb-1 w-full text-left px-1">Energy Project A</div>
                            
                            {/* Main Probability Metric */}
                            <div className="my-2">
                                <span className="text-[6px] text-gray-400 block mb-0.5">WIN PROBABILITY</span>
                                <motion.div 
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    animate={{ scale: [1, 1.05, 1], filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"] }}
                                    transition={{ 
                                        type: "spring", stiffness: 300, damping: 10, delay: 0.1, // Fast entrance
                                        scale: { repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1 }, // Continuous pulse
                                        filter: { repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1 }
                                    }}
                                    className="text-2xl font-black text-white tracking-tighter"
                                >
                                    88.2<span className="text-sm text-orange-500">%</span>
                                </motion.div>
                            </div>

                            {/* Bayesian Parameters Grid */}
                            <div className="grid grid-cols-2 gap-1 w-full px-1 mb-2">
                                <motion.div 
                                    initial={{ x: -10, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-gray-800/50 rounded p-1"
                                >
                                    <div className="text-[6px] text-gray-500">ALPHA (Pos)</div>
                                    <div className="text-[10px] font-bold text-blue-400">8.5</div>
                                </motion.div>
                                <motion.div 
                                    initial={{ x: 10, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.25 }}
                                    className="bg-gray-800/50 rounded p-1"
                                >
                                    <div className="text-[6px] text-gray-500">BETA (Neg)</div>
                                    <div className="text-[10px] font-bold text-red-400">1.5</div>
                                </motion.div>
                            </div>
                            
                            {/* Impedance / Decision Status */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                animate={{ 
                                    borderColor: ["rgba(34,197,94,0.3)", "rgba(34,197,94,0.8)", "rgba(34,197,94,0.3)"],
                                    backgroundColor: ["rgba(20,83,45,0.3)", "rgba(20,83,45,0.5)", "rgba(20,83,45,0.3)"]
                                }}
                                transition={{ 
                                    y: { type: "spring", stiffness: 200, delay: 0.3 }, // Fast entrance
                                    default: { repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.5 } // Continuous glow
                                }}
                                className="w-full bg-green-900/30 border border-green-500/30 rounded p-1 mt-auto mb-1"
                            >
                                <div className="text-[6px] text-green-400 font-bold tracking-wider">IMPEDANCE MATCH</div>
                                <div className="text-[8px] text-white font-bold">COMMIT</div>
                            </motion.div>
                        </div>

                   </div>
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

      {/* NEW SECTION: ENTERPRISE INTEGRATION (Expanded) */}
      <section className="w-full py-32 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[url('/static/images/grid.svg')] opacity-[0.03]" />
          
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
                          <div className="text-xl font-black text-white text-center tracking-wider">EXA<br/>CORE</div>
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

      {/* SECTION 5: ONBOARDING STEPS with Visual */}
      <section className="w-full py-32 bg-white dark:bg-gray-900">
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
                  
                  {/* Visual: Deal Close / Success */}
                  <div className="order-1 lg:order-2 relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                       <Image 
                           src="/static/images/deal_close.png" 
                           alt="Success" 
                           fill 
                           className="object-cover hover:scale-105 transition-transform duration-700"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent flex items-end p-12">
                           <div className="text-white">
                               <p className="text-lg font-medium opacity-90">Join the top 1%</p>
                               <h3 className="text-4xl font-black mt-2">Win with Science.</h3>
                           </div>
                       </div>
                  </div>
              </div>
          </div>
      </section>

      {/* SECTION 6: FINAL CTA */}
      <section className="w-full py-32 bg-gray-900 text-white relative overflow-hidden">
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
      </section>

      <Footer />
    </div>
  );
}
