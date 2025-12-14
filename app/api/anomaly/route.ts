import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const status = body?.status; // 0 atau 1

    // ❌ Kalau bukan anomali → tidak kirim email
    if (status !== 1) {
      return NextResponse.json({
        ok: true,
        message: "Status normal (0), email tidak dikirim.",
      });
    }

    const to = process.env.ALERT_EMAIL_TO;
    const from = process.env.ALERT_EMAIL_FROM;

    if (!to || !from) {
      return NextResponse.json(
        { ok: false, error: "ALERT_EMAIL_TO / FROM belum di-set di .env.local" },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from,
      to,
      subject: "Peringatan: Terdeteksi Anomali pada Sistem SIAPGrek",
      html: `
        <h2>⚠️ Anomali Terdeteksi</h2>
        <p>Terdeteksi <strong>anomali</strong> pada sistem SIAPGrek.</p>
        <p>Segera cek kondisi perangkat dan lingkungan terkait.</p>
      `,
    });

    return NextResponse.json({
      ok: true,
      message: "Anomali (1) – Email notifikasi berhasil dikirim via Resend.",
    });
  } catch (error) {
    console.error("RESEND ERROR (anomaly):", error);
    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan saat mengirim email." },
      { status: 500 }
    );
  }
}
