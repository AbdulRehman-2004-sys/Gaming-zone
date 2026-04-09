"use server";

import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";

export async function createProduct(formData) {
  try {
    await connectDB();

    const productData = {
      name: formData.get("name"),
      price: parseFloat(formData.get("price")),
      mainCategory: formData.get("mainCategory"),
      category: formData.get("category"),
      image: formData.get("image"), // Expect relative URL from upload API
      description: formData.get("description"),
      specs: formData.get("specs") ? JSON.parse(formData.get("specs")) : {},
      isFeatured: formData.get("isFeatured") === "true",
      badge: formData.get("badge") || "",
      slug: (formData.get("name") || "")
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
    };

    const newProduct = await Product.create(productData);

    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath("/gaming-pcs");
    revalidatePath("/gaming-furniture");

    return { success: true, product: JSON.parse(JSON.stringify(newProduct)) };
  } catch (error) {
    console.error("Create product error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateProduct(id, formData) {
  try {
    await connectDB();

    const productData = {
      name: formData.get("name"),
      price: parseFloat(formData.get("price")),
      mainCategory: formData.get("mainCategory"),
      category: formData.get("category"),
      image: formData.get("image"),
      description: formData.get("description"),
      specs: formData.get("specs") ? JSON.parse(formData.get("specs")) : {},
      isFeatured: formData.get("isFeatured") === "true",
      badge: formData.get("badge") || "",
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
      new: true,
    });

    revalidatePath("/admin/products");
    revalidatePath(`/products/${updatedProduct.slug}`);

    return {
      success: true,
      product: JSON.parse(JSON.stringify(updatedProduct)),
    };
  } catch (error) {
    console.error("Update product error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id) {
  try {
    await connectDB();
    await Product.findByIdAndDelete(id);

    revalidatePath("/admin/products");

    return { success: true };
  } catch (error) {
    console.error("Delete product error:", error);
    return { success: false, error: error.message };
  }
}

export async function getProducts(query = {}) {
  try {
    await connectDB();
    const products = await Product.find(query).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Get products error:", error);
    return [];
  }
}
