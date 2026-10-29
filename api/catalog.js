// api/catalog.js

// 1. КОНФІГУРАЦІЯ КЛІЄНТІВ ТА НАЦІНОК (Розділено на наявність та під замовлення)
const CLIENTS_CONFIG = {
  "default": { 
    name: "Роздрібний клієнт", 
    marginStock: 100,  // націнка на товари в наявності (%)
    marginOrder: 100,  // націнка під замовлення (%)
    round: true 
  },
  "k-01": { 
    name: "ТОВ Офіс-Світ", 
    marginStock: 25, 
    marginOrder: 30, 
    round: true 
  },
  "k-02": { 
    name: "ФОП Ковальчук", 
    marginStock: 35, 
    marginOrder: 40, 
    round: true 
  },
  "vip-opt": { 
    name: "Партнер VIP", 
    marginStock: 20, 
    marginOrder: 22, 
    round: true 
  },
  "client-7": { 
    name: "Торговий Дім", 
    marginStock: 28, 
    marginOrder: 32, 
    round: true 
  }
};

// ВАШ МАСИВ ТОВАРІВ З ЗАКУПІВЕЛЬНИМИ ЦІНАМИ (pr)
const PRODUCTS_DATA = [
  {
    "art": "8842-27-1-a",
    "barcode": "4,06328E+12",
    "pr": "147,876",
    "price": "279",
    "brand": "AXENT",
    "name": "Щоденник 2027 Classic City, 145*210, с/т чорний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76858_8842-27-1-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76858_8842-27-1-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76858_8842-27-1-A_03.jpg",
    "qual": "5"
  },
  {
    "art": "8844-27-4-a",
    "barcode": "4,06328E+12",
    "pr": "202,62",
    "price": "382,3",
    "brand": "AXENT",
    "name": "Щоденник 2027 Classic Lux, 145*210, слп/т коричневий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76874_8844-27-4-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76874_8844-27-4-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76874_8844-27-4-A_03.jpg",
    "qual": "2"
  },
  {
    "art": "8844-27-5-a",
    "barcode": "4,06328E+12",
    "pr": "202,62",
    "price": "382,3",
    "brand": "AXENT",
    "name": "Щоденник 2027 Classic Lux, 145*210, слп/т темно зелений",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76876_8844-27-5-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76876_8844-27-5-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76876_8844-27-5-A_03.jpg",
    "qual": "3"
  },
  {
    "art": "8844-27-1-a",
    "barcode": "4,06328E+12",
    "pr": "202,62",
    "price": "382,3",
    "brand": "AXENT",
    "name": "Щоденник 2027 Classic Lux, 145*210, слп/т чорний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76871_8844-27-1-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76871_8844-27-1-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76871_8844-27-1-A_03.jpg",
    "qual": "3"
  },
  {
    "art": "8845-27-4-a",
    "barcode": "4,06328E+12",
    "pr": "202,62",
    "price": "382,3",
    "brand": "AXENT",
    "name": "Щоденник 2027 Classic Milano, 145*210, слп/т коричневий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76882_8845-27-4-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76882_8845-27-4-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76882_8845-27-4-A_03.jpg",
    "qual": "1"
  },
  {
    "art": "8845-27-1-a",
    "barcode": "4,06328E+12",
    "pr": "202,62",
    "price": "382,3",
    "brand": "AXENT",
    "name": "Щоденник 2027 Classic Milano, 145*210, слп/т чорний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76878_8845-27-1-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76878_8845-27-1-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76878_8845-27-1-A_03.jpg",
    "qual": "2"
  },
  {
    "art": "8843-27-3-a",
    "barcode": "4,06328E+12",
    "pr": "202,62",
    "price": "382,3",
    "brand": "AXENT",
    "name": "Щоденник 2027 Classic Palermo, 145*210, слп/т червоний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76867_8843-27-3-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76867_8843-27-3-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76867_8843-27-3-A_03.jpg",
    "qual": "1"
  },
  {
    "art": "8843-27-1-a",
    "barcode": "4,06328E+12",
    "pr": "202,62",
    "price": "382,3",
    "brand": "AXENT",
    "name": "Щоденник 2027 Classic Palermo, 145*210, слп/т чорний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76865_8843-27-1-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76865_8843-27-1-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76865_8843-27-1-A_03.jpg",
    "qual": "2"
  },
  {
    "art": "8840-27-4-a",
    "barcode": "4,06328E+12",
    "pr": "147,876",
    "price": "279",
    "brand": "AXENT",
    "name": "Щоденник 2027 Classic Style, 145*210, з/т коричневий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76856_8840-27-4-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76856_8840-27-4-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76856_8840-27-4-A_03.jpg",
    "qual": "1"
  },
  {
    "art": "8840-27-1-a",
    "barcode": "4,06328E+12",
    "pr": "147,876",
    "price": "279",
    "brand": "AXENT",
    "name": "Щоденник 2027 Classic Style, 145*210, с/т чорний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76853_8840-27-1-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76853_8840-27-1-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76853_8840-27-1-A_03.jpg",
    "qual": "5"
  },
  {
    "art": "8835-27-4-a",
    "barcode": "4,06328E+12",
    "pr": "354,888",
    "price": "669,6",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Elegance, 145*210, Create your shine",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76947_8835-27-4-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76947_8835-27-4-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76947_8835-27-4-A_03.jpg",
    "qual": "1"
  },
  {
    "art": "8835-27-5-a",
    "barcode": "4,06328E+12",
    "pr": "354,888",
    "price": "669,6",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Elegance, 145*210, Life is beautiful",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76948_8835-27-5-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76948_8835-27-5-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76948_8835-27-5-A_03.jpg",
    "qual": "1"
  },
  {
    "art": "8815-27-02-a",
    "barcode": "4,06328E+12",
    "pr": "283,704",
    "price": "535,3",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Lines, 145*210, синій",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76917_8815-27-02-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76917_8815-27-02-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76917_8815-27-02-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76917_8815-27-02-A_04.jpg",
    "qual": "2"
  },
  {
    "art": "8815-27-23-a",
    "barcode": "4,06328E+12",
    "pr": "283,704",
    "price": "535,3",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Lines, 145*210, темно-зелений",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76919_8815-27-23-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76919_8815-27-23-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76919_8815-27-23-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76919_8815-27-23-A_04.jpg",
    "qual": "2"
  },
  {
    "art": "8815-27-01-a",
    "barcode": "4,06328E+12",
    "pr": "283,704",
    "price": "535,3",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Lines, 145*210, чорний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76916_8815-27-01-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76916_8815-27-01-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76916_8815-27-01-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76916_8815-27-01-A_04.jpg",
    "qual": "5"
  },
  {
    "art": "8840-27-3-a",
    "barcode": "4,06328E+12",
    "pr": "147,88",
    "price": "279",
    "brand": "AXENT",
    "name": "Щоденник 2027 Classic Style, 145*210, з/т бордовий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76855_8840-27-3-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76855_8840-27-3-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76855_8840-27-3-A_03.jpg",
    "qual": "1"
  },
  {
    "art": "8810-27-23-a",
    "barcode": "4,06328E+12",
    "pr": "311,05",
    "price": "586,9",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Soft Skin, 145*210, темно-зелений",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76915_8810-27-23-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76915_8810-27-23-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76915_8810-27-23-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76915_8810-27-23-A_04.jpg",
    "qual": "0"
  },
  {
    "art": "8810-27-06-a",
    "barcode": "4,06328E+12",
    "pr": "311,05",
    "price": "586,9",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Soft Skin, 145*210, червоний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76914_8810-27-06-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76914_8810-27-06-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76914_8810-27-06-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76914_8810-27-06-A_04.jpg",
    "qual": "0"
  },
  {
    "art": "8823-27-4-a",
    "barcode": "4,06328E+12",
    "pr": "323,14",
    "price": "609,7",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Mellow, 145*210, Designed for dreams",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76932_8823-27-4-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76932_8823-27-4-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76932_8823-27-4-A_03.jpg",
    "qual": "0"
  },
  {
    "art": "8823-27-6-a",
    "barcode": "4,06328E+12",
    "pr": "323,14",
    "price": "609,7",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Mellow, 145*210,Plans with personality",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76935_8823-27-6-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76935_8823-27-6-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76935_8823-27-6-A_03.jpg",
    "qual": "0"
  },
  {
    "art": "8827-27-1-a",
    "barcode": "4,06328E+12",
    "pr": "311,05",
    "price": "586,9",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Soft Muse, 145*210, бордовий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76926_8827-27-1-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76926_8827-27-1-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76926_8827-27-1-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76926_8827-27-1-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76926_8827-27-1-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8828-27-6-a",
    "barcode": "4,06328E+12",
    "pr": "217,99",
    "price": "411,3",
    "brand": "AXENT",
    "name": "Щоденник 2027 Pocket Mellow, 101*146,Plans with personality",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76943_8828-27-6-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76943_8828-27-6-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76943_8828-27-6-A_03.jpg",
    "qual": "0"
  },
  {
    "art": "8835-27-1-a",
    "barcode": "4,06328E+12",
    "pr": "354,89",
    "price": "669,6",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Elegance, 145*210, Dream Plan Do.",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76944_8835-27-1-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76944_8835-27-1-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76944_8835-27-1-A_03.jpg",
    "qual": "0"
  },
  {
    "art": "8837-27-1-a",
    "barcode": "4,06328E+12",
    "pr": "311,05",
    "price": "586,9",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Soft Cloud, 145*210, коричневий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76965_8837-27-1-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76965_8837-27-1-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76965_8837-27-1-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76965_8837-27-1-A_04.jpg",
    "qual": "0"
  },
  {
    "art": "8837-27-3-a",
    "barcode": "4,06328E+12",
    "pr": "311,05",
    "price": "586,9",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Soft Cloud, 145*210, смарагдовий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76967_8837-27-3-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76967_8837-27-3-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76967_8837-27-3-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76967_8837-27-3-A_04.jpg",
    "qual": "0"
  },
  {
    "art": "8835-27-2-a",
    "barcode": "4,06328E+12",
    "pr": "354,89",
    "price": "669,6",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Elegance, 145*210, Designed for dreams.",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76945_8835-27-2-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76945_8835-27-2-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76945_8835-27-2-A_03.jpg",
    "qual": "1"
  },
  {
    "art": "8835-27-3-a",
    "barcode": "4,06328E+12",
    "pr": "354,89",
    "price": "669,6",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Elegance, 145*210, Keep shining bright.",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76946_8835-27-3-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76946_8835-27-3-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76946_8835-27-3-A_03.jpg",
    "qual": "1"
  },
  {
    "art": "8835-27-6-a",
    "barcode": "4,06328E+12",
    "pr": "354,89",
    "price": "669,6",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Elegance, 145*210, Pink mood.",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76949_8835-27-6-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76949_8835-27-6-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76949_8835-27-6-A_03.jpg",
    "qual": "0"
  },
  {
    "art": "8836-27-5-a",
    "barcode": "4,06328E+12",
    "pr": "300,14",
    "price": "566,3",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Daily Vibes, 145*210, Dream Plan Do",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76963_8836-27-5-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76963_8836-27-5-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76963_8836-27-5-A_03.jpg",
    "qual": "0"
  },
  {
    "art": "8836-27-2-a",
    "barcode": "4,06328E+12",
    "pr": "300,14",
    "price": "566,3",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Daily Vibes, 145*210, Only good days",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76960_8836-27-2-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76960_8836-27-2-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76960_8836-27-2-A_03.jpg",
    "qual": "0"
  },
  {
    "art": "8836-27-4-a",
    "barcode": "4,06328E+12",
    "pr": "300,14",
    "price": "566,3",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Daily Vibes, 145*210, Perfect",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76962_8836-27-4-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76962_8836-27-4-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76962_8836-27-4-A_03.jpg",
    "qual": "0"
  },
  {
    "art": "8836-27-1-a",
    "barcode": "4,06328E+12",
    "pr": "300,14",
    "price": "566,3",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Daily Vibes, 145*210, Plan book",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76958_8836-27-1-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76958_8836-27-1-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76958_8836-27-1-A_03.jpg",
    "qual": "0"
  },
  {
    "art": "8836-27-6-a",
    "barcode": "4,06328E+12",
    "pr": "300,14",
    "price": "566,3",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Daily Vibes, 145*210, Plan the magic",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76964_8836-27-6-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76964_8836-27-6-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76964_8836-27-6-A_03.jpg",
    "qual": "0"
  },
  {
    "art": "8836-27-3-a",
    "barcode": "4,06328E+12",
    "pr": "300,14",
    "price": "566,3",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Daily Vibes, 145*210, Plans inside",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76961_8836-27-3-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76961_8836-27-3-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76961_8836-27-3-A_03.jpg",
    "qual": "0"
  },
  {
    "art": "8837-27-5-a",
    "barcode": "4,06328E+12",
    "pr": "311,05",
    "price": "586,9",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Soft Cloud, 145*210, блакитний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76969_8837-27-5-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76969_8837-27-5-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76969_8837-27-5-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76969_8837-27-5-A_04.jpg",
    "qual": "0"
  },
  {
    "art": "8837-27-6-a",
    "barcode": "4,06328E+12",
    "pr": "311,05",
    "price": "586,9",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Soft Cloud, 145*210, бузковий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76970_8837-27-6-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76970_8837-27-6-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76970_8837-27-6-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76970_8837-27-6-A_04.jpg",
    "qual": "0"
  },
  {
    "art": "8837-27-4-a",
    "barcode": "4,06328E+12",
    "pr": "311,05",
    "price": "586,9",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Soft Cloud, 145*210, салатовий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76968_8837-27-4-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76968_8837-27-4-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76968_8837-27-4-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76968_8837-27-4-A_04.jpg",
    "qual": "0"
  },
  {
    "art": "8832-27-4-a",
    "barcode": "4,06328E+12",
    "pr": "323,14",
    "price": "609,7",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Daily Shine, 145*210, Embrace challenges",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76989_8832-27-4-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76989_8832-27-4-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76989_8832-27-4-A_03.jpg",
    "qual": "1"
  },
  {
    "art": "8832-27-1-a",
    "barcode": "4,06328E+12",
    "pr": "323,14",
    "price": "609,7",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Daily Shine, 145*210, Keep moving",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76986_8832-27-1-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76986_8832-27-1-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76986_8832-27-1-A_03.jpg",
    "qual": "0"
  },
  {
    "art": "8832-27-2-a",
    "barcode": "4,06328E+12",
    "pr": "323,14",
    "price": "609,7",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Daily Shine, 145*210, Professional overthinker",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76987_8832-27-2-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76987_8832-27-2-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76987_8832-27-2-A_03.jpg",
    "qual": "0"
  },
  {
    "art": "8832-27-3-a",
    "barcode": "4,06328E+12",
    "pr": "323,14",
    "price": "609,7",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Daily Shine, 145*210, Serious stuff",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76988_8832-27-3-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76988_8832-27-3-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76988_8832-27-3-A_03.jpg",
    "qual": "0"
  },
  {
    "art": "8834-27-1-a",
    "barcode": "4,06328E+12",
    "pr": "345,04",
    "price": "651",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Force, 145*210, темно синій. Пакування: подарункова коробка",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76991_8834-27-1-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76991_8834-27-1-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76991_8834-27-1-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76991_8834-27-1-A_04.jpg",
    "qual": "1"
  },
  {
    "art": "8834-27-2-a",
    "barcode": "4,06328E+12",
    "pr": "345,04",
    "price": "651",
    "brand": "AXENT",
    "name": "Щоденник 2027 Partner Force, 145*210, чорний. Пакування: подарункова коробка",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76992_8834-27-2-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76992_8834-27-2-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76992_8834-27-2-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76992_8834-27-2-A_04.jpg",
    "qual": "1"
  },
  {
    "art": "8505-27-64-a",
    "barcode": "4,06328E+12",
    "pr": "169,22",
    "price": "319,3",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Strong, 125*195, помаранчевий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77000_8505-27-64-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77000_8505-27-64-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77000_8505-27-64-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77000_8505-27-64-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77000_8505-27-64-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77000_8505-27-64-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8505-27-62-a",
    "barcode": "4,06328E+12",
    "pr": "169,22",
    "price": "319,3",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Strong, 125*195, сірий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76999_8505-27-62-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76999_8505-27-62-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76999_8505-27-62-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76999_8505-27-62-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76999_8505-27-62-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76999_8505-27-62-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8505-27-01-a",
    "barcode": "4,06328E+12",
    "pr": "169,22",
    "price": "319,3",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Strong, 125*195, чорний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76996_8505-27-01-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76996_8505-27-01-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76996_8505-27-01-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76996_8505-27-01-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76996_8505-27-01-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76996_8505-27-01-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8515-27-48-a",
    "barcode": "4,06328E+12",
    "pr": "187,31",
    "price": "353,4",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Lines, 125*195, блакитний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77019_8515-27-48-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77019_8515-27-48-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77019_8515-27-48-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77019_8515-27-48-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77019_8515-27-48-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77019_8515-27-48-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8515-27-03-a",
    "barcode": "4,06328E+12",
    "pr": "187,31",
    "price": "353,4",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Lines, 125*195, сірий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77017_8515-27-03-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77017_8515-27-03-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77017_8515-27-03-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77017_8515-27-03-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77017_8515-27-03-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77017_8515-27-03-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8515-27-23-a",
    "barcode": "4,06328E+12",
    "pr": "187,31",
    "price": "353,4",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Lines, 125*195, темно-зелений",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77018_8515-27-23-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77018_8515-27-23-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77018_8515-27-23-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77018_8515-27-23-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77018_8515-27-23-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77018_8515-27-23-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8515-27-01-a",
    "barcode": "4,06328E+12",
    "pr": "187,31",
    "price": "353,4",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Lines, 125*195, чорний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77015_8515-27-01-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77015_8515-27-01-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77015_8515-27-01-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77015_8515-27-01-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77015_8515-27-01-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77015_8515-27-01-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8528-27-4-a",
    "barcode": "4,06328E+12",
    "pr": "216,88",
    "price": "409,2",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Mellow, 125*195, Designed for dreams",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77031_8528-27-4-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77031_8528-27-4-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77031_8528-27-4-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77031_8528-27-4-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77031_8528-27-4-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77031_8528-27-4-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8528-27-5-a",
    "barcode": "4,06328E+12",
    "pr": "216,88",
    "price": "409,2",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Mellow, 125*195, She plans She wins",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77032_8528-27-5-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77032_8528-27-5-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77032_8528-27-5-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77032_8528-27-5-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77032_8528-27-5-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77032_8528-27-5-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8509-27-23-a",
    "barcode": "4,06328E+12",
    "pr": "192,76",
    "price": "363,7",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Soft Skin, 125*195, темно-зелений",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77014_8509-27-23-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77014_8509-27-23-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77014_8509-27-23-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77014_8509-27-23-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77014_8509-27-23-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77014_8509-27-23-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8509-27-03-a",
    "barcode": "4,06328E+12",
    "pr": "192,76",
    "price": "363,7",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Soft Skin, 125*195, червоний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77013_8509-27-03-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77013_8509-27-03-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77013_8509-27-03-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77013_8509-27-03-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77013_8509-27-03-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77013_8509-27-03-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8509-27-01-a",
    "barcode": "4,06328E+12",
    "pr": "192,76",
    "price": "363,7",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Soft Skin, 125*195, чорний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77011_8509-27-01-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77011_8509-27-01-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77011_8509-27-01-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77011_8509-27-01-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77011_8509-27-01-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77011_8509-27-01-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8505-27-65-a",
    "barcode": "4,06328E+12",
    "pr": "169,22",
    "price": "319,3",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Strong, 125*195, хакі",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77001_8505-27-65-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77001_8505-27-65-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77001_8505-27-65-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77001_8505-27-65-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77001_8505-27-65-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77001_8505-27-65-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8508-27-31-a",
    "barcode": "4,06328E+12",
    "pr": "125,4",
    "price": "236,6",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Pocket Strong, 90*150, малахітовий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77006_8508-27-31-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77006_8508-27-31-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77006_8508-27-31-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77006_8508-27-31-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77006_8508-27-31-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77006_8508-27-31-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8508-27-64-a",
    "barcode": "4,06328E+12",
    "pr": "125,4",
    "price": "236,6",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Pocket Strong, 90*150, помаранчевий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77009_8508-27-64-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77009_8508-27-64-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77009_8508-27-64-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77009_8508-27-64-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77009_8508-27-64-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77009_8508-27-64-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8508-27-02-a",
    "barcode": "4,06328E+12",
    "pr": "125,4",
    "price": "236,6",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Pocket Strong, 90*150, синій",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77005_8508-27-02-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77005_8508-27-02-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77005_8508-27-02-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77005_8508-27-02-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77005_8508-27-02-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77005_8508-27-02-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8508-27-65-a",
    "barcode": "4,06328E+12",
    "pr": "125,4",
    "price": "236,6",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Pocket Strong, 90*150, хакі",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77010_8508-27-65-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77010_8508-27-65-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77010_8508-27-65-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77010_8508-27-65-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77010_8508-27-65-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77010_8508-27-65-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8508-27-01-a",
    "barcode": "4,06328E+12",
    "pr": "125,4",
    "price": "236,6",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Pocket Strong, 90*150, чорний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77004_8508-27-01-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77004_8508-27-01-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77004_8508-27-01-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77004_8508-27-01-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77004_8508-27-01-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77004_8508-27-01-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8507-27-01-a",
    "barcode": "4,06328E+12",
    "pr": "191,12",
    "price": "360,6",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Prime Strong, 145*210, чорний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77002_8507-27-01-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77002_8507-27-01-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77002_8507-27-01-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77002_8507-27-01-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77002_8507-27-01-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77002_8507-27-01-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8532-27-1-a",
    "barcode": "4,06328E+12",
    "pr": "192,76",
    "price": "363,7",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Daily Shine, 125*195, Keep moving",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77040_8532-27-1-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77040_8532-27-1-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77040_8532-27-1-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77040_8532-27-1-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77040_8532-27-1-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77040_8532-27-1-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8532-27-4-a",
    "barcode": "4,06328E+12",
    "pr": "192,76",
    "price": "363,7",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Daily Shine, 125*195, Embrace challenges",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77043_8532-27-4-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77043_8532-27-4-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77043_8532-27-4-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77043_8532-27-4-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77043_8532-27-4-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77043_8532-27-4-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8532-27-2-a",
    "barcode": "4,06328E+12",
    "pr": "192,76",
    "price": "363,7",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Daily Shine, 125*195, Professional overthinker",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77041_8532-27-2-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77041_8532-27-2-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77041_8532-27-2-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77041_8532-27-2-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77041_8532-27-2-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77041_8532-27-2-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8532-27-3-a",
    "barcode": "4,06328E+12",
    "pr": "192,76",
    "price": "363,7",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Daily Shine, 125*195, Serious staff",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77042_8532-27-3-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77042_8532-27-3-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77042_8532-27-3-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77042_8532-27-3-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77042_8532-27-3-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77042_8532-27-3-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8528-27-6-a",
    "barcode": "4,06328E+12",
    "pr": "216,88",
    "price": "409,2",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Mellow, 125*195, Plans with personality",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77033_8528-27-6-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77033_8528-27-6-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77033_8528-27-6-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77033_8528-27-6-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77033_8528-27-6-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77033_8528-27-6-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8537-27-5-a",
    "barcode": "4,06328E+12",
    "pr": "192,76",
    "price": "363,7",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Soft Cloud, 125*195, блакитний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77038_8537-27-5-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77038_8537-27-5-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77038_8537-27-5-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77038_8537-27-5-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77038_8537-27-5-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77038_8537-27-5-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8537-27-6-a",
    "barcode": "4,06328E+12",
    "pr": "192,76",
    "price": "363,7",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Soft Cloud, 125*195, бузковий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77039_8537-27-6-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77039_8537-27-6-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77039_8537-27-6-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77039_8537-27-6-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77039_8537-27-6-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77039_8537-27-6-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8537-27-1-a",
    "barcode": "4,06328E+12",
    "pr": "192,76",
    "price": "363,7",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Soft Cloud, 125*195, коричневий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77034_8537-27-1-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77034_8537-27-1-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77034_8537-27-1-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77034_8537-27-1-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77034_8537-27-1-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77034_8537-27-1-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8537-27-4-a",
    "barcode": "4,06328E+12",
    "pr": "192,76",
    "price": "363,7",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Soft Cloud, 125*195, салатовий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77037_8537-27-4-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77037_8537-27-4-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77037_8537-27-4-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77037_8537-27-4-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77037_8537-27-4-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77037_8537-27-4-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8537-27-2-a",
    "barcode": "4,06328E+12",
    "pr": "192,76",
    "price": "363,7",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Soft Cloud, 125*195, сірий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77035_8537-27-2-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77035_8537-27-2-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77035_8537-27-2-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77035_8537-27-2-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77035_8537-27-2-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77035_8537-27-2-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "8537-27-3-a",
    "barcode": "4,06328E+12",
    "pr": "192,76",
    "price": "363,7",
    "brand": "AXENT",
    "name": "Щотижневик 2027 Partner Soft Cloud, 125*195, смарагдовий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/77036_8537-27-3-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77036_8537-27-3-A_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77036_8537-27-3-A_03.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77036_8537-27-3-A_04.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77036_8537-27-3-A_05.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/77036_8537-27-3-A_06.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-50-707",
    "barcode": "",
    "pr": "1641,94",
    "price": "3098",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт LaFontaine слп/т коньячний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77136_73-795-50-707_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77136_73-795-50-707_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77136_73-795-50-707_03.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-30-297",
    "barcode": "",
    "pr": "421,03",
    "price": "794,4",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт Linetta бордовий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77140_73-795-30-297_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77140_73-795-30-297_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77140_73-795-30-297_03.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-30-507",
    "barcode": "",
    "pr": "421,03",
    "price": "794,4",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт Linetta зелений",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77139_73-795-30-507_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77139_73-795-30-507_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77139_73-795-30-507_03.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-30-407",
    "barcode": "",
    "pr": "421,03",
    "price": "794,4",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт Linetta помаранчевий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77137_73-795-30-407_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77137_73-795-30-407_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77137_73-795-30-407_03.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-30-307",
    "barcode": "",
    "pr": "421,03",
    "price": "794,4",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт Linetta синій",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77138_73-795-30-307_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77138_73-795-30-307_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77138_73-795-30-307_03.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-60-507",
    "barcode": "",
    "pr": "349,85",
    "price": "660,1",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт Miradur з/т зелений",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77115_73-795-60-507_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77115_73-795-60-507_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77115_73-795-60-507_03.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-60-207",
    "barcode": "",
    "pr": "349,85",
    "price": "660,1",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт Miradur з/т червоний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77117_73-795-60-207_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77117_73-795-60-207_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77117_73-795-60-207_03.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-60-307",
    "barcode": "",
    "pr": "349,85",
    "price": "660,1",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт Miradur с/т синій",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77118_73-795-60-307_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77118_73-795-60-307_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77118_73-795-60-307_03.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-60-907",
    "barcode": "",
    "pr": "349,85",
    "price": "660,1",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт Miradur с/т чорний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77119_73-795-60-907_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77119_73-795-60-907_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77119_73-795-60-907_03.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-31-907",
    "barcode": "",
    "pr": "546,96",
    "price": "1032",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт Soft Carbon чорний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77135_73-795-31-907_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77135_73-795-31-907_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77135_73-795-31-907_03.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-36-707",
    "barcode": "",
    "pr": "546,96",
    "price": "1032",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт Soft з/т коричневий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77131_73-795-36-707_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77131_73-795-36-707_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77131_73-795-36-707_03.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-36-307",
    "barcode": "",
    "pr": "546,96",
    "price": "1032",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт Soft ср/т синiй",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77132_73-795-36-307_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77132_73-795-36-307_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77132_73-795-36-307_03.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-36-907",
    "barcode": "",
    "pr": "546,96",
    "price": "1032",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт Soft ср/т чорний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77133_73-795-36-907_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77133_73-795-36-907_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77133_73-795-36-907_03.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-38-937",
    "barcode": "",
    "pr": "404,6",
    "price": "763,4",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт Torino Metallic слп/т коричневий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77130_73-795-38-937_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77130_73-795-38-937_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77130_73-795-38-937_03.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-38-927",
    "barcode": "",
    "pr": "404,6",
    "price": "763,4",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт Torino Metallic слп/т сірий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77129_73-795-38-927_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77129_73-795-38-927_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77129_73-795-38-927_03.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-38-847",
    "barcode": "",
    "pr": "404,6",
    "price": "763,4",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт Torino Metallic слп/т чорний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77128_73-795-38-847_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77128_73-795-38-847_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77128_73-795-38-847_03.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-38-567",
    "barcode": "",
    "pr": "382,72",
    "price": "722,1",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт Torino слп/т cвітло-оливковий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77127_73-795-38-567_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77127_73-795-38-567_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77127_73-795-38-567_03.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-38-507",
    "barcode": "4,06195E+12",
    "pr": "382,72",
    "price": "722,1",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт Torino слп/т зелений",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77120_73-795-38-507_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77120_73-795-38-507_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77120_73-795-38-507_03.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-38-407",
    "barcode": "",
    "pr": "382,72",
    "price": "722,1",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт Torino слп/т помаранчевий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77125_73-795-38-407_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77125_73-795-38-407_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77125_73-795-38-407_03.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-38-307",
    "barcode": "4,06195E+12",
    "pr": "382,72",
    "price": "722,1",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт Torino слп/т синiй",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77122_73-795-38-307_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77122_73-795-38-307_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77122_73-795-38-307_03.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-38-857",
    "barcode": "",
    "pr": "382,72",
    "price": "722,1",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт Torino слп/т темно-бежевий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77126_73-795-38-857_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77126_73-795-38-857_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77126_73-795-38-857_03.jpg",
    "qual": "0"
  },
  {
    "art": "73-795-38-907",
    "barcode": "",
    "pr": "382,72",
    "price": "722,1",
    "brand": "BRUNNEN ДК",
    "name": "Щоденник 2027 Стандарт Torino слп/т чорний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Brunnen/77124_73-795-38-907_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77124_73-795-38-907_02.jpg, https://ftplk.vivat.cn.ua/LKImages/Brunnen/77124_73-795-38-907_03.jpg",
    "qual": "0"
  }
];

