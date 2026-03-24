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
    const { name, phone, email, role, industry, painPoints, packageName, price } = body;

    // 1. Supabase 저장
    await supabase.from("survey_responses").insert([{
      name,
      phone,
      email,
      role,
      industry,
      pain_points: painPoints,
      package_name: packageName,
      privacy_consent: true,
      created_at: new Date().toISOString(),
    }]);

    // 2. 노션 DB 저장
    await notion.pages.create({
      parent: { database_id: NOTION_DB_ID },
      properties: {
        이름: {
          title: [{ text: { content: name } }],
        },
        전화번호: {
          phone_number: phone,
        },
        이메일: {
          email: email || null,
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
          select: { name: packageName },
        },
        결제금액: {
          number: parseInt(price.replace(/,/g, "")) || 0,
        },
        결제일시: {
          date: { start: new Date().toISOString().split("T")[0] },
        },
      },
    });

    // 3. 관리자 이메일 발송
    await resend.emails.send({
      from: "알림 <noreply@jiniusgroup.com>",
      to: ADMIN_EMAIL,
      subject: `[신규 상담 신청] ${name}님 - ${packageName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0D174B; border-bottom: 3px solid #77CCF7; padding-bottom: 10px;">
            새로운 구매 신청이 접수되었습니다 🎉
          </h2>
          <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
            계좌이체 확인 후 키트를 발송해주세요.
          </p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #f8f9fa;">
              <td style="padding: 12px; font-weight: bold; color: #0D174B; width: 35%;">고객명</td>
              <td style="padding: 12px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #0D174B;">전화번호</td>
              <td style="padding: 12px;">${phone}</td>
            </tr>
            <tr style="background: #f8f9fa;">
              <td style="padding: 12px; font-weight: bold; color: #0D174B;">이메일</td>
              <td style="padding: 12px;">${email}</td>
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
              <td style="padding: 12px; font-weight: bold; color: #0D174B;">선택 패키지</td>
              <td style="padding: 12px; font-weight: bold; color: #0D174B;">${packageName}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #0D174B;">입금 예정 금액</td>
              <td style="padding: 12px; font-weight: bold; color: #0D174B;">₩${price}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #fff9e6; border-radius: 8px; border: 1px solid #fcd34d;">
            <p style="color: #92400e; font-size: 14px; margin: 0;">
              ⚠️ 카카오채널로 입금 확인 후 <strong>${email}</strong>로 키트를 발송해주세요.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Survey API error:", error);
    return NextResponse.json({ error: "처리 중 오류가 발생했습니다" }, { status: 500 });
  }
}
