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
            <a className="btn" href="#productos">
              Encuentra tu aroma
            </a>
            <a className="btn btn-ghost" href="#historia">
              Conoce Lumére
            </a>
          </div>
          <p className="hero-note">
            <span aria-hidden="true">✦</span> Vertidas a mano en pequeños lotes
          </p>
        </div>
        <div className="hero-photo">
          <img
            src="/images/images/velas3.jpeg"
            alt="Velas Lumére en recipientes de vidrio junto a tapas de madera"
          />
        </div>
      </div>
    </section>
  );
}
