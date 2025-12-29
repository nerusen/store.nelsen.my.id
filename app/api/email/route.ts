import * as nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
    secure: false,
  });

  const body = await request.json();
  const { nama, noWa, email, order, total, payment, catatan } = body;

  if (!nama || !noWa || !email || !order || !total || !payment) {
    return NextResponse.json(
      { message: "Please fill out the necessary fields" },
      { status: 400 },
    );
  }

  const adminMailData = {
    from: email,
    to: "xynelsdesign@gmail.com",
    subject: `New Order from ${nama}`,
    text: `Order Details:
Name: ${nama}
WhatsApp: ${noWa}
Email: ${email}
Order: ${order}
Total: ${total}
Payment: ${payment}
Notes: ${catatan || 'None'}`,
    html: `
<div>
  <h2>New Order Received</h2>
  <p><strong>Name:</strong> ${nama}</p>
  <p><strong>WhatsApp:</strong> ${noWa}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Order:</strong> ${order}</p>
  <p><strong>Total:</strong> ${total}</p>
  <p><strong>Payment Method:</strong> ${payment}</p>
  <p><strong>Notes:</strong> ${catatan || 'None'}</p>
</div>`,
  };

  // Send email to admin
  await new Promise((resolve, reject) => {
    transporter.sendMail(adminMailData, (err: Error | null, info) => {
      if (err) {
        reject(err);
        return NextResponse.json(
          { error: err.message || "Something went wrong" },
          { status: 500 },
        );
      } else {
        resolve(info.accepted);
      }
    });
  });

  // Send confirmation email to user with QRIS
  const userMailData = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: `Konfirmasi Pesanan - ${nama}`,
    text: `Terima kasih atas pesanan Anda, ${nama}!

Detail Pesanan:
Nama: ${nama}
WhatsApp: ${noWa}
Email: ${email}
Pesanan: ${order}
Total: ${total}
Metode Pembayaran: ${payment}
Catatan: ${catatan || 'Tidak ada'}

Silakan scan kode QRIS berikut untuk melakukan pembayaran:
[QRIS Image Attached]

Scan QRIS diatas untuk melakukan pembayaran.

Terima kasih telah berbelanja di Xynels Design!`,
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">Konfirmasi Pesanan</h2>
  <p>Terima kasih atas pesanan Anda, <strong>${nama}</strong>!</p>

  <div style="background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px;">
    <h3>Detail Pesanan:</h3>
    <p><strong>Nama:</strong> ${nama}</p>
    <p><strong>WhatsApp:</strong> ${noWa}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Pesanan:</strong> ${order}</p>
    <p><strong>Total:</strong> ${total}</p>
    <p><strong>Metode Pembayaran:</strong> ${payment}</p>
    <p><strong>Catatan:</strong> ${catatan || 'Tidak ada'}</p>
  </div>

  <div style="text-align: center; margin: 30px 0;">
    <h3 style="color: #333;">Pembayaran QRIS</h3>
    <p>Silakan scan kode QRIS berikut untuk melakukan pembayaran:</p>
    <img src="https://yourdomain.com/images/form/qris.png" alt="QRIS Payment Code" style="max-width: 300px; height: auto; border: 2px solid #ddd; border-radius: 8px;" />
    <p style="margin-top: 10px; font-weight: bold; color: #d32f2f;">Scan QRIS diatas untuk melakukan pembayaran</p>
  </div>

  <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Penting:</strong> Pastikan pembayaran dilakukan dalam 24 jam untuk menghindari pembatalan otomatis.</p>
  </div>

  <p>Jika ada pertanyaan, silakan hubungi kami melalui WhatsApp atau email.</p>
  <p>Terima kasih telah berbelanja di <strong>Xynels Design</strong>!</p>
</div>`,
    attachments: [
      {
        filename: 'qris-payment.png',
        path: 'public/images/form/qris.png',
        cid: 'qris-image'
      }
    ]
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(userMailData, (err: Error | null, info) => {
      if (err) {
        console.error('Error sending user email:', err);
        // Don't fail the request if user email fails, but log it
        resolve(null);
      } else {
        resolve(info.accepted);
      }
    });
  });

  return NextResponse.json({
    message: "Order submitted successfully",
    status: "success"
  });
};
