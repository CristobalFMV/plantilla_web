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
  return (
    <header className="site-header">
      <div className="container nav">
        <a className="logo" href="#" aria-label="Lumére, inicio">
          LUMÉRE
        </a>
        <nav className="nav-links" aria-label="Principal">
          {/* Los enlaces apuntan a secciones de la página y el botón abre el carrito controlado por App. */}
          <a href="#productos">Productos</a>
          <a href="#coleccion">La esencia</a>
          <a href="#historia">Opiniones</a>
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
          <a className="btn" href="#empezar">
            Encuentra tu aroma
          </a>
          <button
            className="theme-toggle"
            type="button"
            aria-label="Cambiar tema claro u oscuro"
            aria-pressed={isDark}
            onClick={onToggleTheme}
          >
            ◐
          </button>
        </nav>
      </div>
    </header>
  );
}
