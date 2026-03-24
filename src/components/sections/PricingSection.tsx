"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SurveyModal from "@/components/sections/SurveyModal";

// Polar.sh 결제 링크
const POLAR_LINKS = {
  basic: "https://buy.polar.sh/polar_cl_fm1creSQ3Xpn8Z7mz1LuMGGQpb3anEhX4bowW1LqcN0",
  standard: "https://buy.polar.sh/polar_cl_7B5CHqzV0oBSFdJIe3zFYJTInPLw19wxtVmCz3rlOLA",
  premium: "https://buy.polar.sh/polar_cl_0iObOLduGskBtFbOCXbcoqgj6APFnbbF0tRD71avqvo",
};

const plans = [
  {
    name: "기초 패키지",
    target: "매출 5억 이하 소기업",
    price: "55,000",
    priceNote: "VAT 포함",
    color: "bg-white",
    highlight: false,
    href: POLAR_LINKS.basic,
    features: [
      "회사 기초 정보 관리",
      "인적 자원 관리",
      "경영 관련 서류보관함",
      "계좌/법인 카드 내역 관리",
      "자산/부채 현황 가이드",
    ],
  },
  {
    name: "일반 패키지",
    target: "매출 5억~20억 성장기업",
    price: "220,000",
    priceNote: "VAT 포함",
    color: "bg-[#0D174B]",
    highlight: true,
    href: POLAR_LINKS.standard,
    features: [
      "기초 패키지 전체",
      "업무 규정 세팅",
      "세무신고 체크리스트",
      "주기별 업무 루틴",
      "내부 기안 시스템",
    ],
  },
  {
    name: "프리미엄 패키지",
    target: "매출 20억~50억 도약기업",
    price: "550,000",
    priceNote: "VAT 포함",
    color: "bg-white",
    highlight: false,
    href: POLAR_LINKS.premium,
    features: [
      "일반 패키지 전체",
      "전문가 1:1 맞춤 코칭 (2시간)",
      "실제 데이터 직접 세팅",
      "경리나라 최적화 진단",
      "재무 현안 즉시 해결",
    ],
  },
];

export default function PricingSection() {
  const [survey, setSurvey] = useState<{ isOpen: boolean; href: string; name: string; price: string }>({
    isOpen: false,
    href: "",
    name: "",
    price: "",
  });

  return (
    <section id="pricing" className="bg-gray-50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#77CCF7] font-bold text-sm uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0D174B] leading-tight">
            우리 회사에 맞는
            <br />패키지를 선택하세요
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            모든 패키지는 1회 결제, 평생 사용 가능합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${plan.color} rounded-2xl p-8 flex flex-col border ${
                plan.highlight
                  ? "border-[#77CCF7] shadow-2xl scale-105"
                  : "border-gray-200 shadow-sm"
              } relative`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-[#77CCF7] text-[#0D174B] text-xs font-extrabold px-4 py-1.5 rounded-full">
                    BEST
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest mb-2 text-[#77CCF7]">
                  {plan.target}
                </p>
                <h3 className={`text-xl font-extrabold mb-4 ${plan.highlight ? "text-white" : "text-[#0D174B]"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-end gap-1">
                  <span className={`text-4xl font-extrabold ${plan.highlight ? "text-white" : "text-[#0D174B]"}`}>
                    ₩{plan.price}
                  </span>
                </div>
                <p className={`text-sm mt-1 ${plan.highlight ? "text-white/50" : "text-gray-400"}`}>
                  {plan.priceNote}
                </p>
              </div>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        plan.highlight ? "text-[#77CCF7]" : "text-[#0D174B]"
                      }`}
                    />
                    <span className={`text-sm ${plan.highlight ? "text-white/80" : "text-gray-600"}`}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full gap-2"
                size="lg"
                variant={plan.highlight ? "accent" : "brandOutline"}
                onClick={() => setSurvey({ isOpen: true, href: plan.href, name: plan.name, price: plan.price })}
              >
                지금 구매하기 <MoveRight className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      <SurveyModal
        isOpen={survey.isOpen}
        onClose={() => setSurvey({ ...survey, isOpen: false })}
        checkoutUrl={survey.href}
        packageName={survey.name}
        price={survey.price}
      />
    </section>
  );
}
