import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    siteTitle: {
      type: String,
      default: "Corsair",
    },
    siteLogo: {
      type: String,
      default: "/logo.svg",
    },
    primaryColor: {
      type: String,
      default: "#facc15", // Yellow-400
    },
    footerText: {
      type: String,
      default: "© 2024 Corsair. All rights reserved.",
    },
    contactEmail: {
      type: String,
    },
  },
  { timestamps: true },
);

const Settings =
  mongoose.models.Settings || mongoose.model("Settings", settingsSchema);

export default Settings;
