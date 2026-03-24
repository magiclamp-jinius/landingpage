"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["체계적인", "정확한", "성장하는", "압도적인", "쉬운"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full bg-white min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex gap-8 py-20 lg:py-32 items-center justify-center flex-col">
          <div>
            <a
              href="https://www.wadiz.kr/web/campaign/detail/335979"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="accent"
                size="sm"
                className="gap-3 rounded-full px-6 text-sm font-semibold"
              >
                와디즈 펀딩 5,583% 달성 <MoveRight className="w-4 h-4" />
              </Button>
            </a>
          </div>

          <div className="flex gap-6 flex-col text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl max-w-4xl tracking-tight font-bold text-[#0D174B] leading-tight">
              <span className="block mb-2">지금 바로 시작하는</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center pb-4 pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute text-[#77CCF7] font-extrabold"
                    initial={{ opacity: 0, y: 100 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -100 : 100, opacity: 0 }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
              <span className="block mt-2">숫자경영</span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed text-gray-500 max-w-2xl mx-auto">
              경리나라로 돈 관리는 시작했지만, 업무 체계가 없어 매일 혼란스럽다면?
              <br className="hidden md:block" />
              500개 기업 컨설팅 노하우를 담은 <strong className="text-[#0D174B]">숫자경영 만능키트</strong>로
              지금 바로 정리하세요.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="xl"
              variant="accent"
              className="gap-3 rounded-lg font-bold shadow-lg"
              onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            >
              지금 바로 구매하기 <MoveRight className="w-5 h-5" />
            </Button>
            <a
              href="http://pf.kakao.com/_xmGdTn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="xl"
                className="gap-3 rounded-lg font-bold border-2 border-[#FEE500] bg-[#FEE500] text-[#3A1D1D] hover:bg-[#F5DC00]"
              >
                카카오톡으로 상담하기
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.568 1.518 4.824 3.813 6.238-.168.594-.614 2.166-.703 2.501-.109.416.152.41.32.298.132-.088 2.096-1.422 2.944-2.001A11.6 11.6 0 0012 17.999c5.523 0 10-3.477 10-7.5S17.523 3 12 3z"/>
                </svg>
              </Button>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 pt-8 border-t border-gray-200 w-full max-w-2xl justify-center">
            <div className="text-center">
              <a
                href="https://www.wadiz.kr/web/campaign/detail/335979"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <p className="text-3xl font-extrabold text-[#0D174B]">5,583%</p>
                <p className="text-gray-400 text-sm mt-1">와디즈 펀딩 달성률</p>
              </a>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-[#0D174B]">5.0</p>
              <p className="text-gray-400 text-sm mt-1">사용자 만족도</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-[#0D174B]">500+</p>
              <p className="text-gray-400 text-sm mt-1">기업 컨설팅 경험</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
