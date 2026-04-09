const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://abhero12345678:BF4j5GVfU8PnHf3x@cluster0.joaqi2i.mongodb.net/corsair';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    mainCategory: { type: String }, // Made optional for update script
    category: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    specs: { type: Map, of: String, default: {} },
    isFeatured: { type: Boolean, default: false },
    badge: { type: String, default: "" },
  },
  { timestamps: true, strict: false } // Relaxed strictness for update
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const REALISTIC_VALUES = {
    "Switches": "CHERRY MX Mechanical RGB",
    "Layout": "Full-Size (100%) QWERTY",
    "RGB": "16.8M Colors Per-Key RGB",
    "Connection": "USB-C to USB-A (Braided)",
    "Polling": "8000Hz Hyper-Polling",
    "Build": "Aircraft-Grade Aluminum",
    "Weight": "1.3kg Professional Weight",
    "Sensor": "MARKSMAN 26K DPI Optical",
    "Buttons": "8 Fully-Programmable",
    "Driver": "50mm High-Density Neodymium",
    "Frequency": "20Hz - 40,000Hz",
    "Battery": "Up to 60 Hours Wireless",
    "Features": "Dolby Atmos Spatial Audio",
    "Compatibility": "PC, Mac, Mobile, PS5",
    "Size": "450mm x 400mm x 5mm",
    "Material": "Spill-Resistant Textile",
    "Surface": "Premium Micro-Woven Cloth",
    "Base": "Anti-Skid Natural Rubber",
    "Type": "DDR5 High-Frequency",
    "Capacity": "32GB (2x16GB) Dual-Channel",
    "Interface": "NVMe PCIe Gen4 x4",
    "Read Speed": "7,400 MB/s Extreme",
    "Write Speed": "6,500 MB/s sustained",
    "Processor": "Intel Core i9-14900K",
    "Graphics": "NVIDIA RTX 4090 24GB",
    "Memory": "64GB DDR5 DOMINATOR",
    "Storage": "2TB NVMe SSD",
    "OS": "Windows 11 Home",
    "Display": "16\" QHD+ 240Hz",
    "Screen Size": "27-inch / 32-inch",
    "Resolution": "3840 x 2160 (4K UHD)",
    "Refresh Rate": "240Hz Ultra-Fast",
    "Panel Type": "Fast IPS with HDR600",
    "Response Time": "0.1ms (GtG)",
    "Case": "iCUE 5000T RGB Mid-Tower",
    "CPU": "AMD Ryzen 9 7950X",
    "GPU": "RTX 4080 16GB GDDR6X",
    "RAM": "32GB VENGEANCE RGB",
    "Cooling": "H150i ELITE LCD AIO",
    "Wattage": "1000W 80 PLUS Gold",
    "Efficiency": "90% Gold Certified",
    "Modularity": "Fully Modular Cables",
    "Form Factor": "ATX Standard",
    "Socket": "LGA1700 / AM5 Ready",
    "Fan Speed": "450 - 2000 RPM",
    "Noise Level": "10 - 30 dBA Silent",
    "Architecture": "Zen 4 Performance",
    "Cores": "16 Cores / 32 Threads",
    "Threads": "32 High-speed threads",
    "Base Clock": "4.2 GHz",
    "Boost Clock": "5.4 GHz",
    "Chipset": "Z790 / X670E Elite",
    "Motherboard": "ROG Maximus Z790",
    "PSU": "CORSAIR RM1000x",
};

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const products = await Product.find({});
        console.log(`Found ${products.length} products to process.`);

        for (const product of products) {
            const newSpecs = {};
            
            // Convert to Map if it's currently an array or object
            const currentSpecs = product.specs instanceof Map ? Object.fromEntries(product.specs) : (Array.isArray(product.specs) ? {} : (product.specs || {}));

            // Iterate over the keys we expect for this subcategory from CATEGORY_MAP if we had it,
            // but for now let's just use the keys already present in the product.
            for (const key of Object.keys(currentSpecs)) {
                newSpecs[key] = REALISTIC_VALUES[key] || "High-Performance Specs";
            }
            
            // If they are the seeded ones with "SAMPLE VALUE", definitely replace them
            for (const [key, value] of Object.entries(currentSpecs)) {
                if (value === "SAMPLE VALUE") {
                    newSpecs[key] = REALISTIC_VALUES[key] || "High-Performance Specs";
                } else {
                    newSpecs[key] = value; // Keep existing if not blank/sample
                }
            }

            // Patch for products with empty specs
            if (Object.keys(newSpecs).length === 0) {
                 // Try to guess some specs based on category?
                 // But better to just leave them or use a generic one
            }

            product.specs = newSpecs;
            
            // Fix missing mainCategory for legacy products
            if (!product.mainCategory) {
                if (['Keyboard', 'Mice', 'Headsets', 'Controllers', 'Mousepads'].includes(product.category)) {
                    product.mainCategory = 'Gaming Gear';
                } else if (['Desktops', 'Laptops', 'Monitors'].includes(product.category)) {
                    product.mainCategory = 'Gaming PCs';
                } else if (['Processors', 'Graphics Cards', 'Motherboards', 'Memory', 'Storage'].includes(product.category)) {
                    product.mainCategory = 'PC Components';
                }
            }

            await product.save();
            console.log(`Updated: ${product.name}`);
        }

        console.log('Database update completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Update error:', error);
        process.exit(1);
    }
}

seed();
