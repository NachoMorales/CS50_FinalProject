// USELESS
function redirect(id) {
    window.location.assign(id+".html")
}

    // Sidenav dropdowns
function dropdown(n) {
    x = document.getElementById("dropdown" + n)
    if (x.style.display === 'block') {
        return x.style.display = 'none';
    } else {
        return x.style.display = 'block';
    }
}

    // products.JSON
let products = [
    {
        "name" : "AMD Ryzen 5 3600",
        "brand": "AMD",
        "price" : "$200",
        "category" : "processors",
        "specs": ["3rd Gen Ryzen", "Socket AM4", "Max Boost Frequency 4.2 GHz", "DDR4 Support", "L2 Cache 3MB", "L3 Cache 32MB", "Thermal Design Power 65W", "With Wraith Stealth cooler"],
        "image" : "images/products/ryzen5-3600.jpg",
        "all":"true"
    },
    {
        "name" : "Intel Core i5-10600 K",
        "brand": "Intel",
        "price" : "$275",
        "category" : "processors",
        "specs":["CPU Socket LGA 1200", "14 nm Comet Lake 125W", "6-Core", "12-Threads", "Operating Frequency 4.1 GHz", "Max Turbo Frequency 4.80 GHz", "Bus Speed 8 GT/s","L3 Cache 12MB", "64-Bit Support","Hyper-Threading Support", "Memory Types DDR4 2666", "Memory Channel 2","Virtualization Technology Support","Integrated Graphics: Intel UHD Graphics 630", "Graphics Base Frequency 350 MHz","Graphics Max Dynamic Frequency 1.2 GHz","PCI Express Revision 3.0","Max Number of PCI Express Lanes: 16","Cooling Device not included - Processor Only"],
        "image" :"images/products/i5-10400.jpg",
        "all":"true"
    },
    {
        "name":"EVGA GeForce RTX 2060",
        "brand":"Nvidia",
        "price":"$370",
        "category":"graphics",
        "specs": ["Boost Clock: 1755 MHz", "Real-Time RAY TRACING in games for cutting-edge, hyper-realistic graphics", "Dual HDB Fans offer higher performance cooling and much quieter acoustic noise", "Built for EVGA Precision X1 - EVGA's all-new tuning utility monitors your graphics card and gives you the power to overclock like a pro!"],
        "image":"images/products/rtx2060.jpg",
        "all":"true"
    },
    {
        "name":"GIGABYTE Radeon RX 5700 XT",
        "brand":"AMD",
        "price":"$420",
        "category":"graphics",
        "specs": ["8GB 256-Bit GDDR6", "Core Clock 1650 MHz", "Boost Clock 1905 MHz", "1 x HDMI 2.0b 3 x DisplayPort 1.4", "2560 Stream Processors", "PCI Express 4.0 x16"],
        "image":"images/products/rx5700xt.jpg",
        "all":"true"
    },
    {
        "name":"EVGA GeForceGTX 1660 Ti",
        "brand":"Nvidia",
        "price":"$300",
        "category":"graphics",
        "specs":["Boost Clock: 1845 MHz", "All-new NVIDIA Turing architecture to give you incredible new levels of gaming realism, speed, power efficiency and immersion", "Dual Fans offer higher performance cooling and low acoustic noise", "Built for EVGA Precision X1 - EVGA's all-new tuning utility monitors your graphics card and gives you the power to overclock like a pro!"],
        "image":"images/products/gtx1660ti.jpg",
        "all":"true"
    },
    {
        "name":"GIGABYTE Radeon RX 580",
        "brand":"AMD",
        "price":"$200",
        "category":"graphics",
        "specs":["8GB 256-Bit GDDR5", "Core Clock OC mode: up to 1355 MHz", "Gaming mode: up to 1340 MHz", "1 x HDMI 2.0b 3 x DisplayPort 1.4", "2304 Stream Processors", "PCI Express 3.0"],
        "image":"images/products/rx580.jpg",
        "all":"true"
    },
    {
        "name":"GIGABYTE GeForce GTX 1050 Ti",
        "brand":"Nvidia",
        "price":"$160",
        "category":"graphics",
        "specs": ["4GB 128-Bit GDDR5", "Core Clock 1316 MHz in OC Mode", "1290 MHz in Gaming", "Boost Clock 1430 MHz in OC Mode", "1392 MHz in Gaming", "1 x Dual-Link DVI-D 1 x HDMI 2.0b 1 x DisplayPort 1.4", "PCI Express 3.0 x16"],
        "image":"images/products/gtx1050ti.jpg",
        "all":"true"
    },
    {
        "name":"ASRock Phantom Gaming Radeon RX 5600 XT",
        "brand":"AMD",
        "price":"$290",
        "category":"graphics",
        "specs": ["6GB 192-Bit GDDR6", "Core Clock 1530 MHz", "Boost Clock 1750 MHz", "1 x HDMI 2.0b 3 x DisplayPort 1.4", "2304 Stream Processors", "PCI Express 4.0 x16"],
        "image":"images/products/rx5600xt.jpg",
        "all":"true"
    },
    {
        "name":"GIGABYTE Radeon RX 5500 XT",
        "brand":"AMD",
        "price":"$210",
        "category":"graphics",
        "specs": ["8GB 128-Bit GDDR6", "Boost Clock 1845 MHz", "1 x HDMI 2.0b 3 x DisplayPort 1.4", "1408 Stream Processors", "PCI Express 4.0 x8"],
        "image":"images/products/rx5500xt.jpg",
        "all":"true"
    },
    {
        "name":"MSI GeForce GTX 1660 Ti Gaming X",
        "brand":"Nvidia",
        "price":"$360",
        "category":"graphics",
        "specs": ["6GB 192-Bit GDDR6", "Boost Clock 1875 MHz", "1 x HDMI 2.0b 3 x DisplayPort 1.4", "1536 CUDA Cores", "PCI Express 3.0 x16"],
        "image":"images/products/msigtx1660ti.jpg",
        "all":"true"
    },
    {
        "name":"ASUS TUF Gaming GeForce GTX 1650",
        "brand":"Nvidia",
        "price":"$160",
        "category":"graphics",
        "specs": ["4GB 128-Bit GDDR6", "Core Clock 1410 MHz", "Boost Clock 1755 MHz (Gaming Mode), 1785 MHz (OC Mode)", "1 x DVI-D 1 x HDMI 2.0b 1 x DisplayPort 1.4", "896 CUDA Cores", "PCI Express 3.0"],
        "image":"images/products/gtx1650.jpg",
        "all":"true"
    },
    {
        "name":"AMD Ryzen 7 5800 X",
        "brand":"AMD",
        "price":"$450",
        "category":"processors",
        "specs":["CPU Socket AM4", "8-Core", "16 Threads", "Operating Frequency 3.8 GHz", "Max Turbo Frequency 4.7 GHz", "L2 Cache 4MB", "L3 Cache 32MB", "Manufacturing Tech 7nm", "64-Bit Support", "Memory Types: DDR4 3200", "PCI Express Revision 4.0", "Thermal Design Power 105W", "Cooling device not included - Processor Only"],
        "image":"images/products/ryzen7-5800x.jpg",
        "all":"true"
    },
    {
        "name":"Intel Core i9-10980 XE",
        "brand":"Intel",
        "price":"$1000",
        "category":"processors",
        "specs":["CPU Socket Type LGA 2066", "14nm Cascade Lake 165W", "18-Core","36 Threads","Operating Frequency 3.0 GHz","Max Turbo Frequency: Intel Turbo Boost 2.0 Max Technology Frequency (GHz): 4.6 - Intel Turbo Boost 3.0 Max Technology Frequency (GHz): 4.8","Bus Speed 8 GT/s","L3 Cache 24.75MB","64-Bit Support","Hyper-Threading Support","Memory Types DDR4 2933","Memory Channel 4","PCI Express Revision 3.0","Max Number of PCI Express Lanes 48","Cooling device not included - Processor Only"],
        "image":"images/products/i9-10980xe.jpg",
        "all":"true"
    },
    {
        "name":"AMD Ryzen 9 5900 X",
        "brand":"AMD",
        "price":"$550",
        "category":"processors",
        "specs":["Socket AM4", "12-Core","24 Threads","Operating Frequency 3.7 GHz","Max Turbo Frequency 4.8 GHz","L2 Cache 6MB","L3 Cache 64MB","7nm 105W","64-Bit Support","Memory Types DDR4 3200","PCI Express Revision 4.0", "Cooling device not included - Processor Only"],
        "image":"images/products/ryzen9-5900x.jpg",
        "all":"true"
    },
    {
        "name":"Intel Core i7-10700 KA",
        "brand":"Intel",
        "price":"$380",
        "category":"processors",
        "specs":["Marvel Avengers Limited Special Edition","Includes a commemorative card inside of the box","8 Cores & 16 Threads","3.8 GHz Clock Speed","5.1 GHz Maximum Turbo Frequency","Compatible with Intel 400 series chipset based motherboards","LGA 1200 Socket","Intel UHD Graphics 630","Intel Turbo Boost Max Technology 3.0 support","Intel Optane Memory Support","No thermal solution included"],
        "image":"images/products/i7-10700ka.webp",
        "all":"true"
    },
    {
        "name":"AMD Ryzen 3 3200 G",
        "brand":"AMD",
        "price":"$150",
        "category":"processors",
        "specs":["Built-In Radeon Vega 8 Graphics", "2nd GEN with Radeon Graphic","Socket AM4","Max Boost Frequency 4.0 GHz","L2 Cache 2MB","L3 Cache 4MB","Thermal Design Power 65W","With Wraith Stealth cooler"],
        "image":"images/products/ryzen3-3200g.jpg",
        "all":"true"
    },
    {
        "name":"Intel Core i3-10300",
        "brand":"Intel",
        "price":"$175",
        "category":"processors",
        "specs":["CPU Socket LGA 1200","Comet Lake","Quad-Core","8 Threads","Operating Frequency 3.7 GHz","Max Turbo Frequency 4.40 GHz","Bus Speed 8 GT/s","L3 Cache 8MB","14nm 65W","64-Bit Support","Hyper-Threading Support","Memory Types DDR4 2666","Memory Channel 2","Virtualization Technology Support","Integrated Graphics Intel UHD Graphics 630","Graphics Base Frequency 350 MHz","Graphics Max Dynamic Frequency 1.15 GHz","PCI Express Revision 3.0","Max Number of PCI Express Lanes 16","Cooling Device Heatsink and fan included"],
        "image":"images/products/i3-10300.jpg",
        "all":"true"
    },
    {
        "name":"AMD Ryzen 5 5600 X",
        "brand":"AMD",
        "price":"$300",
        "category":"processors",
        "specs":["Socket AM4","6-Core","12 Threads","Operating Frequency 3.7 GHz","Max Turbo Frequency 4.6 GHz","L2 Cache 3MB","L3 Cache 32MB","7nm 65W","64-Bit Support","Memory Types DDR4 3200","PCI Express Revision 4.0","Wraith Stealth Cooler"],
        "image":"images/products/ryzen5-5600x.jpg",
        "all":"true"
    },
    {
        "name":"Intel Core i9-9900 KS",
        "brand":"Intel",
        "price":"$2000",
        "category":"processors",
        "specs":["CPU Socket Type LGA 1151 (300 Series)","Core Name Coffee Lake","8-Core","16 Threads","Operating Frequency 4.0 GHz","Max Turbo Frequency 5.0 GHz","Bus Speed 8 GT/s","L3 Cache 16MB","14nm 127W","64-Bit Support","Hyper-Threading Support","Memory Types DDR4 2666","Memory Channel 2","Virtualization Technology Support","Intel UHD Graphics 630","Graphics Base Frequency 350 MHz","Graphics Max Dynamic Frequency 1.2 GHz","PCI Express Revision 3.0","Max Number of PCI Express Lanes 16","Cooling device not included - Processor Only"],
        "image":"images/products/i9-9900ks.jpg",
        "all":"true"
    }
]


