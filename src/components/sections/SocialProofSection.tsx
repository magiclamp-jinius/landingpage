"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "김OO 대표",
    company: "제조업 / 직원 12명",
    content:
      "경리나라 쓰면서 뭔가 빠진 것 같았는데, 이 키트 쓰고 나서야 '아, 이게 없었구나' 했어요. 한 달 만에 월별 손익을 직접 보게 됐습니다.",
    stars: 5,
  },
  {
    name: "이OO 대표",
    company: "서비스업 / 직원 5명",
    content:
      "세무사한테 항상 끌려다녔는데 이제 제가 먼저 질문할 수 있게 됐어요. 세무 체크리스트 하나로 이렇게 달라질 줄 몰랐습니다.",
    stars: 5,
  },
  {
    name: "박OO 대표",
    company: "유통업 / 직원 8명",
    content:
      "직원이 갑자기 그만뒀는데 인수인계 자료가 있어서 일주일 만에 정상화됐어요. 이거 없었으면 큰일 날 뻔했습니다.",
    stars: 5,
  },
];

export default function SocialProofSection() {
  return (
    <section className="bg-[#0D174B] py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#77CCF7] font-bold text-sm uppercase tracking-widest mb-3">
            Social Proof
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            이미 증명된 숫자들
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-10 mt-12">
            {[
              { num: "5,583%", label: "와디즈 펀딩 달성률" },
              { num: "5.0 / 5.0", label: "사용자 평균 만족도" },
              { num: "500+", label: "기업 컨설팅 누적 경험" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-extrabold text-[#77CCF7]">
                  {stat.num}
                </p>
                <p className="text-white/60 text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/10 rounded-2xl p-6 border border-white/10"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#77CCF7] text-[#77CCF7]" />
                ))}
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-5">
                &ldquo;{r.content}&rdquo;
              </p>
              <div>
                <p className="text-white font-bold text-sm">{r.name}</p>
                <p className="text-white/40 text-xs">{r.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
