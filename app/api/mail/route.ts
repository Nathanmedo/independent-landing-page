import { COMPANY_EMAIL } from "@/lib/wix-api/constants";
import * as nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  //create transporter object
  const {name, email, phone, subject, message} = await req.json();
  try{
    const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: COMPANY_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
    }
  });
  //send mail
const escapeHtml = (str: unknown = "") =>
    String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

await transporter.sendMail({
    from: email,
    to: COMPANY_EMAIL,
    subject: `New Contact Form Submission: ${subject}`,
    html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.4; padding: 16px;">
            <h2 style="margin:0 0 12px 0; padding:8px 12px; background:#f5f7fa; border-radius:6px; color:#111;">
                New Contact Form Submission
            </h2>

            <table role="presentation" style="width:100%; border-collapse:collapse; margin-top:12px;">
                <tr>
                    <td style="width:110px; font-weight:600; padding:6px 0;">Name:</td>
                    <td style="padding:6px 0;">${escapeHtml(name)}</td>
                </tr>
                <tr>
                    <td style="font-weight:600; padding:6px 0;">Phone:</td>
                    <td style="padding:6px 0;">${escapeHtml(phone)}</td>
                </tr>
                <tr>
                    <td style="font-weight:600; padding:6px 0;">Email:</td>
                    <td style="padding:6px 0;">${escapeHtml(email)}</td>
                </tr>
            </table>

            <div style="margin-top:14px;">
                <div style="font-weight:600; margin-bottom:6px;">Message:</div>
                <div style="white-space:pre-wrap; background:#fbfbfb; border:1px solid #eee; padding:10px; border-radius:6px;">
                    ${escapeHtml(message).replace(/\r?\n/g, "<br>")}
                </div>
            </div>
        </div>
    `
});
return NextResponse.json("Message sent successfully! We'll get back to you soon.", { status: 200 });
  }catch(err){
    return NextResponse.json("Failed to send email", { status: 500 });
  }


}