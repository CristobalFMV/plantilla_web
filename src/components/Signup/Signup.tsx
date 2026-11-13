import { useState, type FormEvent } from "react";
import "./Signup.css";

// Formulario de novedades de demostración: valida el correo y muestra un estado accesible.
export default function Signup() {
  // El estado de mensaje y error controla la respuesta anunciada debajo del formulario.
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  // Evita la navegación del formulario y valida localmente; no envía datos a un servidor.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    setHasError(!isValid);
    setMessage(
      isValid
        ? `Gracias. Pronto recibirás novedades de Lumére en ${email}.`
        : "Escribe un correo válido, por ejemplo nombre@correo.com.",
    );
  };

  return (
    <section className="cta" id="empezar">
      <div className="container">
        <h2>Que la calma encuentre su lugar.</h2>
        <p className="eyebrow">Un momento solo para ti</p>
        <p>
          Déjanos tu correo y recibe novedades, aromas de temporada y un
          detalle de bienvenida.
        </p>
        <form className="signup" onSubmit={handleSubmit} noValidate>
          {/* La etiqueta visualmente oculta mantiene un nombre accesible para el campo de correo. */}
          <label htmlFor="email" className="sr-only">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="tu@correo.com"
            autoComplete="email"
            required
          />
          <button className="btn" type="submit">
            Quiero recibir novedades
          </button>
        </form>
        <p
          className="form-msg"
          data-status={hasError ? "error" : "success"}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      </div>
    </section>
  );
}
