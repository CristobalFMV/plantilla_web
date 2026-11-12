import type { Candle } from "../types/Candle";

// Catálogo que alimenta las tarjetas, filtros, fichas de producto y el carrito de compras.
// Cada registro satisface Candle, por lo que las pantallas comparten una única fuente de datos.
export const candles: Candle[] = [
  {
    id: "bosque",
    name: "Bosque",
    fragrance: "Cedro, sándalo y una nota de musgo fresco.",
    fragranceFamily: "Amaderada",
    price: 18900,
    category: "Vela clásica",
    variant: "neutral",
    size: "220 g",
    burnTime: "45 horas",
    details:
      "Un paseo entre árboles después de la lluvia. Maderas suaves y musgo verde para crear un refugio sereno.",
  },
  {
    id: "ambar",
    name: "Ámbar",
    fragrance: "Vainilla suave, ámbar y especias cálidas.",
    fragranceFamily: "Dulce",
    price: 18900,
    category: "Vela clásica",
    variant: "amber",
    size: "220 g",
    burnTime: "45 horas",
    details:
      "Una mezcla envolvente de vainilla, resina de ámbar y especias que llena la casa de calidez.",
  },
  {
    id: "jardin",
    name: "Jardín",
    fragrance: "Hojas verdes, bergamota y flores blancas.",
    fragranceFamily: "Floral",
    price: 18900,
    category: "Vela clásica",
    variant: "sage",
    size: "220 g",
    burnTime: "45 horas",
    details:
      "Notas florales limpias y verdes que recuerdan a una mañana tranquila entre plantas.",
  },
  {
    id: "atardecer",
    name: "Atardecer",
    fragrance: "Rosa, naranja dulce y un toque de madera.",
    fragranceFamily: "Cítrica",
    price: 18900,
    category: "Edición especial",
    variant: "rose",
    size: "220 g",
    burnTime: "45 horas",
    details:
      "La frescura de la naranja se encuentra con la suavidad de la rosa en una fragancia luminosa.",
  },
  {
    id: "lavanda",
    name: "Lavanda",
    fragrance: "Lavanda, salvia y hierbas aromáticas.",
    fragranceFamily: "Herbal",
    price: 16900,
    category: "Vela clásica",
    variant: "sage",
    size: "180 g",
    burnTime: "38 horas",
    details:
      "Un aroma herbal y descansado, ideal para acompañar una pausa antes de dormir.",
  },
  {
    id: "canela",
    name: "Canela & Higo",
    fragrance: "Higo maduro, canela y azúcar tostada.",
    fragranceFamily: "Dulce",
    price: 21900,
    category: "Edición especial",
    variant: "amber",
    size: "260 g",
    burnTime: "52 horas",
    details:
      "Fruta madura y especias suaves en una edición acogedora para las tardes frescas.",
  },
  {
    id: "citrus",
    name: "Cítrico Solar",
    fragrance: "Mandarina, limón y hojas de petitgrain.",
    fragranceFamily: "Cítrica",
    price: 16900,
    category: "Vela clásica",
    variant: "rose",
    size: "180 g",
    burnTime: "38 horas",
    details:
      "Un comienzo chispeante y fresco que llena tus espacios de energía y luz.",
  },
  {
    id: "ritual",
    name: "Ritual de Calma",
    fragrance: "Bosque, lavanda y una vela Ámbar en caja de regalo.",
    fragranceFamily: "Amaderada",
    price: 34900,
    category: "Set de regalo",
    variant: "neutral",
    size: "2 × 180 g",
    burnTime: "Hasta 76 horas",
    details:
      "Dos aromas complementarios en una caja lista para regalar, con una tarjeta para dedicar.",
  },
];
