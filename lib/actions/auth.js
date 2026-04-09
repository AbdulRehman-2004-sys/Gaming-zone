"use server";

import { cookies } from "next/headers";
import * as jose from "jose";
import connectDB from "@/lib/db";
import User from "@/models/User";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const { payload } = await jose.jwtVerify(token, JWT_SECRET);

    await connectDB();
    const user = await User.findById(payload.id).select("-password -__v");

    if (!user) return null;

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error: error.message };
  }
}
