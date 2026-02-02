"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Database, ShieldCheck, Zap } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from './Link';
import { cn } from '@/lib/utils';

interface ProductBannerProps {
    type?: 'bayesian' | 'gai' | 'enterprise' | 'generic';
    className?: string;
}

const translations = {
    ko: {
        comingSoon: "Coming Soon",
        bayesian: {
            title: "Bayesian EXAWin-Rate Forecaster",
            description: "매 미팅과 협상에서 포착되는 미세한 신호를 베이지안 업데이트로 실시간 분석하여 영업 성공 확률을 정교하게 예측합니다. EXAWin과 함께라면 직관의 영역이었던 영업이 가장 완벽한 데이터 과학으로 진화합니다.",
            cta: "Get Started"
        },
        gai: {
            title: "ERP-Native GAI Hub",
            description: "기업의 복합적인 정형 데이터를 컨텍스트 기반으로 직접 추론하고 실행하는 엔터프라이즈 전용 GAI 에이전트. 데이터 속에 숨겨진 전략적 가치를 인텔리전트하게 추출합니다.",
            cta: "Learn More"
        },
        enterprise: {
            title: "EXA Unified ERP Suite",
            description: "비즈니스 오케스트레이션의 차세대 표준. 완벽하게 통합되고 지능적으로 작동하며 절대 무너지지 않는 거버넌스를 제공하는 EXA의 통합 엔터프라이즈 솔루션입니다.",
            cta: "Go to EXA"
        },
        generic: {
            title: "Mastering Complexity",
            description: "복합적인 비즈니스 환경을 단순 명료한 결론으로 전환하는 EXA의 Unified Intelligence 생태계를 탐험하고, 귀사의 엔터프라이즈 전략을 재정의하십시오.",
            cta: "Explore Ecosystem"
        }
    },
    en: {
        comingSoon: "Coming Soon",
        bayesian: {
            title: "Bayesian EXAWin-Rate Forecaster",
            description: "Precisely predict sales success by real-time Bayesian updates of subtle signals from every negotiation. With EXAWin, sales evolves from intuition into the ultimate data science.",
            cta: "Get Started"
        },
        gai: {
            title: "ERP-Native GAI Hub",
            description: "Enterprise-native GAI agents that reason and execute directly over complex structured data based on context. Intelligently extract strategic value hidden in data.",
            cta: "Learn More"
        },
        enterprise: {
            title: "EXA Unified ERP Suite",
            description: "The next standard in business orchestration. EXA's integrated solution that is perfectly unified, intelligent, and provides unbreakable governance.",
            cta: "Go to EXA"
        },
        generic: {
            title: "Mastering Complexity",
            description: "Explore EXA's Unified Intelligence ecosystem that distills complex business environments into clear conclusions and redefine your enterprise strategy.",
            cta: "Explore Ecosystem"
        }
    },
    ja: {
        comingSoon: "近日公開",
        bayesian: {
            title: "Bayesian EXAWin-Rate Forecaster",
            description: "交渉のあらゆる微細な信号をベイズ更新でリアルタイム分析し、営業の成功確率を精緻に予測。EXAWinにより、直感の営業이 완벽한 데이터 사이언스へと進化します。", // Note: Mixing refined terms
            cta: "始める"
        },
        gai: {
            title: "ERP-Native GAI Hub",
            description: "企業の複雑な定型データを文脈に基づき直接推論・実行する専用GAI。データに潜む戦略的価値をインテリジェントに抽出します。",
            cta: "もっと詳しく"
        },
        enterprise: {
            title: "EXA Unified ERP Suite",
            description: "ビジネスオーケストレーションの次世代標準。完全に統合され、知的に動作し、決して揺るがないガバナンスを提供するEXAの統合ソリューション。",
            cta: "EXAへ行く"
        },
        generic: {
            title: "Mastering Complexity",
            description: "複雑なビジネス環境を明快な結論に変えるEXA의 Unified Intelligence。そのエコシステムを探索し、企業の戦略を再定義しましょう。",
            cta: "エコシステムを探索"
        }
    },
    zh: {
        comingSoon: "敬请期待",
        bayesian: {
            title: "Bayesian EXAWin-Rate Forecaster",
            description: "通过贝叶斯更新实时分析谈判中的细微信号，精确预测销售成功率。有了 EXAWin，销售将从单纯的直觉进化为最完美的现代数据科学。",
            cta: "立即开始"
        },
        gai: {
            title: "ERP-Native GAI Hub",
            description: "基于上下文对企业复杂结构化数据进行直接推理和执行的专用 GAI。智能提取隐藏在数据中的战略价值。",
            cta: "了解更多"
        },
        enterprise: {
            title: "EXA Unified ERP Suite",
            description: "业务编排的下一代标准。EXA 的集成企业解决方案，完全统一、智能化运行，并提供无懈可击的管理体制。",
            cta: "前往 EXA"
        },
        generic: {
            title: "Mastering Complexity",
            description: "探索 EXA 的统一智能生态系统，将复杂的业务环境转化为简单明好的结论，并重新定义您的企业战略。",
            cta: "探索生态系统"
        }
    },
    vi: {
        comingSoon: "Sắp ra mắt",
        bayesian: {
            title: "Bayesian EXAWin-Rate Forecaster",
            description: "Phân tích tín hiệu từ các cuộc đàm phán trong thời gian thực bằng cập nhật Bayesian để dự đoán xác suất thành công. Với EXAWin, bán hàng trở thành khoa học dữ liệu hoàn hảo.",
            cta: "Bắt đầu"
        },
        gai: {
            title: "ERP-Native GAI Hub",
            description: "Đặc vụ GAI chuyên dụng suy luận và thực hiện dựa trên ngữ cảnh đối với dữ liệu cấu trúc phức tạp. Trích xuất thông minh giá trị chiến lược từ dữ liệu.",
            cta: "Tìm hiểu thêm"
        },
        enterprise: {
            title: "EXA Unified ERP Suite",
            description: "Tiêu chuẩn thế hệ mới của dàn dựng kinh doanh. Giải pháp tích hợp của EXA thống nhất hoàn hảo, vận hành thông minh và quản trị vững chắc.",
            cta: "Đến EXA"
        },
        generic: {
            title: "Mastering Complexity",
            description: "Khám phá hệ sinh thái Trí tuệ Thống nhất của EXA giúp chuyển đổi môi trường kinh doanh phức tạp thành kết luận rõ ràng và xác định lại chiến lược.",
            cta: "Khám phá hệ sinh thái"
        }
    }
};

