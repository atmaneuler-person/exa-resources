'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CheckIcon } from '@/components/icons/PricingCheckIcon';
import { Button } from '@/components/shared/ui/button';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { motion } from 'framer-motion';

export function PricingPage({ locale }: { locale: string }) {
  const [isAnnual, setIsAnnual] = useState(true);

  // Multi-language Content
  const content = {
    en: {
      title: "Pricing dedicated to your ambition.",
      subtitle: "Whether you are a lone strategist or an unbounded sovereign entity, we have a plan for you.",
      frequencies: { monthly: "Monthly", annually: "Annually", discount: "20% Off" },
      tiers: [
        {
          name: "Essential",
          desc: "Pilot for Validation (PoC)",
          price: { monthly: "$0", annually: "$0" },
          unit: "/ mo",
          features: [
            "Validate Core Bayesian Engine",
            "Individual Deal Simulation",
            "1 Active Project (Pilot)",
            "No Time Limit (Full Sales Cycle)",
            "Basic Probability Inference",
            "Technical Documentation Access"
          ],
          cta: "Start Pilot",
          highlight: false,
          popular: false
        },
        {
          name: "Professional",
          desc: "Standardize Sales Process",
          price: { monthly: "$39", annually: "$29" },
          unit: "/ user / mo",
          features: [
            "Everything in Essential",
            "Unlimited Project Management",
            "Team Pipeline Visibility",
            "Objectify Win-Rate Signals",
            "Risk Detection Dashboard",
            "SLA Support"
          ],
          cta: "Start Standardization",
          highlight: false,
          popular: true
        },
        {
          name: "Sovereign",
          desc: "Enterprise Governance & Security",
          price: { monthly: "Custom", annually: "Custom" },
          unit: "",
          features: [
            "Everything in Professional",
            "On-Premise / Air-Gapped Deployment",
            "Custom Logic Injection (Fine-Tuning)",
            "Enterprise-Grade Security",
            "Dedicated Success Manager",
            "24/7 Priority Support"
          ],
          cta: "Contact Enterprise",
          highlight: true,
          popular: false
        }
      ]
    },
    ko: {
      title: "귀사의 야망에 최적화된 가격 정책.",
      subtitle: "도입 타당성 검증부터 전사적 프로세스 혁신까지, 단계별 솔루션을 제공합니다.",
      frequencies: { monthly: "월간", annually: "연간", discount: "20% 할인" },
      tiers: [
        {
          name: "Essential",
          desc: "도입 타당성 검증 (PoC)",
          price: { monthly: "$0", annually: "$0" },
          unit: "/ 월",
          features: [
            "Core Bayesian Engine 성능 검증",
            "개별 딜(Deal) 시뮬레이션",
            "1개 활성 프로젝트 (Pilot)",
            "기간 제한 없음 (전체 사이클 검증)",
            "기본 확률 추론 테스트",
            "기술 문서 접근 권한"
          ],
          cta: "파일럿 시작하기",
          highlight: false,
          popular: false
        },
        {
          name: "Professional",
          desc: "영업 프로세스 표준화 및 가시화",
          price: { monthly: "$39", annually: "$29" },
          unit: "/ 사용자 / 월",
          features: [
            "Essential의 모든 기능 포함",
            "무제한 프로젝트 관리",
            "팀 파이프라인 가시화",
            "승률 신호(Signal) 객관화/자산화",
            "리스크 조기 감지라 대시보드",
            "SLA 지원"
          ],
          cta: "표준화 도입하기",
          highlight: false,
          popular: true
        },
        {
          name: "Sovereign",
          desc: "전사 거버넌스 및 보안",
          price: { monthly: "문의", annually: "문의" },
          unit: "",
          features: [
            "Professional의 모든 기능 포함",
            "On-Premise / 폐쇄망 구축",
            "자사 고유 방법론 이식 (Fine-Tuning)",
            "엔터프라이즈급 보안성",
            "전담 성공 매니저 (CSM)",
            "24/7 우선 지원"
          ],
          cta: "엔터프라이즈 문의",
          highlight: true,
          popular: false
        }
      ]
    },
    ja: {
        title: "御社の野心に見合う価格設定。",
        subtitle: "導入の妥当性検証から全社的なプロセス革新まで、段階的なソリューションを提供します。",
        frequencies: { monthly: "月額", annually: "年額", discount: "20% OFF" },
        tiers: [
          {
            name: "Essential",
            desc: "導入妥当性検証 (PoC)",
            price: { monthly: "$0", annually: "$0" },
            unit: "/ 月",
            features: [
              "Core Bayesian Engine 性能検証",
              "個別案件(Deal)シミュレーション",
              "アクティブプロジェクト 1つ (Pilot)",
              "期間制限なし (全サイクル検証)",
              "基本確率推論テスト",
              "技術ドキュメントへのアクセス"
            ],
            cta: "パイロットを開始",
            highlight: false,
            popular: false
          },
          {
            name: "Professional",
            desc: "営業プロセスの標準化と可視化",
            price: { monthly: "$39", annually: "$29" },
            unit: "/ ユーザー / 月",
            features: [
              "Essentialの全機能",
              "無制限のプロジェクト管理",
              "チームパイプラインの可視化",
              "勝率シグナル(Signal)の客観化・資産化",
              "リスク早期検知ダッシュボード",
              "SLA サポート"
            ],
            cta: "標準化を導入",
            highlight: false,
            popular: true
          },
          {
            name: "Sovereign",
            desc: "全社ガバナンスとセキュリティ",
            price: { monthly: "お問い合わせ", annually: "お問い合わせ" },
            unit: "",
            features: [
              "Professionalの全機能",
              "On-Premise / 閉域網構築",
              "自社固有手法の移植 (Fine-Tuning)",
              "エンタープライズ級のセキュリティ",
              "専任サクセスマネージャー (CSM)",
              "24/7 優先サポート"
            ],
            cta: "企業向けお問い合わせ",
            highlight: true,
            popular: false
          }
        ]
      },
      zh: {
        title: "配得上您野心的定价。",
        subtitle: "从验证导入可行性到全公司流程创新，我们提供分阶段的解决方案。",
        frequencies: { monthly: "月付", annually: "年付", discount: "20% 优惠" },
        tiers: [
          {
            name: "Essential",
            desc: "导入可行性验证 (PoC)",
            price: { monthly: "$0", annually: "$0" },
            unit: "/ 月",
            features: [
              "验证核心贝叶斯引擎性能",
              "个别交易 (Deal) 模拟",
              "1 个活跃项目 (Pilot)",
              "无限期使用 (全周期验证)",
              "基本概率推断测试",
              "访问技术文档"
            ],
            cta: "启动试点",
            highlight: false,
            popular: false
          },
          {
            name: "Professional",
            desc: "销售流程标准化与可视化",
            price: { monthly: "$39", annually: "$29" },
            unit: "/ 用户 / 月",
            features: [
              "包含 Essential 的所有功能",
              "无限项目管理",
              "团队管道可视化",
              "胜率信号 (Signal) 客观化/资产化",
              "风险早期检测仪表板",
              "SLA 支持"
            ],
            cta: "导入标准化",
            highlight: false,
            popular: true
          },
          {
            name: "Sovereign",
            desc: "企业治理与安全",
            price: { monthly: "咨询", annually: "咨询" },
            unit: "",
            features: [
              "包含 Professional 的所有功能",
              "On-Premise / 私有云部署",
              "植入自有方法论 (微调)",
              "企业级安全性",
              "专属成功经理 (CSM)",
              "24/7 优先支持"
            ],
            cta: "联系企业销售",
            highlight: true,
            popular: false
          }
        ]
      },
      vi: {
        title: "Định giá xứng tầm với tham vọng của bạn.",
        subtitle: "Từ xác nhận tính khả thi đến đổi mới quy trình toàn doanh nghiệp, chúng tôi cung cấp các giải pháp theo từng giai đoạn.",
        frequencies: { monthly: "Hàng tháng", annually: "Hàng năm", discount: "Giảm 20%" },
        tiers: [
          {
            name: "Essential",
            desc: "Xác nhận tính khả thi (PoC)",
            price: { monthly: "$0", annually: "$0" },
            unit: "/ tháng",
            features: [
              "Xác thực hiệu suất Core Bayesian Engine",
              "Mô phỏng giao dịch (Deal) cá nhân",
              "1 Dự án Hoạt động (Pilot)",
              "Không giới hạn thời gian (Xác thực toàn chu kỳ)",
              "Kiểm tra suy luận xác suất cơ bản",
              "Truy cập tài liệu kỹ thuật"
            ],
            cta: "Bắt đầu Pilot",
            highlight: false,
            popular: false
          },
          {
            name: "Professional",
            desc: "Chuẩn hóa & Trực quan hóa Quy trình Bán hàng",
            price: { monthly: "$39", annually: "$29" },
            unit: "/ người dùng / tháng",
            features: [
              "Tất cả tính năng của Essential",
              "Quản lý dự án không giới hạn",
              "Trực quan hóa quy trình nhóm",
              "Khách quan hóa/Tài sản hóa Tín hiệu (Signal)",
              "Bảng điều khiển phát hiện rủi ro sớm",
              "Hỗ trợ SLA"
            ],
            cta: "Triển khai Chuẩn hóa",
            highlight: false,
            popular: true
          },
          {
            name: "Sovereign",
            desc: "Quản trị Doanh nghiệp & Bảo mật",
            price: { monthly: "Liên hệ", annually: "Liên hệ" },
            unit: "",
            features: [
              "Tất cả tính năng của Professional",
              "Triển khai On-Premise / Private Cloud",
              "Tích hợp Phương pháp luận Riêng (Fine-Tuning)",
              "Bảo mật cấp doanh nghiệp",
              "Quản lý Thành công Chuyên dụng (CSM)",
              "Hỗ trợ ưu tiên 24/7"
            ],
            cta: "Liên hệ Doanh nghiệp",
            highlight: true,
            popular: false
          }
        ]
      }
  };

  const t = content[locale as keyof typeof content] || content['en'];

  return (
    <div className="flex flex-col w-full min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500 font-sans">
      <Header />

      <main className="flex-grow w-full py-32 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-20 space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight"
            >
              {t.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              {t.subtitle}
            </motion.p>

            {/* Toggle Switch */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center mt-8 gap-4"
            >
              <span className={cn("text-sm font-bold transition-colors cursor-pointer", !isAnnual ? "text-gray-900 dark:text-white" : "text-gray-500")} onClick={() => setIsAnnual(false)}>
                {t.frequencies.monthly}
              </span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-14 h-8 bg-gray-200 dark:bg-gray-800 rounded-full p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <motion.div 
                  className={cn("w-6 h-6 rounded-full shadow-md", isAnnual ? "bg-orange-500" : "bg-white dark:bg-gray-400")}
                  animate={{ x: isAnnual ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span className={cn("text-sm font-bold transition-colors cursor-pointer", isAnnual ? "text-gray-900 dark:text-white" : "text-gray-500")} onClick={() => setIsAnnual(true)}>
                {t.frequencies.annually}
              </span>
              <span className="ml-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full uppercase tracking-wider">
                {t.frequencies.discount}
              </span>
            </motion.div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch font-sans">
            {t.tiers.map((tier, index) => {
              const isSovereign = tier.highlight;
              const isPopular = tier.popular;

              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={cn(
                    "relative flex flex-col p-8 rounded-[2rem] transition-all duration-300 group",
                    isSovereign 
                      ? "bg-gray-900 dark:bg-[#0a0a0a] border-2 border-orange-500/50 shadow-[0_0_40px_rgba(249,115,22,0.1)] dark:shadow-[0_0_60px_rgba(249,115,22,0.2)] md:-translate-y-4 z-10 hover:shadow-[0_0_80px_rgba(249,115,22,0.3)] hover:border-orange-500" 
                      : "bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 hover:border-orange-200 dark:hover:border-gray-600 hover:shadow-xl dark:hover:shadow-2xl dark:hover:bg-gray-900/60"
                  )}
                >
                  {isPopular && (
                    <div className="absolute top-0 right-1/2 translate-x-1/2 -mt-4">
                      <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-blue-500/30">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {isSovereign && (
                    <div className="absolute top-0 right-1/2 translate-x-1/2 -mt-4">
                      <span className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-orange-500/40 animate-pulse">
                        Enterprise
                      </span>
                    </div>
                  )}

                  <div className="mb-8 text-center md:text-left">
                    <h3 className={cn("text-2xl font-bold mb-2", isSovereign ? "text-white" : "text-gray-900 dark:text-white")}>
                      {tier.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm h-10 leading-snug">
                      {tier.desc}
                    </p>
                  </div>

                  <div className="mb-8 text-center md:text-left">
                    <div className="flex items-baseline justify-center md:justify-start gap-1">
                      <span className={cn("text-5xl font-black tracking-tight", isSovereign ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600" : "text-gray-900 dark:text-white")}>
                        {isAnnual ? tier.price.annually : tier.price.monthly}
                      </span>
                      {/* @ts-ignore */}
                      {tier.unit && (
                         // @ts-ignore
                         <span className="text-gray-500 font-medium">{tier.unit}</span>
                      )}
                    </div>
                    {isAnnual && tier.price.monthly !== "Custom" && tier.price.monthly !== "문의" &&  tier.price.monthly !== "お問い合わせ" && tier.price.monthly !== "咨询" && tier.price.monthly !== "Liên hệ" && tier.price.monthly !== "$0" && (
                        <p className="text-xs text-gray-400 mt-2">Billed annually</p>
                    )}
                  </div>

                  <ul className="flex-grow space-y-4 mb-10">
                    {tier.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3 text-sm">
                        <CheckIcon 
                          className={cn("w-5 h-5 flex-shrink-0 mt-0.5", isSovereign ? "text-orange-500" : "text-blue-500")} 
                        />
                        <span className={cn("leading-relaxed", isSovereign ? "text-gray-300" : "text-gray-600 dark:text-gray-300")}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    size="xl" 
                    className={cn(
                      "w-full rounded-xl font-bold transition-all duration-300 shadow-lg py-6 text-lg relative overflow-hidden",
                      isSovereign 
                        ? "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white shadow-orange-900/20 hover:shadow-orange-600/40 border-0" 
                        : isPopular
                            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/20 hover:shadow-blue-600/30"
                            : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500"
                    )}
                    onClick={(e) => {
                        if (tier.name === 'Sovereign') {
                             window.location.href = `/${locale}/about#contact`;
                        } else {
                             e.preventDefault();
                        }
                    }}
                  >
                    <span className={cn("block transition-transform duration-200", isSovereign ? "" : "group-hover:-translate-y-[150%] group-hover:opacity-0")}>
                      {tier.cta}
                    </span>
                    {!isSovereign && (
                      <span className="absolute inset-0 flex items-center justify-center translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 font-extrabold text-orange-500">
                        Coming Soon
                      </span>
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* FAQ / Trust Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-32 text-center"
          >
             <p className="text-gray-500 text-sm">
                 Need help choosing? <a href={`/${locale}/about#contact`} className="text-orange-500 font-bold hover:underline">Contact our sales team</a> for a free consultation.
             </p>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
