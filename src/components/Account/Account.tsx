import { useState, type FormEvent } from "react";
import "./Account.css";

type AccountMode = "register" | "login";

const fragranceFamilies = ["Amaderada", "Dulce", "Floral", "Cítrica", "Herbal"];

// Prototipo de acceso: valida en el navegador, pero no crea cuentas ni conserva datos.
export default function Account() {
  const [mode, setMode] = useState<AccountMode>("register");
  const [allowsFuturePersonalization, setAllowsFuturePersonalization] =
    useState(false);
  const [message, setMessage] = useState("");

  const changeMode = (nextMode: AccountMode) => {
    setMode(nextMode);
    setAllowsFuturePersonalization(false);
    setMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(
      mode === "register"
        ? "Vista previa: no se creó una cuenta ni se guardó o envió información."
        : "Vista previa: el acceso no está conectado; tus datos no se verificaron, guardaron ni enviaron.",
    );
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
          <div className="account-mode" aria-label="Tipo de acceso">
            <button
              type="button"
              className={mode === "register" ? "is-active" : ""}
              aria-pressed={mode === "register"}
              onClick={() => changeMode("register")}
            >
              Crear cuenta
            </button>
            <button
              type="button"
              className={mode === "login" ? "is-active" : ""}
              aria-pressed={mode === "login"}
              onClick={() => changeMode("login")}
            >
              Iniciar sesión
            </button>
          </div>

          <h3>{mode === "register" ? "Regístrate" : "Qué bueno verte"}</h3>
          <form
            className="account-form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            {mode === "register" && (
              <label className="account-field">
                <span>Nombre</span>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                />
              </label>
            )}
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
                autoComplete={mode === "register" ? "new-password" : "current-password"}
                {...(mode === "register" ? { minLength: 8 } : {})}
                required
              />
              {mode === "register" && (
                <small>Al menos 8 caracteres para esta demostración.</small>
              )}
            </label>

            {mode === "register" && (
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
            )}

            <button className="btn account-submit" type="submit">
              {mode === "register" ? "Crear cuenta" : "Iniciar sesión"}
            </button>
          </form>
          <p className="account-feedback" role="status" aria-live="polite">
            {message}
          </p>
        </div>
      </div>
    </section>
  );
}
