import { useState, type FormEvent } from "react";
import { useTheme } from "../../hooks/useTheme";
import "./LoginPage.css";

// Página independiente de acceso; la autenticación real aún no está conectada.
export default function LoginPage() {
  const { isDark, toggleTheme } = useTheme();
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(
      "Vista previa: el acceso no está conectado; tus datos no se verificaron, guardaron ni enviaron.",
    );
    event.currentTarget.reset();
  };

  return (
    <main className="login-page">
      <section className="login-visual" aria-label="El universo Lumére">
        <img
          src="/images/images/velas3.jpeg"
          alt=""
          aria-hidden="true"
        />
        <div className="login-visual-copy">
          <p>Un momento para volver a ti.</p>
          <span>Elige tu aroma. Enciende tu ritual.</span>
        </div>
      </section>

      <section className="login-content" aria-labelledby="login-title">
        <header className="login-header">
          <a className="login-logo" href="/" aria-label="Lumére, volver al inicio">
            <img
              src={isDark
                ? "/images/images/png/Lumereblanco.png"
                : "/images/images/png/Lumerenegro.png"}
              alt=""
            />
            <span>LUMÉRE</span>
          </a>
          <button
            className="theme-toggle"
            type="button"
            aria-label="Cambiar tema claro u oscuro"
            aria-pressed={isDark}
            onClick={toggleTheme}
          >
            ◐
          </button>
        </header>

        <div className="login-main">
          <div className="login-form-panel">
            <h1 id="login-title">Qué bueno verte.</h1>
            <p className="login-intro">
              Inicia sesión para volver a tu espacio Lumére.
            </p>

            <form
              className="login-form"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <label className="login-field">
                <span>Correo electrónico</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="off"
                  required
                />
              </label>
              <label className="login-field">
                <span>Contraseña</span>
                <input
                  name="password"
                  type="password"
                  autoComplete="off"
                  required
                />
              </label>
              <button className="btn login-submit" type="submit">
                Iniciar sesión
              </button>
            </form>

            <p className="login-feedback" role="status" aria-live="polite">
              {message}
            </p>
            <p className="login-register">
              ¿Aún no tienes cuenta? <a href="/#cuenta">Crea tu cuenta</a>
            </p>
            <p className="login-notice">
              <strong>Prototipo:</strong> el acceso no está conectado. No uses
              una contraseña real; no se guardan ni envían datos.
            </p>
          </div>
        </div>

        <a className="login-back-link" href="/">
          Volver a la tienda
        </a>
      </section>
    </main>
  );
}
