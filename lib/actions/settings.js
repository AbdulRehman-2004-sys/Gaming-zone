"use server";

import connectDB from "@/lib/db";
import Settings from "@/models/Settings";
import { revalidatePath } from "next/cache";

export async function updateSettings(formData) {
  try {
    await connectDB();

    const settingsData = {};
    const fields = ["siteTitle", "siteLogo", "primaryColor", "footerText", "contactEmail"];
    
    fields.forEach(field => {
      if (formData.has(field)) {
        settingsData[field] = formData.get(field);
      }
    });

    // Handle paymentMethods if passed as JSON string
    if (formData.has("paymentMethods")) {
      settingsData.paymentMethods = JSON.parse(formData.get("paymentMethods"));
    }

    const updatedSettings = await Settings.findOneAndUpdate({}, settingsData, {
      upsert: true,
      new: true,
    });

    revalidatePath("/", "layout");

    return {
      success: true,
      settings: JSON.parse(JSON.stringify(updatedSettings)),
    };
  } catch (error) {
    console.error("Update settings error:", error);
    return { success: false, error: error.message };
  }
}

export async function updatePaymentSettings(paymentMethods) {
  try {
    await connectDB();

    const updatedSettings = await Settings.findOneAndUpdate(
      {},
      { paymentMethods },
      { upsert: true, new: true }
    );

    revalidatePath("/admin/settings/payment");
    revalidatePath("/checkout");

    return {
      success: true,
      settings: JSON.parse(JSON.stringify(updatedSettings)),
    };
  } catch (error) {
    console.error("Update payment settings error:", error);
    return { success: false, error: error.message };
  }
}

export async function getSettings() {
  try {
    await connectDB();
    const settings = await Settings.findOne({});
    return settings ? JSON.parse(JSON.stringify(settings)) : null;
  } catch (error) {
    console.error("Get settings error:", error);
    return null;
  }
}
