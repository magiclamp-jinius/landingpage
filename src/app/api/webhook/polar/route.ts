import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Client } from "@notionhq/client";

const resend = new Resend(process.env.RESEND_API_KEY);
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const NOTION_DB_ID = process.env.NOTION_DB_ID!;
const ADMIN_EMAIL = "magiclamp@jiniusgroup.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    // order.created 이벤트만 처리
    if (type !== "order.created") {
      return NextResponse.json({ received: true });
    }

    const customer = data?.customer ?? {};
    const product = data?.product ?? {};
    const amount = data?.amount ?? 0;
    const currency = data?.currency ?? "KRW";
    const createdAt = data?.created_at ?? new Date().toISOString();

    const customerName = customer.name ?? "미기재";
    const customerEmail = customer.email ?? "미기재";
    const productName = product.name ?? "미기재";
    const formattedAmount = `${(amount / 100).toLocaleString("ko-KR")}원`;
    const formattedDate = new Date(createdAt).toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
    });

    // 1. 관리자 이메일 발송
    await resend.emails.send({
      from: "알림 <noreply@jiniusgroup.com>",
      to: ADMIN_EMAIL,
      subject: `[결제 완료] ${customerName}님 - ${productName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0D174B; border-bottom: 2px solid #77CCF7; padding-bottom: 10px;">
            새로운 결제가 완료되었습니다
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
              <td style="padding: 12px; font-weight: bold; color: #0D174B;">구매 패키지</td>
              <td style="padding: 12px;">${productName}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #0D174B;">결제 금액</td>
              <td style="padding: 12px; color: #0D174B; font-weight: bold;">${formattedAmount}</td>
            </tr>
            <tr style="background: #f8f9fa;">
              <td style="padding: 12px; font-weight: bold; color: #0D174B;">결제 일시</td>
              <td style="padding: 12px;">${formattedDate}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; color: #666; font-size: 14px;">
            Polar 대시보드에서 주문 상세를 확인하세요.
          </p>
        </div>
      `,
    });

    // 2. 노션 DB에 저장
    await notion.pages.create({
      parent: { database_id: NOTION_DB_ID },
      properties: {
        이름: {
          title: [{ text: { content: customerName } }],
        },
        이메일: {
          email: customerEmail,
        },
        패키지: {
          rich_text: [{ text: { content: productName } }],
        },
        결제금액: {
          rich_text: [{ text: { content: formattedAmount } }],
        },
        결제일시: {
          rich_text: [{ text: { content: formattedDate } }],
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
