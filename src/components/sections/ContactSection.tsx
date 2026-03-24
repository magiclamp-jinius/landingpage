"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    if (!supabase) {
      // Supabase 미연결 시 콘솔에만 출력 (개발 중 임시 처리)
      console.log("상담 신청 데이터:", form);
      setStatus("success");
      setForm({ name: "", company: "", phone: "", message: "" });
      return;
    }

    const { error } = await supabase.from("contacts").insert([
      {
        name: form.name,
        company: form.company,
        phone: form.phone,
        message: form.message,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setStatus("success");
      setForm({ name: "", company: "", phone: "", message: "" });
    }
  };

  return (
    <section id="contact" className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <p className="text-[#77CCF7] font-bold text-sm uppercase tracking-widest mb-3">
            Contact
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0D174B] leading-tight">
            무료 상담 신청
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            어떤 패키지가 맞는지 모르겠다면 전문가가 직접 안내드립니다.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-[#0D174B] mb-1 block">이름 *</label>
              <input
                required
                type="text"
                placeholder="홍길동"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#77CCF7]"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#0D174B] mb-1 block">회사명 *</label>
              <input
                required
                type="text"
                placeholder="(주)지니어스컴퍼니"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#77CCF7]"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#0D174B] mb-1 block">연락처 *</label>
            <input
              required
              type="tel"
              placeholder="010-0000-0000"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#77CCF7]"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#0D174B] mb-1 block">문의 내용</label>
            <textarea
              rows={4}
              placeholder="궁금하신 점을 자유롭게 적어주세요."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#77CCF7] resize-none"
            />
          </div>

          {status === "success" && (
            <p className="text-green-600 text-sm font-semibold text-center">
              상담 신청이 완료되었습니다. 빠르게 연락드리겠습니다!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-sm text-center">
              오류가 발생했습니다. 잠시 후 다시 시도해주세요.
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            variant="brand"
            className="w-full gap-2 mt-2"
            disabled={status === "loading"}
          >
            {status === "loading" ? "전송 중..." : (
              <>무료 상담 신청하기 <PhoneCall className="w-4 h-4" /></>
            )}
          </Button>

          <p className="text-xs text-gray-400 text-center">
            개인정보는 상담 목적으로만 사용되며 제3자에게 제공되지 않습니다.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
