import { useEffect } from "react";

const FAST_SCROLL_THRESHOLD = 1.1;
const FLICKER_DURATION = 420;
const RELIGHT_DELAY = 2600;

// Ajusta la iluminación ambiental según el desplazamiento, los cambios de tema y accesibilidad.
export function useCandlelightScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Conserva la última medición y los temporizadores para limitar estados visuales superpuestos.
    let previousY = window.scrollY;
    let previousTime = performance.now();
    let isExtinguished = false;
    let activeTheme = root.dataset.theme;
    let flickerTimeout = 0;
    let relightTimeout = 0;

    // Los temporizadores se comparten entre eventos y se limpian al desmontar el hook.
    const clearTimeouts = () => {
      window.clearTimeout(flickerTimeout);
      window.clearTimeout(relightTimeout);
    };

    // Publica el estado visual en el elemento raíz para que el CSS active sus animaciones.
    const setLightState = (state: "steady" | "flickering" | "out") => {
      root.dataset.candlelight = state;
    };

    // Un desplazamiento rápido apaga temporalmente la vela y la enciende tras una pausa.
    const extinguish = () => {
      isExtinguished = true;
      setLightState("out");
      window.clearTimeout(relightTimeout);
      relightTimeout = window.setTimeout(() => {
        isExtinguished = false;
        setLightState("steady");
      }, RELIGHT_DELAY);
    };

    // Mide la velocidad de scroll para decidir si la llama parpadea o se apaga.
    const handleScroll = () => {
      const currentY = window.scrollY;
      const currentTime = performance.now();
      const elapsed = Math.max(currentTime - previousTime, 1);
      const speed = Math.abs(currentY - previousY) / elapsed;
      previousY = currentY;
      previousTime = currentTime;

      if (reducedMotion.matches) return;

      if (isExtinguished) {
        window.clearTimeout(relightTimeout);
        relightTimeout = window.setTimeout(() => {
          isExtinguished = false;
          setLightState("steady");
        }, RELIGHT_DELAY);
        return;
      }

      if (speed >= FAST_SCROLL_THRESHOLD) {
        window.clearTimeout(flickerTimeout);
        extinguish();
        return;
      }

      setLightState("flickering");
      window.clearTimeout(flickerTimeout);
      flickerTimeout = window.setTimeout(() => {
        if (!isExtinguished) setLightState("steady");
      }, FLICKER_DURATION);
    };

    // Respeta la preferencia del sistema y elimina animaciones cuando se reduce el movimiento.
    const handleMotionPreference = () => {
      if (reducedMotion.matches) {
        clearTimeouts();
        isExtinguished = false;
        setLightState("steady");
      }
    };

    // Reacciona a cambios de tema hechos por useTheme, reiniciando la secuencia de luz.
    const themeObserver = new MutationObserver(() => {
      const nextTheme = root.dataset.theme;
      if (nextTheme === activeTheme) return;
      activeTheme = nextTheme;
      previousY = window.scrollY;
      previousTime = performance.now();
      window.clearTimeout(flickerTimeout);
      extinguish();
    });

    // Registra los observadores y eventos al montar; los retira para evitar fugas al desmontar.
    root.dataset.candlelight = "steady";
    themeObserver.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("scroll", handleScroll, { passive: true });
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      themeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      reducedMotion.removeEventListener("change", handleMotionPreference);
      clearTimeouts();
      delete root.dataset.candlelight;
    };
  }, []);
}
