import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configura Vite para compilar la aplicación con el soporte de JSX de React.
export default defineConfig({
  plugins: [react()],
});
