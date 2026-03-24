import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0D174B] py-12 border-t border-white/10">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center mb-4">
          <Image
            src="/jinius-logo.png"
            alt="지니어스컴퍼니"
            width={160}
            height={50}
            className="brightness-0 invert"
          />
        </div>
        <p className="text-white/40 text-sm mb-6">무기가 되는 숫자경영 만능키트</p>
        <div className="flex justify-center gap-6 text-white/40 text-xs mb-8">
          <a href="#" className="hover:text-white/70 transition-colors">이용약관</a>
          <a href="#" className="hover:text-white/70 transition-colors">개인정보처리방침</a>
          <a href="http://pf.kakao.com/_xmGdTn" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">카카오톡 문의</a>
        </div>
        <p className="text-white/20 text-xs">
          © {new Date().getFullYear()} 지니어스컴퍼니. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
