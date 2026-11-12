import "./Hero.css";

// Presentación inicial de la marca con enlaces de acción hacia la colección y la historia.
export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">Velas artesanales · Hechas con calma</p>
          <h1>
            Enciende un momento <span>para ti.</span>
          </h1>
          <p className="hero-copy">
            Cera vegetal, aromas honestos y una luz suave para hacer de lo
            cotidiano tu ritual favorito.
          </p>
          <div className="hero-actions">
            <a className="btn" href="#coleccion">
              Descubre nuestra esencia
            </a>
            <a className="btn btn-ghost" href="#historia">
              Conoce Lumére
            </a>
          </div>
          <p className="hero-note">
            <span aria-hidden="true">✦</span> Vertidas a mano en pequeños lotes
          </p>
        </div>
        {/* La vela se ilustra con elementos HTML y CSS, sin depender de una imagen externa. */}
        <div
          className="candle-scene"
          role="img"
          aria-label="Ilustración de una vela Lumére encendida en un recipiente color arena"
        >
          <div className="candle">
            <span className="wick">
              <span className="flame" />
            </span>
            <div className="candle-label">
              <strong>LUMÉRE</strong>
              <small>luz de hogar</small>
            </div>
          </div>
          <span className="scene-caption">Un respiro, en casa.</span>
        </div>
      </div>
    </section>
  );
}
