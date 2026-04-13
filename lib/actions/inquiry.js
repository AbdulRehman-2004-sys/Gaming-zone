"use server";

import connectDB from "@/lib/db";
import Inquiry from "@/models/Inquiry";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function submitInquiry(formData) {
  try {
    await connectDB();
    
    const inquiryData = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    const newInquiry = await Inquiry.create(inquiryData);

    // Send Emails - Defaults to the sender's email if ADMIN_EMAIL is not set
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    
    // 1. Email to Admin
    await transporter.sendMail({
      from: `"DROP ZONE Support" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject: `New Inquiry: ${inquiryData.subject}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2 style="color: #facc15;">New Support Message</h2>
          <p><strong>From:</strong> ${inquiryData.name} (${inquiryData.email})</p>
          <p><strong>Subject:</strong> ${inquiryData.subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
            ${inquiryData.message}
          </div>
          <hr />
          <p style="font-size: 12px; color: #888;">This is an automated notification from DropZone Admin.</p>
        </div>
      `,
    }).catch(err => console.error("Admin email failed:", err));

    // 2. Email to User (Confirmation)
    await transporter.sendMail({
      from: `"DROP ZONE Team" <${process.env.EMAIL_USER}>`,
      to: inquiryData.email,
      subject: `We've received your message!`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #facc15; font-size: 24px; text-transform: uppercase;">Thanks for Connecting!</h1>
          </div>
          <p>Hi ${inquiryData.name},</p>
          <p>Thank you for reaching out to DropZone Support. We've received your message regarding <strong>"${inquiryData.subject}"</strong> and our team will get back to you within 24 hours.</p>
          <p>In the meantime, feel free to browse our latest guides or gaming gear.</p>
          <br />
          <p>Best Regards,</p>
          <p><strong>The DROP ZONE Team</strong></p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 11px; color: #aaa; text-align: center;">You are receiving this because you submitted a contact form on our website.</p>
        </div>
      `,
    }).catch(err => console.error("User email failed:", err));

    revalidatePath("/admin/inquiries");
    return { success: true, message: "Your message has been sent successfully!" };
  } catch (error) {
    console.error("Support submission error:", error);
    return { success: false, message: "Failed to send message. Please try again later." };
  }
}

export async function getInquiries() {
  try {
    await connectDB();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(inquiries));
  } catch (error) {
    console.error("Get inquiries error:", error);
    return [];
  }
}

export async function markAsRead(id) {
  try {
    await connectDB();
    await Inquiry.findByIdAndUpdate(id, { status: "read" });
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteInquiry(id) {
  try {
    await connectDB();
    await Inquiry.findByIdAndDelete(id);
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
