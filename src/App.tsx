import { useEffect, useState } from "react";
import CartDrawer from "./components/Cart/CartDrawer";
import Account from "./components/Account/Account";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import ProductCarousel from "./components/ProductCarousel/ProductCarousel";
import ProductCatalog from "./components/ProductCatalog/ProductCatalog";
import Features from "./components/Features/Features";
import Story from "./components/Story/Story";
import Signup from "./components/Signup/Signup";
import { useCandlelightScroll } from "./hooks/useCandlelightScroll";
import { useTheme } from "./hooks/useTheme";
import type { Candle, CartLine } from "./types/Candle";
import { formatCurrency } from "./utils/formatCurrency";

// Ensambla las secciones de la tienda y coordina el estado compartido del carrito y del tema.
export default function App() {
  // El tema y el efecto visual de vela se controlan mediante hooks reutilizables.
  const { isDark, toggleTheme } = useTheme();
  useCandlelightScroll();

  // Estado global del carrito: líneas de productos, panel visible y aviso temporal de confirmación.
  const [cartLines, setCartLines] = useState<CartLine[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState("");
  // La insignia del encabezado suma unidades, no tipos distintos de producto.
  const cartCount = cartLines.reduce((sum, line) => sum + line.quantity, 0);

  useEffect(() => {
    if (!notification) return;
    // Oculta el aviso después de cuatro segundos y cancela el temporizador si cambia antes.
    const timeout = window.setTimeout(() => setNotification(""), 4000);
    return () => window.clearTimeout(timeout);
  }, [notification]);

  // Agrega una nueva línea o acumula la cantidad si ese producto ya estaba en el carrito.
  const addToCart = (candle: Candle, quantity: number) => {
    setCartLines((current) => {
      const existingLine = current.find((line) => line.productId === candle.id);
      if (existingLine) {
        return current.map((line) =>
          line.productId === candle.id
            ? { ...line, quantity: line.quantity + quantity }
            : line,
        );
      }
      return [...current, { productId: candle.id, quantity }];
    });
    setNotification(
      `${quantity} ${quantity === 1 ? "unidad añadida" : "unidades añadidas"}: ${candle.name} · ${formatCurrency(candle.price * quantity)}`,
    );
  };

  // Actualiza la cantidad desde el panel, manteniendo al menos una unidad por línea.
  const setCartQuantity = (productId: string, quantity: number) => {
    setCartLines((current) =>
      current.map((line) =>
        line.productId === productId
          ? { ...line, quantity: Math.max(1, quantity) }
          : line,
      ),
    );
  };

  return (
    <>
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />
      <main>
        {/* Las secciones principales reciben únicamente las acciones o datos que necesitan. */}
        <Hero />
        <ProductCatalog onAddToCart={addToCart} />
        <ProductCarousel />
        <Features />
        <Story />
        <Account />
        <Signup />
      </main>
      <Footer />
      {/* El contenedor conserva la autoridad sobre las líneas; el cajón solo emite acciones. */}
      <CartDrawer
        isOpen={isCartOpen}
        lines={cartLines}
        onClose={() => setIsCartOpen(false)}
        onSetQuantity={setCartQuantity}
        onRemove={(productId) =>
          setCartLines((current) =>
            current.filter((line) => line.productId !== productId),
          )
        }
      />
      {notification && (
        /* El aviso permite abrir el carrito o descartarse sin cambiar la selección actual. */
        <div className="cart-toast" role="status" aria-live="polite">
          <button
            className="cart-toast-action"
            type="button"
            aria-label={`${notification}. Ver carrito`}
            onClick={() => {
              setNotification("");
              setIsCartOpen(true);
            }}
          >
            <span className="cart-toast-check" aria-hidden="true">✓</span>
            <span className="cart-toast-copy">
              <span>{notification}</span>
              <strong>Ver carrito <span aria-hidden="true">→</span></strong>
            </span>
          </button>
          <button
            className="cart-toast-dismiss"
            type="button"
            aria-label="Cerrar notificación"
            onClick={() => setNotification("")}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
