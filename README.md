# Lumére

## 1. Título y Descripción

Lumére es una tienda de demostración para una marca de velas artesanales. La aplicación presenta una colección de velas aromáticas y permite explorarla mediante un carrusel, búsqueda por nombre y filtros por fragancia y categoría. Cada producto tiene una ficha con sus características y controles para elegir cantidad.

La experiencia incluye un carrito de compras interactivo, un tema claro/oscuro, secciones informativas y formularios de reseñas y novedades. Es un prototipo de frontend: el catálogo está definido localmente, el carrito solo vive en memoria mientras la página está abierta, las reseñas se guardan en el almacenamiento local del navegador y no hay integración con una API, un sistema de pagos ni un servicio de suscripción.

## 2. Stack Tecnológico

- **React** y **React DOM**: interfaz y renderizado de la aplicación.
- **TypeScript**: tipado estático de componentes y datos.
- **Vite**: servidor de desarrollo y compilación para producción.
- **@vitejs/plugin-react**: soporte de React en Vite.
- **@types/react** y **@types/react-dom**: declaraciones de tipos para React.
- **CSS**: estilos propios, tokens de diseño y estilos por componente.

Las dependencias anteriores están declaradas en `package.json`. `package-lock.json` fija el árbol de dependencias utilizado por npm. Las fuentes DM Sans y Playfair Display se cargan desde Google Fonts mediante `index.html`; no son paquetes npm.

## 3. Estructura del Proyecto

```text
.
├── README.md                          # Documentación del proyecto
├── index.html                         # Documento HTML, metadatos y nodo raíz de React
├── package.json                       # Dependencias y scripts npm
├── package-lock.json                  # Versiones resueltas para instalaciones con npm
├── tsconfig.json                      # Opciones del compilador TypeScript
├── vite.config.ts                     # Configuración de Vite y plugin de React
├── node_modules/                      # Paquetes instalados (contenido omitido)
├── public/
│   └── images/
│       ├── candles/
│       │   ├── ambar.svg
│       │   ├── atardecer.svg
│       │   ├── bosque.svg
│       │   └── jardin.svg
│       └── images/
│           ├── png/
│           │   ├── Lumereblanco.png
│           │   ├── Lumereblancotexto.png
│           │   ├── Lumerenegro.png
│           │   └── Lumerenegrotexto.png
│           ├── logo1.jpeg
│           ├── logo2.jpeg
│           ├── logo3.jpeg
│           ├── resenafoto.jpeg
│           ├── velas1.jpeg
│           ├── velas2.jpeg
│           ├── velas3.jpeg
│           ├── velas4.jpeg
│           ├── velas5.jpeg
│           ├── velas6.jpeg
│           └── velas7.jpeg
├── src/
│   ├── App.tsx                         # Composición de la página y estado del carrito y tema
│   ├── main.tsx                        # Punto de entrada; monta React y carga los estilos globales
│   ├── vite-env.d.ts                   # Tipos de entorno de Vite
│   ├── components/
│   │   ├── Cart/
│   │   │   ├── CartDrawer.tsx          # Panel del carrito y resumen de compra
│   │   │   └── CartDrawer.css
│   │   ├── Features/
│   │   │   ├── Features.tsx            # Características de la colección
│   │   │   └── Features.css
│   │   ├── Footer/
│   │   │   ├── Footer.tsx              # Pie de página
│   │   │   └── Footer.css
│   │   ├── Header/
│   │   │   ├── Header.tsx              # Navegación, tema y acceso al carrito
│   │   │   └── Header.css
│   │   ├── Hero/
│   │   │   ├── Hero.tsx                # Presentación principal
│   │   │   └── Hero.css
│   │   ├── ProductCarousel/
│   │   │   ├── ProductCarousel.tsx     # Carrusel de imágenes y contenido destacado
│   │   │   └── ProductCarousel.css
│   │   ├── ProductCatalog/
│   │   │   ├── ProductCatalog.tsx      # Catálogo, búsqueda y filtros
│   │   │   ├── ProductCatalog.css
│   │   │   ├── ProductModal.tsx         # Ficha modal y selección de cantidad
│   │   │   └── ProductModal.css
│   │   ├── Signup/
│   │   │   ├── Signup.tsx              # Formulario de novedades con validación local
│   │   │   └── Signup.css
│   │   └── Story/
│   │       ├── Story.tsx               # Reseñas y carga de fotos
│   │       └── Story.css
│   ├── data/
│   │   └── candles.ts                  # Catálogo local de productos
│   ├── hooks/
│   │   ├── useCandlelightScroll.ts     # Efecto visual según desplazamiento y movimiento
│   │   └── useTheme.ts                 # Preferencia y alternancia del tema
│   ├── styles/
│   │   ├── global.css                  # Estilos globales
│   │   └── tokens.css                  # Variables y tokens visuales
│   ├── types/
│   │   └── Candle.ts                   # Tipos Candle y CartLine
│   └── utils/
│       └── formatCurrency.ts           # Formato de precios en pesos chilenos
└── dist/                               # Salida compilada de producción generada por Vite
    ├── assets/                         # JavaScript y CSS compilados con nombres hash
    ├── images/
    │   ├── candles/                    # Ilustraciones SVG copiadas desde public/
    │   └── images/                     # Fotografías y logos copiados desde public/
    └── index.html                      # HTML de producción
```

