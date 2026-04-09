"use server";

import connectDB from "@/lib/db";
import Settings from "@/models/Settings";
import { revalidatePath } from "next/cache";

export async function updateSettings(formData) {
  try {
    await connectDB();

    const settingsData = {
      siteTitle: formData.get("siteTitle"),
      siteLogo: formData.get("siteLogo"),
      primaryColor: formData.get("primaryColor"),
      footerText: formData.get("footerText"),
      contactEmail: formData.get("contactEmail"),
    };

    // Singleton pattern: always update the first (and only) document
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
