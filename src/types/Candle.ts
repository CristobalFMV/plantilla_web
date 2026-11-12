// Contrato de un producto: lo consumen el catálogo, las fichas y las operaciones del carrito.
export type Candle = {
  id: string;
  name: string;
  fragrance: string;
  // Valores restringidos mantienen consistentes las opciones que usa la interfaz para filtrar y pintar.
  fragranceFamily: "Amaderada" | "Dulce" | "Floral" | "Cítrica" | "Herbal";
  price: number;
  category: "Vela clásica" | "Edición especial" | "Set de regalo";
  variant: "neutral" | "amber" | "sage" | "rose";
  size: string;
  burnTime: string;
  details: string;
};

// El carrito guarda referencias al catálogo por id y la cantidad elegida, no copias del producto.
export type CartLine = {
  productId: string;
  quantity: number;
};
