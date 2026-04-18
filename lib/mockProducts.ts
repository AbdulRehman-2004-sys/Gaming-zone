export const MOCK_PRODUCTS: Record<string, any> = {
  // --- FEATURED PRODUCTS ---
  "1": {
    _id: "1",
    id: "1",
    slug: "1",
    name: "GAMING MOUSE PRO",
    category: "PERIPHERALS",
    mainCategory: "Featured",
    description: "High-precision gaming mouse with custom sensors. Features zero-lag wireless connectivity and ergonomic design.",
    price: 22397,
    image: "/home/gaming-mice.jpeg",
    specs: {
      "Sensor": "Custom 26K DPI Optical Sensor",
      "Wireless": "Zero-Lag Wireless",
      "Weight": "89g Lightweight Design"
    },
    isFeatured: true,
    isGuide: false
  },
  "2": {
    _id: "2",
    id: "2",
    slug: "2",
    name: "GAMING KEYBOARD RGB",
    category: "PERIPHERALS",
    mainCategory: "Featured",
    description: "Mechanical keyboard with customizable RGB lighting and ultra-responsive switches for superior gaming performance.",
    price: 41997,
    image: "/home/gaming-keyboard.jpeg",
    specs: {
      "Switches": "Cherry MX Speed Switches",
      "Keycaps": "PBT Double-Shot Keycaps",
      "Lighting": "Dynamic Per-Key RGB"
    },
    isFeatured: true,
    isGuide: false
  },
  "3": {
    _id: "3",
    id: "3",
    slug: "3",
    name: "CORSAIR ONE i500",
    category: "GAMING PCs",
    mainCategory: "Featured",
    description: "Compact, incredibly powerful gaming PC featuring top-tier components and custom liquid cooling.",
    price: 36397,
    image: "/home/gaming-pc.jpeg",
    specs: {
      "Audio": "7.1 Surround Sound",
      "Wireless": "2.4GHz Wireless Connectivity"
    },
    isFeatured: true,
    isGuide: false
  },
  "4": {
    _id: "4",
    id: "4",
    slug: "4",
    name: "GAMING PC CASE",
    category: "CASES",
    mainCategory: "Featured",
    description: "Tempered glass mid-tower gaming case with excellent airflow and plenty of room for high-end components.",
    price: 55997,
    image: "/home/pc.jpeg",
    specs: {
      "Panels": "Tool-Free Tempered Glass",
      "Cable Management": "RapidRoute",
      "Airflow": "High-Airflow Design"
    },
    isFeatured: true,
    isGuide: false
  },

  // --- PC COMPONENTS ---
  "cpu-1": {
    _id: "cpu-1",
    id: "cpu-1",
    slug: "cpu-1",
    name: "Intel Core i9-14900K",
    category: "Processor",
    mainCategory: "Components",
    description: "The ultimate gaming processor with 24 cores and 6.0GHz boost speed.",
    price: 165197,
    image: "/new-images/pc-components/processor.jpeg",
    badge: "Top Performance",
    specs: {
      "Cores": "24 (8 P-Core, 16 E-Core)",
      "Boost Clock": "6.0 GHz",
      "Socket": "LGA 1700"
    },
    isFeatured: true,
    isGuide: false
  },
  "ram-1": {
    _id: "ram-1",
    id: "ram-1",
    slug: "ram-1",
    name: "DOMINATOR TITANIUM DDR5",
    category: "Memory",
    mainCategory: "Components",
    description: "Elite DDR5 memory with patented DHX cooling and extreme overclocking potential.",
    price: 60197,
    image: "/new-images/pc-components/memory.jpeg",
    badge: "Premium",
    specs: {
      "Capacity": "32GB (2x16GB)",
      "Speed": "7200MT/s",
      "Latency": "CL34"
    },
    isFeatured: true,
    isGuide: false
  },
  "psu-1": {
    _id: "psu-1",
    id: "psu-1",
    slug: "psu-1",
    name: "RM1000x Shift 80 PLUS Gold",
    category: "Power Supply",
    mainCategory: "Components",
    description: "Fully modular PSU with side-mounted cable connections for easier builds.",
    price: 58797,
    image: "/new-images/pc-components/power-supply.jpeg",
    badge: "Innovative",
    specs: {
      "Wattage": "1000W",
      "Efficiency": "80 PLUS Gold",
      "Cabling": "Fully Modular"
    },
    isFeatured: true,
    isGuide: false
  },
  "cool-1": {
    _id: "cool-1",
    id: "cool-1",
    slug: "cool-1",
    name: "iCUE LINK H150i RGB",
    category: "Cooling",
    mainCategory: "Components",
    description: "High-performance AIO cooler with the revolutionary iCUE LINK single-cable system.",
    price: 67197,
    image: "/new-images/pc-components/cooling.jpeg",
    badge: "Smart Cooling",
    specs: {
      "Radiator Size": "360mm",
      "Fans": "3x QX120 RGB",
      "Ecosystem": "iCUE LINK"
    },
    isFeatured: true,
    isGuide: false
  },
  "rs-max-fans": {
    _id: "rs-max-fans",
    id: "rs-max-fans",
    slug: "rs-max-fans",
    name: "RS MAX PERFORMANCE FANS",
    category: "Cooling",
    mainCategory: "Components",
    description: "Experience premium cooling with RS MAX performance fans featuring high static pressure and silent operation.",
    price: 12900,
    image: "/img/pngtree-a-sleek-gaming-pc-case-showcasing-vibrant-rgb-fans-and-components-png-image_15866247.png",
    badge: "High Performance",
    specs: {
      "Size": "120mm / 140mm",
      "Lighting": "Premium RGB",
      "Control": "PWM"
    },
    isFeatured: true,
    isGuide: false
  },

  // --- PERIPHERALS (ALL GEARS) ---
  "mouse-1": {
    _id: "mouse-1",
    id: "mouse-1",
    slug: "mouse-1",
    name: "M65 RGB ELITE",
    category: "Gaming Mouse",
    mainCategory: "Components",
    description: "Tournament-proven mouse with 18,000 DPI sensor and adjustable weight system.",
    price: 22397,
    image: "/new-images/gaming-gear/featured/mouse.jpeg",
    badge: "Best Seller",
    specs: {
      "Sensor": "18,000 DPI Optical",
      "Weight": "Adjustable Weight System",
      "Lighting": "RGB"
    },
    isFeatured: true,
    isGuide: false
  },
  "kb-1": {
    _id: "kb-1",
    id: "kb-1",
    slug: "kb-1",
    name: "K100 RGB MECHANICAL",
    category: "Keyboard",
    mainCategory: "Components",
    description: "The pinnacle of gaming keyboards, featuring AXON Hyper-Processing Technology.",
    price: 64397,
    image: "/new-images/gaming-gear/featured/keyboard.jpeg",
    badge: "Premium",
    specs: {
      "Technology": "AXON Hyper-Processing",
      "Lighting": "Dynamic RGB"
    },
    isFeatured: true,
    isGuide: false
  },
  "hs-1": {
    _id: "hs-1",
    id: "hs-1",
    slug: "hs-1",
    name: "HS80 RGB WIRELESS",
    category: "Headset",
    mainCategory: "Components",
    description: "Immersive spatial audio and broadcast-grade microphone for elite gaming.",
    price: 41997,
    image: "/new-images/gaming-gear/featured/headset.jpeg",
    badge: "Popular",
    specs: {
      "Audio": "Spatial Audio",
      "Microphone": "Broadcast-grade"
    },
    isFeatured: true,
    isGuide: false
  },
  "mouse-2": {
    _id: "mouse-2",
    id: "mouse-2",
    slug: "mouse-2",
    name: "M75 AIR WIRELESS",
    category: "Gaming Mouse",
    mainCategory: "Components",
    description: "Symmetrically shaped for comfort and built for precision at only 60g.",
    price: 36397,
    image: "/new-images/gaming-gear/featured/wireless.jpeg",
    badge: "",
    specs: {
      "Weight": "60g",
      "Shape": "Symmetrical"
    },
    isFeatured: true,
    isGuide: false
  },

  // --- GAMING PCs ---
  "lap-1": {
    _id: "lap-1",
    id: "lap-1",
    slug: "lap-1",
    name: "VOYAGER a1600 Edition",
    category: "Gaming Laptop",
    mainCategory: "Components",
    description: "Experience desktop-class performance in a thin, light portable form factor.",
    price: 559997,
    image: "/home/pc.jpeg",
    badge: "Mobile Powerhouse",
    specs: {
      "Form Factor": "Thin & Light",
      "Performance": "Desktop-Class"
    },
    isFeatured: true,
    isGuide: false
  },
  "mon-1": {
    _id: "mon-1",
    id: "mon-1",
    slug: "mon-1",
    name: "XENEON FLEX 45WQHD240 OLED",
    category: "Gaming Monitor",
    mainCategory: "Components",
    description: "The world's first bendable 45-inch OLED gaming monitor with 240Hz refresh rate.",
    price: 447997,
    image: "/home/gaming-pc.jpeg",
    badge: "Revolutionary",
    specs: {
      "Display": "45-inch OLED",
      "Refresh Rate": "240Hz",
      "Feature": "Bendable Screen"
    },
    isFeatured: true,
    isGuide: false
  }
};
