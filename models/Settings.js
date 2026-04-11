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
    paymentMethods: {
      cod: {
        enabled: { type: Boolean, default: true },
        title: { type: String, default: "Cash on Delivery" },
        description: { type: String, default: "Pay when you receive your order." },
      },
      bank: {
        enabled: { type: Boolean, default: false },
        title: { type: String, default: "Bank Transfer" },
        description: { type: String, default: "Transfer directly to our bank account." },
        details: { type: String, default: "" },
      },
      stripe: {
        enabled: { type: Boolean, default: false },
        title: { type: String, default: "Credit/Debit Card (Stripe)" },
        description: { type: String, default: "Secure payment via Stripe." },
        publishableKey: { type: String, default: "" },
        secretKey: { type: String, default: "" },
      },
    },
  },
  { timestamps: true },
);

const Settings =
  mongoose.models.Settings || mongoose.model("Settings", settingsSchema);

export default Settings;
