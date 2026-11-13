import { useState } from "react";
import "./Header.css";

type HeaderProps = {
  isDark: boolean;
  onToggleTheme: () => void;
  cartCount: number;
  onOpenCart: () => void;
};

// Navegación principal: recibe del padre los datos del carrito y las acciones del tema y del panel.
export default function Header({
  isDark,
  onToggleTheme,
  cartCount,
  onOpenCart,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav">
        <a className="logo" href="#" aria-label="Lumére, inicio">
          <span className="logo-mark" aria-hidden="true">
            <img
              src={isDark
                ? "/images/images/png/Lumereblanco.png"
                : "/images/images/png/Lumerenegro.png"}
              alt=""
            />
          </span>
          LUMÉRE
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {isMenuOpen ? (
              <path d="m6 6 12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
        <nav
          className={`nav-links${isMenuOpen ? " is-open" : ""}`}
          id="primary-navigation"
          aria-label="Principal"
        >
          <a href="#productos" onClick={() => setIsMenuOpen(false)}>Productos</a>
          <a href="#coleccion" onClick={() => setIsMenuOpen(false)}>La esencia</a>
          <a href="#historia" onClick={() => setIsMenuOpen(false)}>Opiniones</a>
          <a href="/login" onClick={() => setIsMenuOpen(false)}>Iniciar sesión</a>
          <a className="btn" href="#productos" onClick={() => setIsMenuOpen(false)}>
            Ver la colección
          </a>
        </nav>
        <div className="nav-tools">
          {/* El botón abre el carrito controlado por App y el otro cambia el tema. */}
          <button
            className="cart-trigger"
            type="button"
            aria-label={`Abrir carrito${cartCount ? `, ${cartCount} productos` : ""}`}
            onClick={onOpenCart}
          >
            <span aria-hidden="true">♧</span>
            <span className="cart-trigger-label">Carrito</span>
            <span className="cart-count" aria-live="polite">{cartCount}</span>
          </button>
          <button
            className="theme-toggle"
            type="button"
            aria-label="Cambiar tema claro u oscuro"
            aria-pressed={isDark}
            onClick={onToggleTheme}
          >
            ◐
          </button>
        </div>
      </div>
    </header>
  );
}
