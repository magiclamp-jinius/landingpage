"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "경리나라를 안 써도 사용할 수 있나요?",
    a: "네, 가능합니다. 경리나라 연동 시 더욱 효과적이지만, 경리나라 없이도 독립적으로 사용할 수 있도록 설계되어 있습니다.",
  },
  {
    q: "업종에 관계없이 사용할 수 있나요?",
    a: "제조, 유통, 서비스, 요식업 등 대부분의 업종에서 활용 가능합니다. 단, 특수업종(금융, 병원 등)은 사전 상담을 권장합니다.",
  },
  {
    q: "구매 후 어떻게 파일을 받나요?",
    a: "결제 완료 후 입력하신 이메일로 다운로드 링크가 자동 발송됩니다. 24시간 이내 발송됩니다.",
  },
  {
    q: "1:1 코칭은 어떻게 진행되나요?",
    a: "Zoom 또는 대면으로 진행됩니다. 일반 패키지는 그룹 코칭 1회, 프리미엄 패키지는 1:1 코칭 3회가 포함됩니다.",
  },
  {
    q: "환불 정책은 어떻게 되나요?",
    a: "디지털 상품 특성상 다운로드 이전에만 전액 환불이 가능합니다. 다운로드 후에는 환불이 어려우니 구매 전 무료 상담을 이용해주세요.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-gray-100 last:border-0 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-5 gap-4">
        <p className="font-semibold text-[#0D174B] text-base">{q}</p>
        <ChevronDown
          className={`w-5 h-5 text-[#77CCF7] shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-gray-500 text-sm leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#77CCF7] font-bold text-sm uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0D174B]">자주 묻는 질문</h2>
        </motion.div>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
