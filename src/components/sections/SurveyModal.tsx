"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const INDUSTRIES = [
  "제조업",
  "서비스업",
  "도소매업",
  "건설업",
  "요식업/숙박업",
  "IT/소프트웨어",
  "전문직(세무사/변호사 등)",
  "기타",
];

const PAIN_POINTS = [
  "온라인 쇼핑몰 매출 및 정산 관리가 어렵다",
  "매출 데이터를 정리하는 것이 어렵다",
  "미수금(외상 매출) 관리가 제대로 되지 않는다",
  "비용 기준이 없어 지출 관리가 어렵다",
  "거래처별 매입 내역을 정리하는 것이 어렵다",
  "급여 및 4대 보험 처리가 번거롭다",
  "인건비를 반영한 손익 계산이 어렵다",
  "입출금 내역을 실시간으로 확인하기 어렵다",
  "현금 흐름을 예측하기 어렵다",
  "부가세·종합소득세·법인세 신고 어렵고 시간이 많이 걸린다",
  "세금 납부 자금 계획을 미리 세우기 어렵다",
  "재무·회계 관련 업무 프로세스가 정리되지 않았다고 느껴진다",
  "의사결정을 내릴 수 있는 손익, 현금흐름 등이 잘 만들어지지 않는다",
  "기타",
];

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkoutUrl: string;
  packageName: string;
  price: string;
}

