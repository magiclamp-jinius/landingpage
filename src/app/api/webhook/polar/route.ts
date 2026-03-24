import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Client } from "@notionhq/client";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const NOTION_DB_ID = process.env.NOTION_DB_ID!;
const ADMIN_EMAIL = "magiclamp@jiniusgroup.com";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    if (type !== "order.created") {
      return NextResponse.json({ received: true });
    }

    const customer = data?.customer ?? {};
    const product = data?.product ?? {};
    const amount = data?.net_amount ?? data?.amount ?? 0;
    const createdAt = data?.created_at ?? new Date().toISOString();

    const customerEmail = customer.email ?? "";
    const customerName = customer.name ?? "미기재";
    const productName = product.name ?? "미기재";
    const formattedAmount = Math.round(amount / 100);
    const formattedDate = new Date(createdAt).toISOString().split("T")[0];
    const formattedDateStr = new Date(createdAt).toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
    });

    // Supabase에서 설문 응답 조회 (이메일 기준 최신)
    const { data: survey } = await supabase
      .from("survey_responses")
      .select("*")
      .eq("email", customerEmail)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    const phone = survey?.phone ?? "미기재";
    const role = survey?.role ?? "미기재";
    const industry = survey?.industry ?? "미기재";
    const painPoints = survey?.pain_points ?? "미기재";

    // 1. 노션 DB 저장
    await notion.pages.create({
      parent: { database_id: NOTION_DB_ID },
      properties: {
        이름: {
          title: [{ text: { content: customerName } }],
        },
        전화번호: {
          phone_number: phone,
        },
        이메일: {
          email: customerEmail || null,
        },
        직책: {
          select: { name: role },
        },
        업종: {
          select: { name: industry },
        },
        문제점: {
          rich_text: [{ text: { content: painPoints } }],
        },
        패키지명: {
          select: { name: productName },
        },
        결제금액: {
          number: formattedAmount,
        },
        결제일시: {
          date: { start: formattedDate },
        },
      },
    });

    // 2. 관리자 이메일 발송
    await resend.emails.send({
      from: "알림 <noreply@jiniusgroup.com>",
      to: ADMIN_EMAIL,
      subject: `[결제 완료] ${customerName}님 - ${productName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0D174B; border-bottom: 3px solid #77CCF7; padding-bottom: 10px;">
            새로운 결제가 완료되었습니다 🎉
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background: #f8f9fa;">
              <td style="padding: 12px; font-weight: bold; color: #0D174B; width: 35%;">고객명</td>
              <td style="padding: 12px;">${customerName}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #0D174B;">이메일</td>
              <td style="padding: 12px;">${customerEmail}</td>
            </tr>
            <tr style="background: #f8f9fa;">
              <td style="padding: 12px; font-weight: bold; color: #0D174B;">전화번호</td>
              <td style="padding: 12px;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #0D174B;">직책</td>
              <td style="padding: 12px;">${role}</td>
            </tr>
            <tr style="background: #f8f9fa;">
              <td style="padding: 12px; font-weight: bold; color: #0D174B;">업종</td>
              <td style="padding: 12px;">${industry}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #0D174B;">재무 문제점</td>
              <td style="padding: 12px; font-size: 13px;">${painPoints}</td>
            </tr>
            <tr style="background: #f8f9fa;">
              <td style="padding: 12px; font-weight: bold; color: #0D174B;">구매 패키지</td>
              <td style="padding: 12px; font-weight: bold; color: #0D174B;">${productName}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #0D174B;">결제 금액</td>
              <td style="padding: 12px; font-weight: bold; color: #0D174B;">${formattedAmount.toLocaleString("ko-KR")}원</td>
            </tr>
            <tr style="background: #f8f9fa;">
              <td style="padding: 12px; font-weight: bold; color: #0D174B;">결제 일시</td>
              <td style="padding: 12px;">${formattedDateStr}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; padding: 16px; background: #f0f9ff; border-radius: 8px; color: #0D174B; font-size: 14px;">
            노션 고객 DB에 자동으로 저장되었습니다.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
