import "./Features.css";

// Contenido descriptivo de los tres atributos mostrados en la sección de colección.
const features = [
  {
    title: "Cera de origen vegetal",
    description:
      "Una mezcla de soja y coco que ofrece una combustión limpia y pareja, hasta el último momento.",
  },
  {
    title: "Aromas con intención",
    description:
      "Notas cálidas de madera, flores y especias, elegidas para crear atmósferas que se sienten tuyas.",
  },
  {
    title: "Hechas a mano, cerca",
    description:
      "Vertidas en pequeños lotes y presentadas en recipientes que merecen una segunda vida.",
  },
];

// Presenta las características como tarjetas numeradas a partir del arreglo anterior.
export default function Features() {
  return (
    <section className="collection" id="coleccion">
      <div className="container">
        <div className="section-head">
          <h2>Una luz hecha para acompañarte.</h2>
          <p className="section-descriptor">Pequeños detalles, otra forma de sentir</p>
          <p>
            Creamos cada vela con ingredientes de origen vegetal y fragancias
            que invitan a bajar el ritmo.
          </p>
        </div>
        <div className="features">
          {features.map((feature, index) => (
            <article className="feature" key={feature.title}>
              <span className="feature-mark" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
