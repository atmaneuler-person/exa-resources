'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Header } from '../Header';
import { Footer } from '../Footer';

// Define Legal Content for Terms, Privacy, and Refund
type LegalSection = 'terms' | 'privacy' | 'refund';

interface LegalContent {
  title: string;
  updated: string;
  sections: {
    heading: string;
    content: string[];
  }[];
}

const legalContent: Record<string, Record<LegalSection, LegalContent>> = {
  en: {
    terms: {
      title: "Terms of Service",
      updated: "Last Updated: February 2026",
      sections: [
        {
          heading: "1. Acceptance of Terms",
          content: [
            "By accessing and using EXAWin service ('Service'), you agree to be bound by these Terms of Service ('Terms').",
            "This Service is strictly for B2B enterprise usage. If you do not agree to these Terms, do not use the Service."
          ]
        },
        {
          heading: "2. Service Usage & Restrictions",
          content: [
            "You are granted a non-exclusive, non-transferable B2B license to use the Service.",
            "You commit not to reverse engineer, duplicate, or extract the core algorithm of the Service.",
            "Any misuse or violation will result in immediate termination of service access."
          ]
        },
        {
          heading: "3. Enterprise Features & Pricing",
          content: [
            "Certain features are accessible only through paid subscriptions (Professional, Sovereign tiers).",
            "All B2B transactions are final, and pricing is subject to change with prior notice."
          ]
        },
        {
          heading: "4. Limitation of Liability",
          content: [
            "The Service is provided 'as is'. We are not liable for any indirect, incidental, or consequential damages.",
            "Our total liability shall not exceed the amount paid by you for the Service in the last 12 months."
          ]
        }
      ]
    },
    privacy: {
      title: "Privacy Policy",
      updated: "Last Updated: February 2026",
      sections: [
        {
          heading: "1. Data Collection",
          content: [
            "We collect business information necessary for B2B service provision, including company name, business email, and billing details.",
            "We also collect usage data (Sales Signals) to improve our AI models, strictly anonymized."
          ]
        },
        {
          heading: "2. Data Usage & AI Training",
          content: [
            "Your data is used to provide service analytics and improve our Bayesian Engine accuracy.",
            "We do NOT sell your data to third parties. Customer data is strictly confidential."
          ]
        },
        {
          heading: "3. Data Security",
          content: [
            "We implement industry-standard security measures (encryption, access controls) to protect your data.",
            "For Sovereign tier clients, we offer on-premise or private cloud deployment options for maximum security."
          ]
        },
        {
          heading: "4. Your Rights",
          content: [
            "You have the right to access, correct, or delete your personal data.",
            "Contact our support team to exercise your data rights."
          ]
        }
      ]
    },
    refund: {
      title: "Refund Policy",
      updated: "Last Updated: February 2026",
      sections: [
        {
          heading: "1. B2B Service Nature",
          content: [
            "Due to the nature of digital B2B services, all payments are generally non-refundable once the service period has commenced.",
            "We offer a Free Pilot (Essential Tier) for you to fully validate the service before purchase."
          ]
        },
        {
          heading: "2. Exceptional Circumstances",
          content: [
            "Refunds may be considered in cases of critical service failure or if the service was not accessible for a prolonged period due to our fault.",
            "Requests for refunds must be submitted in writing within 7 days of the incident."
          ]
        },
        {
          heading: "3. Subscription Cancellation",
          content: [
            "You may cancel your subscription at any time. The cancellation will take effect at the end of the current billing cycle.",
            "No partial refunds are provided for unused time in the current billing period."
          ]
        }
      ]
    }
  },
  ko: {
    terms: {
      title: "서비스 이용약관 (Terms of Service)",
      updated: "최종 수정일: 2026년 2월",
      sections: [
        {
          heading: "1. 약관의 승낙",
          content: [
            "귀하는 EXAWin 서비스('서비스')에 접속하고 이용함으로써 본 이용약관('약관')에 동의하게 됩니다.",
            "본 서비스는 기업 간 거래(B2B)를 위한 전용 소프트웨어입니다."
          ]
        },
        {
          heading: "2. 이용 권한 및 제한",
          content: [
            "귀하에게는 본 서비스를 이용할 수 있는 비독점적이고 양도 불가능한 라이선스가 부여됩니다.",
            "서비스의 핵심 알고리즘을 역공학(Reverse Engineering), 복제 또는 추출하는 행위는 엄격히 금지됩니다."
          ]
        },
        {
          heading: "3. 유료 서비스 및 결제",
          content: [
            "일부 기능은 유료 구독(Professional, Sovereign 등)을 통해서만 제공됩니다.",
            "모든 B2B 거래는 최종적이며, 가격 정책은 사전 고지 후 변경될 수 있습니다."
          ]
        },
        {
          heading: "4. 책임의 한계",
          content: [
            "본 서비스는 '있는 그대로' 제공됩니다. 당사는 간접적, 부수적 손해에 대해 책임을 지지 않습니다.",
            "당사의 총 책임한도는 귀하가 최근 12개월 동안 서비스에 지불한 금액을 초과하지 않습니다."
          ]
        }
      ]
    },
    privacy: {
      title: "개인정보처리방침 (Privacy Policy)",
      updated: "최종 수정일: 2026년 2월",
      sections: [
        {
          heading: "1. 수집하는 개인정보 항목",
          content: [
            "당사는 B2B 서비스 제공에 필요한 최소한의 기업 정보(회사명, 업무용 이메일, 결제 정보 등)를 수집합니다.",
            "AI 모델 개선을 위해 서비스 이용 데이터(영업 신호 등)를 비식별화하여 수집할 수 있습니다."
          ]
        },
        {
          heading: "2. 개인정보의 처리 목적",
          content: [
            "귀하의 데이터는 서비스 분석 제공 및 베이지안 엔진(Bayesian Engine) 정확도 향상을 위해 사용됩니다.",
            "당사는 귀하의 데이터를 제3자에게 판매하지 않으며, 고객 데이터는 엄격히 기밀로 유지됩니다."
          ]
        },
        {
          heading: "3. 데이터 보안",
          content: [
            "데이터는 업계 표준 암호화 및 접근 제어 기술을 통해 보호됩니다.",
            "Sovereign 등급 고객에게는 온프레미스 또는 프라이빗 클라우드 옵션을 제공하여 최고 수준의 보안을 보장합니다."
          ]
        },
        {
          heading: "4. 이용자의 권리",
          content: [
            "귀하는 언제든지 자신의 개인정보에 대한 열람, 정정 및 삭제를 요청할 권리가 있습니다.",
            "관련 요청은 고객 지원팀을 통해 처리할 수 있습니다."
          ]
        }
      ]
    },
    refund: {
      title: "환불 정책 (Refund Policy)",
      updated: "최종 수정일: 2026년 2월",
      sections: [
        {
          heading: "1. 서비스 특성 및 환불 제한",
          content: [
            "디지털 B2B 서비스의 특성상, 서비스 이용 기간이 개시된 후에는 원칙적으로 환불이 불가능합니다.",
            "구매 전 충분한 검증을 위해 '무료 파일럿(Essential)'을 제공하고 있으니 적극 활용해 주시기 바랍니다."
          ]
        },
        {
          heading: "2. 예외적 환불 규정",
          content: [
            "치명적인 서비스 오류나 당사의 귀책 사유로 장기간 서비스 이용이 불가능했던 경우 예외적으로 환불이 고려될 수 있습니다.",
            "환불 요청은 사건 발생일로부터 7일 이내에 서면으로 제출되어야 합니다."
          ]
        },
        {
          heading: "3. 구독 해지",
          content: [
            "언제든지 구독을 해지할 수 있으며, 해지 효력은 현재 결제 주기가 종료되는 시점에 발생합니다.",
            "이미 결제된 기간에 대한 일할 계산 환불은 제공되지 않습니다."
          ]
        }
      ]
    }
  },
  ja: {
    terms: {
      title: "利用規約 (Terms of Service)",
      updated: "最終更新日: 2026年2月",
      sections: [
        {
          heading: "1. 規約の同意",
          content: [
            "EXAWinサービス（以下「本サービス」）にアクセスして利用することにより、利用者は本利用規約（以下「本規約」）に拘束されることに同意するものとします。",
            "本サービスは、B2Bエンタープライズ利用専用です。本規約に同意しない場合は、本サービスを利用しないでください。"
          ]
        },
        {
          heading: "2. 利用権限および制限",
          content: [
            "利用者には、本サービスを利用するための非独占的かつ譲渡不能なB2Bライセンスが付与されます。",
            "本サービスのコアアルゴリズムをリバースエンジニアリング、複製、または抽出する行為は固く禁じられています。"
          ]
        },
        {
          heading: "3. エンタープライズ機能と価格",
          content: [
            "一部の機能は、有料サブスクリプション（Professional、Sovereign階層）を通じてのみアクセス可能です。",
            "すべてのB2B取引は最終的なものであり、価格設定は事前の通知をもって変更される場合があります。"
          ]
        },
        {
          heading: "4. 責任の制限",
          content: [
            "本サービスは「現状のまま」提供されます。当社は、間接的、付随的、または派生的な損害について一切の責任を負いません。",
            "当社の責任総額は、過去12ヶ月間に利用者が本サービスに対して支払った金額を超えないものとします。"
          ]
        }
      ]
    },
    privacy: {
      title: "プライバシーポリシー (Privacy Policy)",
      updated: "最終更新日: 2026年2月",
      sections: [
        {
          heading: "1. 収集するデータ",
          content: [
            "会社名、ビジネスメール、請求先情報など、B2Bサービスの提供に必要なビジネス情報を収集します。",
            "また、AIモデルを改善するために使用状況データ（販売シグナル）を収集しますが、これらは厳密に匿名化されます。"
          ]
        },
        {
          heading: "2. データの使用とAIトレーニング",
          content: [
            "データは、サービス分析の提供およびベイズエンジン（Bayesian Engine）の精度向上のために使用されます。",
            "当社はデータを第三者に販売しません。顧客データは厳重に機密保持されます。"
          ]
        },
        {
          heading: "3. データセキュリティ",
          content: [
            "データを保護するために、業界標準のセキュリティ対策（暗号化、アクセス制御）を実施しています。",
            "Sovereign層のクライアントには、最高レベルのセキュリティを実現するために、オンプレミスまたはプライベートクラウドの導入オプションを提供しています。"
          ]
        },
        {
          heading: "4. 利用者の権利",
          content: [
            "利用者には、個人データにアクセスし、訂正または削除する権利があります。",
            "データの権利を行使するには、サポートチームにお問い合わせください。"
          ]
        }
      ]
    },
    refund: {
      title: "返金ポリシー (Refund Policy)",
      updated: "最終更新日: 2026年2月",
      sections: [
        {
          heading: "1. B2Bサービスの性質",
          content: [
            "デジタルB2Bサービスの性質上、サービス期間が開始された後の支払いは原則として返金不可です。",
            "購入前にサービスを十分に検証していただくため、無料パイロット（Essential Tier）を提供しています。"
          ]
        },
        {
          heading: "2. 例外的な状況",
          content: [
            "重大なサービス障害、または当社の過失によりサービスが長期間利用できなかった場合に限り、返金が検討される場合があります。",
            "返金要請は、事象発生から7日以内に書面で提出する必要があります。"
          ]
        },
        {
          heading: "3. サブスクリプションの解約",
          content: [
            "サブスクリプションはいつでも解約できます。解約は、現在の請求サイクルの終了時に有効になります。",
            "現在の請求期間の未使用分に対する日割り計算による返金は行われません。"
          ]
        }
      ]
    }
  },
  zh: {
    terms: {
      title: "服务条款 (Terms of Service)",
      updated: "最后更新：2026年2月",
      sections: [
        {
          heading: "1. 条款接受",
          content: [
            "访问并使用 EXAWin 服务（以下简称“服务”），即表示您同意受本服务条款（以下简称“条款”）的约束。",
            "本服务仅供 B2B 企业使用。如果您不同意这些条款，请勿使用本服务。"
          ]
        },
        {
          heading: "2. 服务使用与限制",
          content: [
            "您被授予非独占、不可转让的 B2B 许可来使用本服务。",
            "严禁对本服务的核心算法进行逆向工程、复制或提取。",
            "任何滥用或违规行为将导致立即终止服务访问。"
          ]
        },
        {
          heading: "3. 企业功能与定价",
          content: [
            "某些功能仅通过付费订阅（Professional、Sovereign 层级）提供。",
            "所有 B2B 交易均为最终交易，定价可能会在事先通知的情况下发生变化。"
          ]
        },
        {
          heading: "4. 责任限制",
          content: [
            "本服务按“原样”提供。我们不对任何间接、附带或后果性损害承担责任。",
            "我们的总赔偿责任不超过您在过去 12 个月内为本服务支付的金额。"
          ]
        }
      ]
    },
    privacy: {
      title: "隐私政策 (Privacy Policy)",
      updated: "最后更新：2026年2月",
      sections: [
        {
          heading: "1. 数据收集",
          content: [
            "我们收集 B2B 服务提供所需的必要业务信息，包括公司名称、业务电子邮件和计费详细信息。",
            "我们还会收集使用数据（销售信号）以改进我们的 AI 模型，这些数据经过严格匿名处理。"
          ]
        },
        {
          heading: "2. 数据使用与 AI 训练",
          content: [
            "您的数据用于提供服务分析并提高贝叶斯引擎 (Bayesian Engine) 的准确性。",
            "我们不会将您的数据出售给第三方。客户数据严格保密。"
          ]
        },
        {
          heading: "3. 数据安全",
          content: [
            "我们实施行业标准的安全措施（加密、访问控制）来保护您的数据。",
            "对于 Sovereign 层级客户，我们提供本地部署或私有云部署选项，以实现最高级别的安全性。"
          ]
        },
        {
          heading: "4. 您的权利",
          content: [
            "您有权访问、更正或删除您的个人数据。",
            "请联系我们的支持团队行使您的数据权利。"
          ]
        }
      ]
    },
    refund: {
      title: "退款政策 (Refund Policy)",
      updated: "最后更新：2026年2月",
      sections: [
        {
          heading: "1. B2B 服务性质",
          content: [
            "由于数字 B2B 服务的性质，一旦服务期开始，所有款项通常不予退还。",
            "我们提供免费试点 (Essential Tier)，供您在购买前充分验证服务。"
          ]
        },
        {
          heading: "2. 例外情况",
          content: [
            "在发生重大服务故障或因我方过错导致服务长时间无法访问的情况下，可能会考虑退款。",
            "退款申请必须在事件发生后 7 天内以书面形式提交。"
          ]
        },
        {
          heading: "3. 订阅取消",
          content: [
            "您可以随时取消订阅。取消将在当前计费周期结束时生效。",
            "对于当前计费周期内未使用的部分，不提供按比例退款。"
          ]
        }
      ]
    }
  },
  vi: {
    terms: {
      title: "Điều khoản Dịch vụ (Terms of Service)",
      updated: "Cập nhật lần cuối: Tháng 2 năm 2026",
      sections: [
        {
          heading: "1. Chấp nhận Điều khoản",
          content: [
            "Bằng cách truy cập và sử dụng dịch vụ EXAWin ('Dịch vụ'), bạn đồng ý bị ràng buộc bởi các Điều khoản Dịch vụ này ('Điều khoản').",
            "Dịch vụ này chỉ dành riêng cho mục đích sử dụng doanh nghiệp B2B. Nếu bạn không đồng ý với các Điều khoản này, vui lòng không sử dụng Dịch vụ."
          ]
        },
        {
          heading: "2. Sử dụng & Hạn chế Dịch vụ",
          content: [
            "Bạn được cấp giấy phép B2B không độc quyền, không thể chuyển nhượng để sử dụng Dịch vụ.",
            "Bạn cam kết không đảo ngược kỹ thuật, sao chép hoặc trích xuất thuật toán cốt lõi của Dịch vụ.",
            "Mọi hành vi lạm dụng hoặc vi phạm sẽ dẫn đến việc chấm dứt quyền truy cập dịch vụ ngay lập tức."
          ]
        },
        {
          heading: "3. Tính năng Doanh nghiệp & Giá cả",
          content: [
            "Một số tính năng chỉ có thể truy cập thông qua đăng ký trả phí (hạng Professional, Sovereign).",
            "Tất cả các giao dịch B2B là cuối cùng và giá cả có thể thay đổi sau khi thông báo trước."
          ]
        },
        {
          heading: "4. Giới hạn Trách nhiệm",
          content: [
            "Dịch vụ được cung cấp 'nguyên trạng'. Chúng tôi không chịu trách nhiệm cho bất kỳ thiệt hại gián tiếp, ngẫu nhiên hoặc hậu quả nào.",
            "Tổng trách nhiệm pháp lý của chúng tôi sẽ không vượt quá số tiền bạn đã trả cho Dịch vụ trong 12 tháng qua."
          ]
        }
      ]
    },
    privacy: {
      title: "Chính sách Bảo mật (Privacy Policy)",
      updated: "Cập nhật lần cuối: Tháng 2 năm 2026",
      sections: [
        {
          heading: "1. Thu thập Dữ liệu",
          content: [
            "Chúng tôi thu thập thông tin doanh nghiệp cần thiết để cung cấp dịch vụ B2B, bao gồm tên công ty, email doanh nghiệp và chi tiết thanh toán.",
            "Chúng tôi cũng thu thập dữ liệu sử dụng (Tín hiệu Bán hàng) để cải thiện các mô hình AI của mình, hoàn toàn ẩn danh."
          ]
        },
        {
          heading: "2. Sử dụng Dữ liệu & Đào tạo AI",
          content: [
            "Dữ liệu của bạn được sử dụng để cung cấp phân tích dịch vụ và cải thiện độ chính xác của Bayesian Engine.",
            "Chúng tôi KHÔNG bán dữ liệu của bạn cho bên thứ ba. Dữ liệu khách hàng được bảo mật nghiêm ngặt."
          ]
        },
        {
          heading: "3. Bảo mật Dữ liệu",
          content: [
            "Chúng tôi thực hiện các biện pháp bảo mật theo tiêu chuẩn ngành (mã hóa, kiểm soát truy cập) để bảo vệ dữ liệu của bạn.",
            "Đối với khách hàng hạng Sovereign, chúng tôi cung cấp các tùy chọn triển khai tại chỗ (on-premise) hoặc đám mây riêng để bảo mật tối đa."
          ]
        },
        {
          heading: "4. Quyền của Bạn",
          content: [
            "Bạn có quyền truy cập, sửa hoặc xóa dữ liệu cá nhân của mình.",
            "Liên hệ với đội ngũ hỗ trợ của chúng tôi để thực hiện quyền dữ liệu của bạn."
          ]
        }
      ]
    },
    refund: {
      title: "Chính sách Hoàn tiền (Refund Policy)",
      updated: "Cập nhật lần cuối: Tháng 2 năm 2026",
      sections: [
        {
          heading: "1. Bản chất Dịch vụ B2B",
          content: [
            "Do bản chất của các dịch vụ B2B kỹ thuật số, tất cả các khoản thanh toán thường không được hoàn lại sau khi thời gian dịch vụ đã bắt đầu.",
            "Chúng tôi cung cấp chương trình Thí điểm Miễn phí (Essential Tier) để bạn xác thực đầy đủ dịch vụ trước khi mua."
          ]
        },
        {
          heading: "2. Các trường hợp ngoại lệ",
          content: [
            "Hoàn tiền có thể được xem xét trong trường hợp lỗi dịch vụ nghiêm trọng hoặc nếu dịch vụ không thể truy cập trong thời gian dài do lỗi của chúng tôi.",
            "Yêu cầu hoàn tiền phải được gửi bằng văn bản trong vòng 7 ngày kể từ ngày xảy ra sự cố."
          ]
        },
        {
          heading: "3. Hủy đăng ký",
          content: [
            "Bạn có thể hủy đăng ký của mình bất cứ lúc nào. Việc hủy sẽ có hiệu lực vào cuối chu kỳ thanh toán hiện tại.",
            "Không hoàn lại tiền theo tỷ lệ cho thời gian chưa sử dụng trong kỳ thanh toán hiện tại."
          ]
        }
      ]
    }
  }
};

interface LegalPagesProps {
  section: LegalSection;
  locale: string;
}

export const LegalPages: React.FC<LegalPagesProps> = ({ section, locale }) => {
  const t = legalContent[locale as keyof typeof legalContent] || legalContent['en'];
  const content = t[section];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500">
      <Head>
        <title>{content.title} | EXAWin</title>
      </Head>
      <Header />
      
      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <div className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">{content.title}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">{content.updated}</p>
          </div>
          
          <div className="space-y-16">
            {content.sections.map((sec, idx) => (
              <section key={idx} className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{sec.heading}</h2>
                <div className="space-y-4">
                  {sec.content.map((p, pIdx) => (
                    <p key={pIdx} className="text-gray-600 dark:text-gray-300 leading-loose text-xl">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-gray-500 text-base">
                If you have any questions regarding these policies, please contact us at <a href={`mailto:contact@atmaneuler.com`} className="text-blue-600 dark:text-blue-400 hover:underline">contact@atmaneuler.com</a>.
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};
