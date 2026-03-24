"use client";

import { motion } from "framer-motion";
import { MapPin, TrendingUp, ShieldCheck } from "lucide-react";

const solutions = [
  {
    icon: <MapPin className="w-10 h-10 text-[#0D174B]" />,
    title: "안내표지판",
    subtitle: "무엇을, 언제, 어떻게",
    desc: "세무일정·업무체크리스트로 해야 할 일을 명확하게 안내합니다.",
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-[#0D174B]" />,
    title: "신호등",
    subtitle: "지금 가도 되는가?",
    desc: "자금 흐름과 손익을 한 장으로 시각화해 경영 판단을 도와줍니다.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-[#0D174B]" />,
    title: "규정집",
    subtitle: "우리 회사만의 기준",
    desc: "사내 규정과 인수인계 체계로 사람이 바뀌어도 업무가 멈추지 않습니다.",
  },
];

export default function SolutionSection() {
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
            Solution
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0D174B] leading-tight">
            숫자경영 만능키트가
            <br />
            <span className="text-[#77CCF7]">신호등과 안내판</span>이 됩니다
          </h2>
          <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto">
            500개 기업 컨설팅 노하우를 집약한 실전형 툴킷.
            <br />
            지금 당장 써먹을 수 있는 체계를 한 번에 드립니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {solutions.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100"
            >
              <div className="flex justify-center mb-5">
                <div className="bg-[#77CCF7]/20 rounded-2xl p-4">{s.icon}</div>
              </div>
              <p className="text-xs text-[#77CCF7] font-bold uppercase tracking-widest mb-1">
                {s.subtitle}
              </p>
              <h3 className="text-xl font-extrabold text-[#0D174B] mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
