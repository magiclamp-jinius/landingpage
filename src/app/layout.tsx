import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "무기가 되는 숫자경영 만능키트 | 지니어스컴퍼니",
  description:
    "와디즈 펀딩 5,583% 달성! 500개 기업 컨설팅 노하우를 담은 숫자경영 만능키트. 경리나라를 써도 체계가 없다면, 지금 바로 시작하세요.",
  openGraph: {
    title: "무기가 되는 숫자경영 만능키트",
    description: "와디즈 5,583% 달성. 500개 기업 컨설팅 노하우.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
