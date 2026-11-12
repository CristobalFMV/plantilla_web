// Comparte el formato de precios en CLP entre catálogo, modal, avisos y carrito.
const clpFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

// Convierte un importe numérico en una cadena monetaria localizada para Chile.
export function formatCurrency(amount: number) {
  return clpFormatter.format(amount);
}
