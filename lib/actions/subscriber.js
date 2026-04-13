"use server";

import connectDB from "@/lib/db";
import Subscriber from "@/models/Subscriber";
import { revalidatePath } from "next/cache";

export async function subscribe(email) {
  try {
    await connectDB();
    
    // Check if already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return { success: false, message: "This email is already subscribed!" };
    }

    await Subscriber.create({ email });
    
    revalidatePath("/admin/subscribers");
    return { success: true, message: "Succesfully subscribed to DROP ZONE!" };
  } catch (error) {
    console.error("Subscription error:", error);
    return { success: false, message: "Something went wrong. Please try again later." };
  }
}

export async function getSubscribers() {
  try {
    await connectDB();
    const subscribers = await Subscriber.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(subscribers));
  } catch (error) {
    console.error("Get subscribers error:", error);
    return [];
  }
}

export async function deleteSubscriber(id) {
  try {
    await connectDB();
    await Subscriber.findByIdAndDelete(id);
    revalidatePath("/admin/subscribers");
    return { success: true };
  } catch (error) {
    console.error("Delete subscriber error:", error);
    return { success: false };
  }
}
