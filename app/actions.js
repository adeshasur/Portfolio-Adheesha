"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function sendEmail(formData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid fields. Please check your inputs.",
    };
  }

  const { name, email, message } = validatedFields.data;

  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL || "info-adheesha@proton.me"],
      subject: `New Message from ${name}`,
      reply_to: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return { error: "Failed to send email. Please try again later." };
    }

    return { success: true };
  } catch (err) {
    console.error("Server error:", err);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}
