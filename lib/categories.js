export const CATEGORY_MAP = {
    "Gaming Gear": {
        "Keyboard": ["Switches", "Layout", "RGB", "Connection", "Polling", "Build", "Weight"],
        "Mice": ["Sensor", "Buttons", "Weight", "Connection", "Polling"],
        "Headsets": ["Driver", "Frequency", "Battery", "Connection", "Features"],
        "Controllers": ["Connection", "Buttons", "Battery", "Features", "Compatibility"],
        "Mousepads": ["Size", "Material", "Surface", "RGB", "Base"],
        "Cables": ["Length", "Type", "Color", "Material"],
        "Accessories": ["Type", "Compatibility", "Color"],
    },
    "Gaming PCs": {
        "Desktops": ["Processor", "Graphics", "Memory", "Storage", "OS"],
        "Laptops": ["Display", "Processor", "Graphics", "Memory", "Storage", "Battery"],
        "Monitors": ["Screen Size", "Resolution", "Refresh Rate", "Panel Type", "Response Time"],
        "Pre-built Systems": ["Case", "CPU", "GPU", "RAM", "Storage", "Cooling"],
        "Workstations": ["CPU", "GPU", "RAM", "Storage", "Motherboard", "PSU"],
    },
    "Gaming Furniture": {
        "Gaming Chairs": ["Material", "Color", "Recline", "Armrests", "Base", "Weight Capacity"],
        "Gaming Desks": ["Material", "Dimensions", "Height Adjustment", "Color"],
        "Stands": ["Type", "Compatibility", "Material", "Finish"],
        "Furniture Accessories": ["Type", "Compatibility", "Material"],
    },
    "PC Components": {
        "Processors": ["Architecture", "Cores", "Threads", "Base Clock", "Boost Clock", "Socket"],
        "Graphics Cards": ["GPU", "Memory", "Form Factor", "Power Connectors", "Cooling Type"],
        "Motherboards": ["Socket", "Chipset", "Form Factor", "Memory Slots", "PCIe Slots"],
        "Memory": ["Type", "Capacity", "Frequency", "Latency", "Voltage"],
        "Storage": ["Type", "Capacity", "Interface", "Read Speed", "Write Speed"],
        "Power Supply": ["Wattage", "Efficiency", "Modularity", "Form Factor"],
        "Cooling": ["Socket", "Type", "Fan Speed", "Noise Level", "RGB"],
        "Cables": ["Type", "Length", "Connector A", "Connector B", "Material"],
    }
};

export const MAIN_CATEGORIES = Object.keys(CATEGORY_MAP);