export default function SurveyModal({ isOpen, onClose, checkoutUrl: _checkoutUrl, packageName, price }: SurveyModalProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    role: "" as "대표자" | "실무자" | "",
    industries: [] as string[],
    industryOther: "",
    painPoints: [] as string[],
    painPointOther: "",
    privacyConsent: false,
  });
  const [industryOpen, setIndustryOpen] = useState(false);
  const [painOpen, setPainOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const togglePainPoint = (point: string) => {
    setForm((prev) => ({
      ...prev,
      painPoints: prev.painPoints.includes(point)
        ? prev.painPoints.filter((p) => p !== point)
        : [...prev.painPoints, point],
    }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "성함을 입력해주세요";
    if (!form.phone.trim()) e.phone = "전화번호를 입력해주세요";
    if (!form.email.trim()) e.email = "이메일을 입력해주세요";
    if (!form.role) e.role = "직책을 선택해주세요";
    if (form.industries.length === 0) e.industries = "업종을 선택해주세요";
    if (form.painPoints.length === 0) e.painPoints = "최소 1개 이상 선택해주세요";
    if (!form.privacyConsent) e.privacyConsent = "개인정보 수집에 동의해주세요";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const toggleIndustry = (item: string) => {
    setForm((prev) => ({
      ...prev,
      industries: prev.industries.includes(item)
        ? prev.industries.filter((i) => i !== item)
        : [...prev.industries, item],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const industriesFinal = form.industries.includes("기타")
      ? [...form.industries.filter((i) => i !== "기타"), form.industryOther].filter(Boolean)
      : form.industries;
    const painFinal = form.painPoints.includes("기타")
      ? [...form.painPoints.filter((p) => p !== "기타"), form.painPointOther]
      : form.painPoints;

    await fetch("/api/survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        email: form.email,
        role: form.role,
        industry: industriesFinal,
        painPoints: painFinal.join(", "),
        packageName,
        price,
      }),
    });

    setSubmitted(true);
    setLoading(false);
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#77CCF7]";
  const labelClass = "text-sm font-semibold text-[#0D174B] mb-1.5 block";
  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* 제출 완료 - 계좌이체 안내 */}
            {submitted ? (
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✓</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#0D174B] mb-2">정보 입력 완료!</h2>
                  <p className="text-gray-500 text-sm">아래 계좌로 입금해주시면 확인 후 메일로 발송해드립니다.</p>
                </div>

                {/* 계좌 정보 */}
                <div className="bg-[#0D174B] rounded-2xl p-6 mb-4 text-white">
                  <p className="text-[#77CCF7] text-xs font-bold uppercase tracking-widest mb-4">입금 계좌 정보</p>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">은행</span>
                      <span className="font-bold">IBK 기업은행</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">계좌번호</span>
                      <span className="font-bold tracking-wider">606-064874-01-013</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">예금주</span>
                      <span className="font-bold">주식회사 지니어스컴퍼니</span>
                    </div>
                    <div className="border-t border-white/20 pt-3 flex justify-between">
                      <span className="text-white/60 text-sm">입금 금액</span>
                      <span className="font-extrabold text-[#77CCF7] text-lg">₩{price}</span>
                    </div>
                  </div>
                </div>

                {/* 안내 메시지 */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                  <p className="text-yellow-800 text-sm font-semibold mb-1">입금 후 꼭 해주세요!</p>
                  <p className="text-yellow-700 text-sm">
                    카카오톡 채널에서 <strong>구매 상품명</strong>과 <strong>입금자명</strong>을 보내주세요.
                    입금 확인 후 등록하신 이메일로 키트를 발송해드립니다.
                  </p>
                </div>

                {/* 카카오 채널 버튼 */}
                <a
                  href="http://pf.kakao.com/_xmGdTn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#FEE500] text-[#191919] font-bold py-4 rounded-xl text-center text-base hover:bg-[#FEE500]/80 transition-colors mb-3"
                >
                  💬 카카오톡 채널로 입금 알리기
                </a>

                <button
                  onClick={onClose}
                  className="w-full text-gray-400 text-sm py-2 hover:text-gray-600"
                >
                  닫기
                </button>
              </div>
            ) : (
            <>
            {/* Header */}
            <div className="sticky top-0 bg-[#0D174B] rounded-t-2xl px-6 py-5 flex justify-between items-start">
              <div>
                <p className="text-[#77CCF7] text-xs font-bold uppercase tracking-widest mb-1">{packageName}</p>
                <h2 className="text-white font-extrabold text-lg leading-snug">
                  구매해주셔서 감사합니다!
                </h2>
                <p className="text-white/60 text-xs mt-1">
                  더 나은 서비스 제공을 위해 간단한 정보를 입력해주세요.
                  <br />입력 후 계좌이체 안내를 드립니다.
                </p>
              </div>
              <button onClick={onClose} className="text-white/60 hover:text-white mt-1 shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-5">
              {/* 성함 */}
              <div>
                <label className={labelClass}>1. 성함 <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  placeholder="홍길동"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
                {errors.name && <p className={errorClass}>{errors.name}</p>}
              </div>

              {/* 전화번호 */}
              <div>
                <label className={labelClass}>2. 전화번호 <span className="text-red-400">*</span></label>
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                />
                {errors.phone && <p className={errorClass}>{errors.phone}</p>}
              </div>

              {/* 이메일 */}
              <div>
                <label className={labelClass}>3. 수령할 이메일 <span className="text-red-400">*</span></label>
                <input
                  type="email"
                  placeholder="example@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
                {errors.email && <p className={errorClass}>{errors.email}</p>}
              </div>

              {/* 직책 */}
              <div>
                <label className={labelClass}>4. 귀하의 직책 <span className="text-red-400">*</span></label>
                <div className="flex gap-3">
                  {(["대표자", "실무자"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setForm({ ...form, role: r })}
                      className={`flex-1 py-2.5 rounded-lg border-2 text-sm font-semibold transition-colors ${
                        form.role === r
                          ? "border-[#0D174B] bg-[#0D174B] text-white"
                          : "border-gray-200 text-gray-500 hover:border-[#77CCF7]"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                {errors.role && <p className={errorClass}>{errors.role}</p>}
              </div>

              {/* 업종 */}
              <div>
                <label className={labelClass}>5. 귀사의 업종 <span className="text-red-400">*</span></label>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setIndustryOpen(!industryOpen)}
                    className="w-full flex justify-between items-center px-4 py-3 text-sm text-left hover:bg-gray-50"
                  >
                    <span className={form.industries.length > 0 ? "text-[#0D174B] font-medium" : "text-gray-400"}>
                      {form.industries.length > 0 ? `${form.industries.length}개 선택됨` : "해당하는 업종을 모두 선택해주세요"}
                    </span>
                    {industryOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>
                  <AnimatePresence>
                    {industryOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden border-t border-gray-100"
                      >
                        <div className="max-h-52 overflow-y-auto">
                          {INDUSTRIES.map((item) => (
                            <label
                              key={item}
                              className="flex items-start gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={form.industries.includes(item)}
                                onChange={() => toggleIndustry(item)}
                                className="mt-0.5 accent-[#0D174B]"
                              />
                              <span className="text-sm text-gray-700">{item}</span>
                            </label>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {form.industries.includes("기타") && (
                  <input
                    type="text"
                    placeholder="업종을 직접 입력해주세요"
                    value={form.industryOther}
                    onChange={(e) => setForm({ ...form, industryOther: e.target.value })}
                    className={`${inputClass} mt-2`}
                  />
                )}
                {errors.industries && <p className={errorClass}>{errors.industries}</p>}
              </div>

              {/* 재무회계 어려운 부분 */}
              <div>
                <label className={labelClass}>
                  6. 현재 재무·회계에서 가장 어려운 부분은? <span className="text-red-400">*</span>
                </label>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setPainOpen(!painOpen)}
                    className="w-full flex justify-between items-center px-4 py-3 text-sm text-left hover:bg-gray-50"
                  >
                    <span className={form.painPoints.length > 0 ? "text-[#0D174B] font-medium" : "text-gray-400"}>
                      {form.painPoints.length > 0 ? `${form.painPoints.length}개 선택됨` : "해당하는 항목을 모두 선택해주세요"}
                    </span>
                    {painOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>
                  <AnimatePresence>
                    {painOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden border-t border-gray-100"
                      >
                        <div className="max-h-52 overflow-y-auto">
                          {PAIN_POINTS.map((point) => (
                            <label
                              key={point}
                              className="flex items-start gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={form.painPoints.includes(point)}
                                onChange={() => togglePainPoint(point)}
                                className="mt-0.5 accent-[#0D174B]"
                              />
                              <span className="text-sm text-gray-700">{point}</span>
                            </label>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {form.painPoints.includes("기타") && (
                  <input
                    type="text"
                    placeholder="기타 내용을 직접 입력해주세요"
                    value={form.painPointOther}
                    onChange={(e) => setForm({ ...form, painPointOther: e.target.value })}
                    className={`${inputClass} mt-2`}
                  />
                )}
                {errors.painPoints && <p className={errorClass}>{errors.painPoints}</p>}
              </div>

              {/* 개인정보 동의 */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  <strong className="text-[#0D174B]">[개인정보 수집 및 이용 동의]</strong><br />
                  수집 항목: 성함, 전화번호, 이메일, 직책, 업종, 재무 현황<br />
                  수집 목적: 구매하신 콘텐츠의 전송, 맞춤 상담 및 코칭 서비스 제공<br />
                  보유 기간: 서비스 제공 완료 후 1년<br />
                  위 개인정보는 해당 제품의 송부 및 상담·코칭 목적으로만 사용되며, 제3자에게 제공되지 않습니다.
                </p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.privacyConsent}
                    onChange={(e) => setForm({ ...form, privacyConsent: e.target.checked })}
                    className="accent-[#0D174B] w-4 h-4"
                  />
                  <span className="text-sm font-semibold text-[#0D174B]">
                    개인정보 수집 및 이용에 동의합니다 <span className="text-red-400">*</span>
                  </span>
                </label>
                {errors.privacyConsent && <p className={errorClass}>{errors.privacyConsent}</p>}
              </div>

              <Button
                type="submit"
                size="lg"
                variant="brand"
                className="w-full gap-2"
                disabled={loading}
              >
                {loading ? "저장 중..." : "확인 후 계좌 정보 받기 →"}
              </Button>

              <p className="text-xs text-gray-400 text-center">
                확인 버튼을 누르면 계좌이체 안내를 드립니다.
              </p>
            </form>
            </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