`dist/` es la salida de compilación y se regenera al ejecutar el script `build`. Los archivos compilados pueden cambiar de nombre o contenido entre compilaciones.

## 4. Prerrequisitos e Instalación

Se requiere **Node.js** y **npm**. El repositorio incluye `package-lock.json`, por lo que npm es el gestor de paquetes indicado.

```bash
git clone https://github.com/CristobalFMV/plantilla_web.git
cd plantilla_web
npm ci
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir la aplicación. Para una instalación que no use el lockfile, también se puede ejecutar `npm install`.

**Variables de entorno:** no hay archivos `.env` ni referencias a variables `import.meta.env` en el código actual. No es necesario crear ni configurar variables para ejecutar esta aplicación.

## 5. Scripts Disponibles

Los siguientes scripts están definidos en `package.json`:

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo de Vite. |
| `npm run build` | Comprueba los tipos con `tsc --noEmit` y, si no hay errores, genera la compilación de producción con Vite en `dist/`. |
| `npm run preview` | Sirve localmente la compilación de `dist/` para previsualizarla. Ejecuta primero `npm run build`. |

## 6. Arquitectura y Convenciones

- **Composición y estado:** `src/main.tsx` monta `App`. `src/App.tsx` organiza las secciones y mantiene el estado compartido del carrito, las notificaciones y el tema. Los componentes reciben datos y acciones mediante props tipadas.
- **Componentes y estilos:** la interfaz está separada por secciones y funcionalidades dentro de `src/components/`. Cada componente tiene su archivo `.tsx` y su hoja `.css` correspondiente; el modal de producto comparte el directorio `ProductCatalog/`. Los estilos globales y los tokens de diseño están en `src/styles/`.
- **Tipos:** `src/types/Candle.ts` define `Candle`, con categorías y familias aromáticas restringidas a uniones literales, y `CartLine`, que vincula un producto por identificador con su cantidad. El catálogo centralizado en `src/data/candles.ts` declara sus elementos como `Candle[]`.
- **Hooks y utilidades:** `src/hooks/` contiene la lógica reutilizable para el tema y el efecto visual de desplazamiento. `src/utils/formatCurrency.ts` centraliza el formato de moneda `CLP` para la interfaz.
- **Datos y persistencia:** el catálogo es estático y local; no existe una capa de servicios ni llamadas a APIs. Las reseñas añadidas se guardan en `localStorage` bajo la clave `lumere-reviews`, con fotos convertidas a datos locales. El carrito no se persiste y se reinicia al recargar la página.
- **Formularios y compra:** el formulario de novedades valida el correo en el navegador, pero no lo envía a un servidor. El botón de compra solo muestra un mensaje indicando que el pago requiere conectar una pasarela.
- **Configuración TypeScript:** `tsconfig.json` habilita `strict`, usa `src` como raíz de compilación y comprueba los tipos como parte del comando de producción.
