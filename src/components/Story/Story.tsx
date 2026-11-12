import "./Story.css";

// Bloque editorial con una reseña destacada que conecta el catálogo con la historia de marca.
export default function Story() {
  return (
    <section className="story" id="historia">
      <div className="container">
        <figure className="quote">
          <div className="quote-mark" aria-hidden="true">
            “
          </div>
          <blockquote>
            “La enciendo al final del día y la casa entera parece bajar un
            cambio.”
          </blockquote>
          <figcaption>Louie W. · Ritual de todos los días</figcaption>
        </figure>
      </div>
    </section>
  );
}
