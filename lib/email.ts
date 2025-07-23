import nodemailer from "nodemailer";

export async function sendVerificationEmail({
  to,
  otp,
}: {
  to: string;
  otp: string;
}) {
  // 1. Create a transporter (SMTP details)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, 
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // 2. Define email content
  const mailOptions = {
    from: `"Document Tracker" <${process.env.SMTP_USER}>`,
    to,
    subject: "Your OTP Verification Code",
    text: `Your OTP code is: ${otp}`,
    html: `<p>Your OTP code is:</p><h2>${otp}</h2>`,
  };

  // 3. Send it
  await transporter.sendMail(mailOptions);
}