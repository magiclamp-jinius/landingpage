"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  TrendingUp,
  CalendarCheck,
  FileText,
  Users,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    check: "CHECK 01",
    icon: <LayoutDashboard className="w-8 h-8 text-[#0D174B]" />,
    title: "한 페이지 정보 통합",
    desc: "흩어진 매출·지출·인건비·세금 정보를 단 한 장의 대시보드로 통합합니다. 대표님이 매일 봐야 할 숫자만 모아드립니다.",
  },
  {
    check: "CHECK 02",
    icon: <TrendingUp className="w-8 h-8 text-[#0D174B]" />,
    title: "자금 흐름 가시화",
    desc: "입금·출금·예정 자금 흐름을 달력과 차트로 시각화해 언제 돈이 부족해지는지 미리 파악할 수 있습니다.",
  },
  {
    check: "CHECK 03",
    icon: <CalendarCheck className="w-8 h-8 text-[#0D174B]" />,
    title: "세무 체크리스트",
    desc: "부가세·원천세·종합소득세 등 월별·분기별 세무 일정을 자동으로 안내합니다. 더 이상 세무사에게 끌려다니지 않아도 됩니다.",
  },
  {
    check: "CHECK 04",
    icon: <FileText className="w-8 h-8 text-[#0D174B]" />,
    title: "사내 규정 세팅",
    desc: "연차·복무·경비 처리 등 우리 회사만의 규정을 체계적으로 문서화합니다. 분쟁 없이 명확한 기준이 생깁니다.",
  },
  {
    check: "CHECK 05",
    icon: <Users className="w-8 h-8 text-[#0D174B]" />,
    title: "인수인계 자동화",
    desc: "직원이 바뀌어도 업무가 멈추지 않는 인수인계 템플릿. 담당자 교체 시 혼란을 최소화합니다.",
  },
  {
    check: "CHECK 06",
    icon: <MessageSquare className="w-8 h-8 text-[#0D174B]" />,
    title: "전문가 1:1 코칭",
    desc: "500개 기업 컨설팅 경험의 전문가가 직접 우리 회사 상황에 맞게 세팅을 도와드립니다.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#77CCF7] font-bold text-sm uppercase tracking-widest mb-3">
            Key Features
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0D174B] leading-tight">
            만능키트에 담긴
            <br />6가지 핵심 도구
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-gray-50 hover:bg-[#0D174B] rounded-2xl p-7 border border-gray-100 transition-colors duration-300 cursor-default"
            >
              <p className="text-xs font-bold text-[#77CCF7] mb-4 tracking-widest">
                {f.check}
              </p>
              <div className="mb-4 group-hover:[&_svg]:text-[#77CCF7] transition-colors">
                {f.icon}
              </div>
              <h3 className="text-lg font-extrabold text-[#0D174B] group-hover:text-white mb-3 transition-colors">
                {f.title}
              </h3>
              <p className="text-gray-500 group-hover:text-white/60 text-sm leading-relaxed transition-colors">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