const bannerConfigs = {
    bayesian: {
        icon: Brain,
        color: "from-orange-600 to-orange-400",
        link: "#"
    },
    gai: {
        icon: Database,
        color: "from-blue-600 to-blue-400",
        link: "#"
    },
    enterprise: {
        icon: ShieldCheck,
        color: "from-gray-900 to-gray-700",
        link: "#"
    },
    generic: {
        icon: Zap,
        color: "from-orange-600 to-orange-500",
        link: "#"
    }
};

export const ProductBanner = ({ type = 'generic', className }: ProductBannerProps) => {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);
    
    // Detect locale from pathname (ko is default)
    let locale: keyof typeof translations = 'ko';
    const supportedLocales = ['en', 'ja', 'zh', 'vi'];
    if (segments.length > 0 && supportedLocales.includes(segments[0])) {
        locale = segments[0] as keyof typeof translations;
    }

    const t = translations[locale];
    const content = t[type];
    const config = bannerConfigs[type];
    const Icon = config.icon;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
                "relative group overflow-hidden rounded-[2.5rem] p-10 border border-white/10",
                className
            )}
        >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-90 group-hover:opacity-100 transition-opacity duration-500`} />
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} 
            />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex items-center gap-8">
                    <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-2xl">
                        <Icon size={40} />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-2xl font-black text-white tracking-tight uppercase">
                            {content.title}
                        </h4>
                        <p className="text-base text-white/90 max-w-xl leading-relaxed font-medium">
                            {content.description}
                        </p>
                    </div>
                </div>

                <div className="relative group/btn-container">
                    {/* Coming Soon Tooltip */}
                    <motion.div 
                        className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-gray-950 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-lg opacity-0 group-hover/btn-container:opacity-100 group-hover/btn-container:-top-16 transition-all duration-500 pointer-events-none shadow-2xl z-50 flex flex-col items-center whitespace-nowrap"
                    >
                        {t.comingSoon}
                        <div className="absolute -bottom-1 w-2 h-2 bg-gray-950 rotate-45" />
                    </motion.div>

                    <button 
                        disabled
                        className="flex items-center gap-3 px-10 py-4 bg-white text-gray-900 font-bold rounded-2xl hover:bg-orange-50 transition-all shadow-xl group/btn opacity-50 cursor-not-allowed"
                    >
                        {content.cta}
                        <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
