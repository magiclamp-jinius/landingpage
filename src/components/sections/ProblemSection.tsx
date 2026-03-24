"use client";

import { motion } from "framer-motion";
import { TrafficCone, AlertTriangle, HelpCircle, Frown } from "lucide-react";

const problems = [
  {
    icon: <AlertTriangle className="w-8 h-8 text-red-400" />,
    title: "경리나라는 쓰는데\n숫자가 안 보여요",
    desc: "데이터는 들어가는데 의미 있는 숫자로 연결이 안 됩니다.",
  },
  {
    icon: <HelpCircle className="w-8 h-8 text-orange-400" />,
    title: "세금·세무 일정이\n항상 불안해요",
    desc: "언제 뭘 해야 하는지 체크리스트 없이는 놓치기 일쑤입니다.",
  },
  {
    icon: <TrafficCone className="w-8 h-8 text-yellow-400" />,
    title: "직원이 나가면\n업무가 멈춰요",
    desc: "인수인계 체계가 없어 담당자 교체 때마다 혼란이 옵니다.",
  },
  {
    icon: <Frown className="w-8 h-8 text-red-500" />,
    title: "대표인데 내 회사\n숫자를 모르겠어요",
    desc: "매출·지출·이익 흐름을 한눈에 볼 수 있는 판이 없습니다.",
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#77CCF7] font-bold text-sm uppercase tracking-widest mb-3">
            Problem
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0D174B] leading-tight">
            도로(경리나라)는 뚫렸는데
            <br />
            <span className="text-red-500">신호등(체계)이 없습니다</span>
          </h2>
          <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto">
            경리나라를 도입했지만 정작 업무가 체계화되지 않아 여전히 혼란스럽다면,
            당신만의 문제가 아닙니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4 items-start"
            >
              <div className="shrink-0 mt-1">{p.icon}</div>
              <div>
                <h3 className="font-bold text-[#0D174B] text-lg whitespace-pre-line leading-snug">
                  {p.title}
                </h3>
                <p className="text-gray-500 text-sm mt-2">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
