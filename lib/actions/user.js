"use server";

import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { getCurrentUser } from "./auth";

async function ensureAdmin() {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
        throw new Error("Unauthorized: Admin access required");
    }
}

export async function getUsers() {
    try {
        await ensureAdmin();
        await connectDB();
        const users = await User.find({ role: "user" }).select("-password").sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(users));
    } catch (error) {
        console.error("Get users error:", error);
        return [];
    }
}

export async function getAdmins() {
    try {
        await ensureAdmin();
        await connectDB();
        const admins = await User.find({ role: "admin" }).select("-password").sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(admins));
    } catch (error) {
        console.error("Get admins error:", error);
        return [];
    }
}

export async function createAdmin(formData) {
    try {
        await ensureAdmin();
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");

        if (!name || !email || !password) {
            return { success: false, error: "Missing required fields" };
        }

        await connectDB();

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { success: false, error: "User already exists with this email" };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin
        const newAdmin = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "admin"
        });

        return { success: true, user: JSON.parse(JSON.stringify(newAdmin)) };
    } catch (error) {
        console.error("Create admin error:", error);
        return { success: false, error: error.message };
    }
}

export async function deleteUser(id) {
    try {
        await ensureAdmin();
        await connectDB();
        await User.findByIdAndDelete(id);
        return { success: true };
    } catch (error) {
        console.error("Delete user error:", error);
        return { success: false, error: error.message };
    }
}
