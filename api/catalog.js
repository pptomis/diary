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
    "art": "8842-27-1-A",
    "barcode": "4063280000000",
    "pr": "147,876",
    "price": "279",
    "brand": "Axent",
    "name": "Щоденник 2027 Classic City, 145*210, с/т чорний",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76858_8842-27-1-A_01.jpg, https://ftplk.vivat.cn.ua/LKImages/Axent/76858_8842-27-1-A_02.jpg",
    "qual": "5"
  },
  {
    "art": "8844-27-4-A",
    "barcode": "4063280000000",
    "pr": "202,62",
    "price": "382,3",
    "brand": "Axent",
    "name": "Щоденник 2027 Classic Lux, 145*210, слп/т коричневий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76874_8844-27-4-A_01.jpg",
    "qual": "2"
  },
  {
    "art": "8899-27-CUSTOM",
    "barcode": "4063280000000",
    "pr": "420,00",
    "price": "750",
    "brand": "Axent",
    "name": "Щоденник 2027 Premium Executive, 145*210, шкіра бордовий",
    "photo": "https://ftplk.vivat.cn.ua/LKImages/Axent/76855_8840-27-3-A_01.jpg",
    "qual": "0" // Під замовлення (qual = 0)
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