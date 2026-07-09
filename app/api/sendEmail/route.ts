import nodemailer from "nodemailer";

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

export async function POST(req: Request) {
   try {
    const { email, name, subject, html } = await req.json();
    console.log("Received email request:", { email, name, subject, html });
    const info = await transporter.sendMail({
      from: `"Suzannah Home & Care Services" <${process.env.SMTP_USER}>`,
      to: email,
      subject,
      html
    });

    console.log(info);

    return Response.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email error:", error);

    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}