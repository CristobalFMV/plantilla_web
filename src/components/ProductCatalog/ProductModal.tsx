import { useEffect, useRef, useState } from "react";
import type { Candle } from "../../types/Candle";
import { formatCurrency } from "../../utils/formatCurrency";
import "./ProductModal.css";

type ProductModalProps = {
  candle: Candle | null;
  onClose: () => void;
  onAddToCart: (candle: Candle, quantity: number) => void;
};

// Muestra detalles del producto y devuelve la cantidad seleccionada al catálogo.
export default function ProductModal({
  candle,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  // El ref permite controlar el elemento <dialog> nativo y quantity se reinicia al cambiar de producto.
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Sincroniza la apertura/cierre nativos con candle, que es controlado por ProductCatalog.
    setQuantity(1);
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (candle && !dialog.open) dialog.showModal();
    if (!candle && dialog.open) dialog.close();
  }, [candle]);

  return (
    <dialog
      className="product-dialog"
      ref={dialogRef}
      aria-labelledby="product-dialog-title"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
        }
      }}
      onClick={(event) => {
        // Un clic en el fondo cierra el modal; los clics dentro del contenido se conservan.
        if (event.target === dialogRef.current) onClose();
      }}
    >
      {candle && (
        <div className="product-dialog-content">
          <button
            className="dialog-close"
            type="button"
            aria-label="Cerrar detalles"
            onClick={onClose}
            autoFocus
          >
            ×
          </button>
          <div className="product-dialog-art" aria-hidden="true">
            <span className={`product-candle ${candle.variant}`}>
              <span>
                <strong>LUMÉRE</strong>
                <small>{candle.name}</small>
              </span>
            </span>
          </div>
          <div className="product-dialog-info">
            <p className="eyebrow">{candle.category} · {candle.fragranceFamily}</p>
            <h2 id="product-dialog-title">{candle.name}</h2>
            <p className="product-dialog-description">{candle.details}</p>
            <p className="product-dialog-fragrance">
              <strong>Notas aromáticas:</strong> {candle.fragrance}
            </p>
            <div className="product-specs">
              <span><strong>Tamaño</strong>{candle.size}</span>
              <span><strong>Duración</strong>{candle.burnTime}</span>
              <span><strong>Cera</strong>Vegetal de soja y coco</span>
            </div>
            <div className="product-dialog-buy">
              <strong className="product-dialog-price">{formatCurrency(candle.price)}</strong>
              <div className="quantity-control" aria-label="Cantidad">
                <button
                  type="button"
                  aria-label="Restar una unidad"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                >
                  −
                </button>
                <span aria-live="polite">{quantity}</span>
                <button
                  type="button"
                  aria-label="Agregar una unidad"
                  onClick={() => setQuantity((current) => current + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="btn add-to-cart-button"
                type="button"
                onClick={() => onAddToCart(candle, quantity)}
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
