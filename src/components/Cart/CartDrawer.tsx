import { useEffect, useRef, useState } from "react";
import { candles } from "../../data/candles";
import type { CartLine } from "../../types/Candle";
import { formatCurrency } from "../../utils/formatCurrency";
import "./CartDrawer.css";

type CartDrawerProps = {
  isOpen: boolean;
  lines: CartLine[];
  onClose: () => void;
  onSetQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
};

// Panel lateral modal que resuelve las líneas del carrito contra el catálogo compartido.
export default function CartDrawer({
  isOpen,
  lines,
  onClose,
  onSetQuantity,
  onRemove,
}: CartDrawerProps) {
  // El diálogo nativo gestiona foco y modal; el mensaje de pago solo informa que es un prototipo.
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  useEffect(() => {
    // Sincroniza la visibilidad del diálogo con el estado isOpen controlado por App.
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
    if (!isOpen) setCheckoutMessage("");
  }, [isOpen]);

  // Enlaza cada id guardado en App con sus datos de producto y calcula el subtotal visible.
  const cartItems = lines.flatMap((line) => {
    const candle = candles.find((item) => item.id === line.productId);
    return candle ? [{ candle, quantity: line.quantity }] : [];
  });
  const total = cartItems.reduce(
    (sum, item) => sum + item.candle.price * item.quantity,
    0,
  );

  return (
    <dialog
      className="cart-dialog"
      ref={dialogRef}
      aria-labelledby="cart-title"
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
        // Solo cerrar al pulsar el telón exterior, no al interactuar con el panel.
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="cart-panel">
        <div className="cart-header">
          <div>
            <p className="eyebrow">Tu selección</p>
            <h2 id="cart-title">Carrito</h2>
          </div>
          <button
            className="dialog-close"
            type="button"
            aria-label="Cerrar carrito"
            onClick={onClose}
            autoFocus
          >
            ×
          </button>
        </div>

        {cartItems.length ? (
          <>
            <ul className="cart-items">
              {cartItems.map(({ candle, quantity }) => (
                <li className="cart-item" key={candle.id}>
                  <span className="cart-item-art" aria-hidden="true">
                    <span className={`product-candle ${candle.variant}`}>
                      <span>
                        <strong>LUMÉRE</strong>
                        <small>{candle.name}</small>
                      </span>
                    </span>
                  </span>
                  <div className="cart-item-info">
                    <h3>{candle.name}</h3>
                    <p>{formatCurrency(candle.price)}</p>
                    <div className="cart-item-actions">
                      <div className="quantity-control" aria-label={`Cantidad de ${candle.name}`}>
                        <button
                          type="button"
                          aria-label={`Restar una ${candle.name}`}
                          disabled={quantity <= 1}
                          onClick={() => onSetQuantity(candle.id, quantity - 1)}
                        >
                          −
                        </button>
                        <span>{quantity}</span>
                        <button
                          type="button"
                          aria-label={`Agregar una ${candle.name}`}
                          onClick={() => onSetQuantity(candle.id, quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="cart-remove"
                        type="button"
                        onClick={() => onRemove(candle.id)}
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                  <strong className="cart-item-subtotal">
                    {formatCurrency(candle.price * quantity)}
                  </strong>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
              <p><span>Subtotal</span><strong>{formatCurrency(total)}</strong></p>
              <small>Envío e impuestos se calculan al confirmar.</small>
              <button
                className="btn cart-checkout"
                type="button"
                onClick={() => setCheckoutMessage("Prototipo: el pago se habilitará al conectar una pasarela de pago.")}
              >
                Continuar compra
              </button>
              {checkoutMessage && (
                <p className="cart-checkout-message" role="status">{checkoutMessage}</p>
              )}
            </div>
          </>
        ) : (
          <div className="cart-empty">
            <span aria-hidden="true">✦</span>
            <h3>Tu carrito está esperando un aroma.</h3>
            <p>Explora la colección y encuentra una vela para tu espacio.</p>
            <button className="btn" type="button" onClick={onClose}>
              Seguir explorando
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
