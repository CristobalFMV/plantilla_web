import { useEffect, useState, type KeyboardEvent } from "react";
import "./ProductCarousel.css";

const slides = [
  // Contenido e imágenes del carrusel; la ruta corresponde a un recurso servido desde /public.
  {
    name: "Bosque",
    category: "Amaderada · Cedro y musgo",
    message: "Un refugio entre árboles, a un solo respiro.",
    image: "/images/candles/bosque.svg",
    alt: "Vela Bosque junto a ramas de cedro y hojas de musgo",
  },
  {
    name: "Ámbar",
    category: "Dulce · Vainilla y especias",
    message: "La calidez de volver a casa.",
    image: "/images/candles/ambar.svg",
    alt: "Vela Ámbar rodeada de tonos cálidos y especias",
  },
  {
    name: "Jardín",
    category: "Floral · Bergamota y flores blancas",
    message: "Deja que la calma florezca en tu espacio.",
    image: "/images/candles/jardin.svg",
    alt: "Vela Jardín entre hojas verdes y flores blancas",
  },
  {
    name: "Atardecer",
    category: "Cítrica · Rosa y naranja",
    message: "Una luz dorada para cerrar el día.",
    image: "/images/candles/atardecer.svg",
    alt: "Vela Atardecer con cítricos y flores en luz cálida",
  },
];

// Presenta aromas destacados con controles manuales, teclado y avance automático accesible.
export default function ProductCarousel() {
  // El índice selecciona la diapositiva; las pausas evitan cambios inesperados al interactuar.
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isFocusPaused, setIsFocusPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const shouldPause = isPaused || isHoverPaused || isFocusPaused || prefersReducedMotion;
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    // Si cambia la preferencia de movimiento del sistema, sincroniza la pausa automática.
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(preference.matches);
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    // Avanza una diapositiva cada diez segundos solo cuando el usuario puede observarla.
    if (shouldPause) return;
    const timeout = window.setTimeout(
      () => setActiveIndex((index) => (index + 1) % slides.length),
      10_000,
    );
    return () => window.clearTimeout(timeout);
  }, [activeIndex, shouldPause]);

  // Envuelve el índice para que el carrusel continúe al llegar a cualquiera de los extremos.
  const showSlide = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  // Permite cambiar de diapositiva con las flechas mientras el foco está en el carrusel.
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(activeIndex - 1);
    }
  };

  return (
    <section className="products-carousel" aria-label="Aromas de Lumére">
      {/* Pausa el temporizador mientras se apunta o navega por los controles. */}
      <div
        className="container"
        onPointerEnter={() => setIsHoverPaused(true)}
        onPointerLeave={() => setIsHoverPaused(false)}
        onFocusCapture={() => setIsFocusPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsFocusPaused(false);
          }
        }}
        onKeyDown={handleKeyDown}
      >
        <div className="image-carousel" aria-roledescription="carrusel">
          <img
            key={activeSlide.image}
            className="image-carousel-art"
            src={activeSlide.image}
            alt={activeSlide.alt}
            decoding="async"
          />
          <div className="image-carousel-shade" aria-hidden="true" />
          <div className="image-carousel-caption" aria-live="polite">
            <p className="image-carousel-category">{activeSlide.category}</p>
            <h2>{activeSlide.name}</h2>
            <p className="image-carousel-message">{activeSlide.message}</p>
          </div>
          <div className="image-carousel-controls">
            <button
              className="carousel-button"
              type="button"
              aria-label="Imagen anterior"
              onClick={() => showSlide(activeIndex - 1)}
            >
              ‹
            </button>
            <button
              className="carousel-button"
              type="button"
              aria-label="Imagen siguiente"
              onClick={() => showSlide(activeIndex + 1)}
            >
              ›
            </button>
          </div>
          <div className="image-carousel-footer">
            <div className="carousel-indicators" aria-label="Elegir imagen">
              {slides.map((slide, index) => (
                <button
                  className={`carousel-indicator${index === activeIndex ? " is-active" : ""}`}
                  key={slide.name}
                  type="button"
                  aria-label={`Mostrar vela ${slide.name}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={() => showSlide(index)}
                />
              ))}
            </div>
            <button
              className="carousel-autoplay"
              type="button"
              aria-label={isPaused ? "Reanudar cambio automático" : "Pausar cambio automático"}
              aria-pressed={isPaused}
              onClick={() => setIsPaused((paused) => !paused)}
            >
              {shouldPause ? "Reanudar" : "Pausar"}
            </button>
            <span className="carousel-position">
              {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