export default async function handler(req, res) {
  const { id } = req.query;

  // Отримуємо конфіг клієнта
  const clientConfig = CLIENTS_CONFIG[id] || CLIENTS_CONFIG['default'];

  // Обробка товарів
  const sanitizedProducts = PRODUCTS_DATA.map(item => {
    const qty = parseInt(item.qual) || 0;
    const isOnOrder = qty === 0;

    // Вибираємо потрібну націнку залежно від статусу товару
    const currentMargin = isOnOrder ? clientConfig.marginOrder : clientConfig.marginStock;

    // Парсимо закупівельну ціну
    const basePurchasePrice = parseFloat(String(item.pr).replace(',', '.'));
    
    // Розраховуємо ціну з відповідною націнкою
    const calculatedPrice = basePurchasePrice * (1 + currentMargin / 100);
    const finalClientPrice = clientConfig.round ? Math.round(calculatedPrice) : parseFloat(calculatedPrice.toFixed(2));

    return {
      art: item.art,
      barcode: item.barcode,
      name: item.name,
      brand: item.brand,
      price: finalClientPrice, // Тільки фінальна розрахована ціна
      photo: item.photo,
      qual: qty,
      is_order: isOnOrder
    };
  });

  return res.status(200).json({
    clientName: clientConfig.name,
    products: sanitizedProducts
  });
}