"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-[#0D174B] py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-[#77CCF7] font-bold text-sm uppercase tracking-widest mb-3">
            Contact
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            어떤 패키지가 맞는지
            <br />모르겠다면?
          </h2>
          <p className="mt-4 text-white/60 text-lg">
            카카오톡 채널로 문의하시면 전문가가 직접 안내드립니다.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10"
          >
            <a
              href="http://pf.kakao.com/_xmGdTn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#FEE500] text-[#3A1D1D] font-bold text-lg px-10 py-4 rounded-xl hover:bg-[#F5DC00] transition-colors shadow-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.568 1.518 4.824 3.813 6.238-.168.594-.614 2.166-.703 2.501-.109.416.152.41.32.298.132-.088 2.096-1.422 2.944-2.001A11.6 11.6 0 0012 17.999c5.523 0 10-3.477 10-7.5S17.523 3 12 3z"/>
              </svg>
              카카오톡으로 무료 상담하기
            </a>
            <p className="mt-4 text-white/40 text-sm">
              평일 09:00 – 18:00 운영 · 빠른 답변 보장
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