// Filter Products onload
// NOTAS: cambiar maxCards value al agregar productos en json
function allProducts(bool) {
    var allProducts = products.filter(item => item.all == bool);
    var validCards = allProducts.length;
    
    // Filtrar cantidad de cartas que se van a mostrar
    for (var maxCards = 28; maxCards >= validCards;) {
        var highestCardId = "card" + maxCards;
        maxCards -= 1;
        document.getElementById(highestCardId).style.display = 'none';
    }

        // Cargar contenido en las cartas
    for (var card = 0; card < validCards; card += 1) {
        var id = "#card" + card;
        document.querySelector(id).getElementsByTagName("h4")[0].textContent = allProducts[card].name;
        document.querySelector(id).getElementsByTagName("h5")[0].textContent = allProducts[card].price;
        document.querySelector(id).getElementsByTagName("img")[0].src = allProducts[card].image;
    }
}


// Filtering Category onLoad => Change to onClick
// NOTAS: cambiar maxCards value al agregar productos en json
function productFilter(filter) {
    var filteredProducts = products.filter(item => item.category == filter);
    var validCards = filteredProducts.length;

    // Filtrar cantidad de cartas que se van a mostrar
    for (var maxCards = 28; maxCards >= validCards;) {
        var highestCardId = "card" + maxCards;
        maxCards -= 1;
        document.getElementById(highestCardId).style.display = 'none';
    }
    // Mostrar cartas válidas
    //for (var cards = 0; cards < validCards;) {
    //    var lowestCardId = "card" + cards;
    //    cards += 1;
    //    document.getElementById(lowestCardId).style.display = 'block';
    //}

    // Cargar contenido en las cartas
    for (var card = 0; card < validCards; card += 1) {
        var id = "#card" + card;
        document.querySelector(id).getElementsByTagName("h4")[0].textContent = filteredProducts[card].name;
        document.querySelector(id).getElementsByTagName("h5")[0].textContent = filteredProducts[card].price;
        document.querySelector(id).getElementsByTagName("img")[0].src = filteredProducts[card].image;
    }
}



// TODO: BREADCRUMB FUNCTION: CHANGE ON FILTERING