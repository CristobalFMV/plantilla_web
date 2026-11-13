import { useState, type FormEvent } from "react";
import "./Account.css";

const fragranceFamilies = ["Amaderada", "Dulce", "Floral", "Cítrica", "Herbal"];

// Formulario de registro de demostración; no crea cuentas ni conserva datos.
export default function Account() {
  const [allowsFuturePersonalization, setAllowsFuturePersonalization] =
    useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Vista previa: no se creó una cuenta ni se guardó o envió información.");
    event.currentTarget.reset();
    setAllowsFuturePersonalization(false);
  };

  return (
    <section className="account-section" id="cuenta" aria-labelledby="account-title">
      <div className="container account-layout">
        <div className="account-intro">
          <h2 id="account-title">Un espacio a tu medida.</h2>
          <p>
            Crea tu perfil Lumére y, si quieres, cuéntanos qué familias
            aromáticas disfrutas para orientar futuras experiencias.
          </p>
          <p className="account-privacy">
            <strong>Prototipo:</strong> este formulario no crea cuentas ni
            transmite o guarda datos. No uses una contraseña real.
          </p>
        </div>

        <div className="account-form-panel">
          <h3>Regístrate</h3>
          <form
            className="account-form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <label className="account-field">
              <span>Nombre</span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                required
              />
            </label>
            <label className="account-field">
              <span>Correo electrónico</span>
              <input
                name="email"
                type="email"
                autoComplete="off"
                required
              />
            </label>
            <label className="account-field">
              <span>Contraseña</span>
              <input
                name="password"
                type="password"
                autoComplete="off"
                minLength={8}
                required
              />
              <small>Al menos 8 caracteres para esta demostración.</small>
            </label>

            <div className="account-preferences">
              <label className="account-consent">
                <input
                  type="checkbox"
                  checked={allowsFuturePersonalization}
                  onChange={(event) =>
                    setAllowsFuturePersonalization(event.target.checked)
                  }
                />
                <span>
                  Quiero que mis preferencias puedan orientar futuras
                  funciones personalizadas. Es opcional y no incluye
                  comunicaciones comerciales.
                </span>
              </label>
              {allowsFuturePersonalization && (
                <fieldset className="account-fragrances">
                  <legend>¿Qué familias aromáticas prefieres?</legend>
                  {fragranceFamilies.map((family) => (
                    <label key={family}>
                      <input type="checkbox" name="fragrances" value={family} />
                      <span>{family}</span>
                    </label>
                  ))}
                </fieldset>
              )}
            </div>

            <button className="btn account-submit" type="submit">
              Crear cuenta
            </button>
          </form>
          <p className="account-feedback" role="status" aria-live="polite">
            {message}
          </p>
          <p className="account-login-link">
            ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
          </p>
        </div>
      </div>
    </section>
  );
}
