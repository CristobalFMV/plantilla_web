import { useEffect, useState } from "react";

// Inicializa el tema con la preferencia del sistema y ofrece un control para alternarlo.
export function useTheme() {
  // Lee la preferencia solo al iniciar; el cambio posterior depende del botón de la interfaz.
  const [isDark, setIsDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    // Expone el tema en el documento para que los tokens CSS cambien en toda la aplicación.
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  }, [isDark]);

  // Cambia entre claro y oscuro sin acoplar la lógica al componente del encabezado.
  const toggleTheme = () => setIsDark((current) => !current);

  return { isDark, toggleTheme };
}
