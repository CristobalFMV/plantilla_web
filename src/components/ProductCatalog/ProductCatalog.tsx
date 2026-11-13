import { useMemo, useState } from "react";
import { candles } from "../../data/candles";
import type { Candle } from "../../types/Candle";
import { formatCurrency } from "../../utils/formatCurrency";
import ProductModal from "./ProductModal";
import "./ProductCatalog.css";

const categories = [...new Set(candles.map((candle) => candle.category))];
const fragranceFamilies = [
  ...new Set(candles.map((candle) => candle.fragranceFamily)),
];
const productImages: Record<string, string> = {
  bosque: "/images/candles/bosque.svg",
  ambar: "/images/candles/ambar.svg",
  jardin: "/images/candles/jardin.svg",
  atardecer: "/images/candles/atardecer.svg",
};

// El catálogo informa al componente padre cuando el usuario agrega un producto.
type ProductCatalogProps = {
  onAddToCart: (candle: Candle, quantity: number) => void;
};

// Busca y filtra productos y permite agregarlos directamente al carrito.
export default function ProductCatalog({ onAddToCart }: ProductCatalogProps) {
  // Estos valores controlados mantienen sincronizados los campos y el resultado visible.
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [fragrance, setFragrance] = useState("");
  const [selectedCandle, setSelectedCandle] = useState<Candle | null>(null);

  // Memoriza la búsqueda combinada para no repetir el filtrado si sus criterios no cambian.
  const filteredCandles = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es");
    return candles.filter((candle) => {
      const matchesName = candle.name
        .toLocaleLowerCase("es")
        .includes(normalizedQuery);
      return (
        matchesName &&
        (!category || candle.category === category) &&
        (!fragrance || candle.fragranceFamily === fragrance)
      );
    });
  }, [category, fragrance, query]);

  return (
    <section className="catalog" id="productos" aria-labelledby="catalog-title">
      <div className="container">
        <div className="section-head">
          <h2 id="catalog-title">Encuentra tu próxima vela.</h2>
          <p className="section-descriptor">La colección Lumére</p>
          <p>
            Busca por nombre o combina los filtros para encontrar el aroma
            indicado para tu espacio.
          </p>
        </div>

        <div className="catalog-filters" aria-label="Buscar y filtrar productos">
          {/* Los filtros se aplican conjuntamente a nombre, familia aromática y categoría. */}
          <label className="catalog-search">
            <span className="sr-only">Buscar por nombre</span>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre..."
            />
          </label>
          <label className="catalog-filter">
            <span>Fragancia</span>
            <select
              value={fragrance}
              onChange={(event) => setFragrance(event.target.value)}
            >
              <option value="">Todas las fragancias</option>
              {fragranceFamilies.map((family) => (
                <option key={family} value={family}>
                  {family}
                </option>
              ))}
            </select>
          </label>
          <label className="catalog-filter">
            <span>Categoría</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          {(query || category || fragrance) && (
            <button
              className="catalog-reset"
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("");
                setFragrance("");
              }}
            >
              Limpiar filtros
            </button>
          )}
        </div>

        <p className="catalog-count" aria-live="polite">
          {filteredCandles.length}{" "}
          {filteredCandles.length === 1 ? "producto" : "productos"}
        </p>
        {filteredCandles.length ? (
          <div className="catalog-grid">
            {filteredCandles.map((candle) => {
              const productImage = productImages[candle.id];
              return (
                <article className="catalog-card" key={candle.id}>
                  <button
                    type="button"
                    className="catalog-product-button"
                    onClick={() => setSelectedCandle(candle)}
                    aria-label={`Ver detalles de ${candle.name}`}
                  >
                    <span className={`product-art${productImage ? " has-photo" : ""}`} aria-hidden="true">
                      {productImage ? (
                        <img className="product-photo" src={productImage} alt="" loading="lazy" />
                      ) : (
                        <span className={`product-candle ${candle.variant}`}>
                          <span>
                            <strong>LUMÉRE</strong>
                            <small>{candle.name}</small>
                          </span>
                        </span>
                      )}
                    </span>
                    <span className="catalog-product-info">
                      <span className="catalog-product-heading">
                        <strong>{candle.name}</strong>
                        <strong>{formatCurrency(candle.price)}</strong>
                      </span>
                      <span className="catalog-product-description">
                        {candle.fragrance}
                      </span>
                      <span className="catalog-product-specs">
                        {candle.size} · {candle.burnTime}
                      </span>
                      <span className="catalog-product-tags">
                        <span>{candle.fragranceFamily}</span>
                        <span>{candle.category}</span>
                      </span>
                    </span>
                  </button>
                  <button
                    className="btn catalog-add-button"
                    type="button"
                    onClick={() => onAddToCart(candle, 1)}
                  >
                    Añadir al carrito
                  </button>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="catalog-empty">
            <span aria-hidden="true">✦</span>
            <h3>No encontramos velas con esos filtros.</h3>
            <p>Prueba otro nombre o quita alguno de los filtros.</p>
          </div>
        )}
      </div>
      <ProductModal
        candle={selectedCandle}
        onClose={() => setSelectedCandle(null)}
        onAddToCart={(candle, quantity) => {
          onAddToCart(candle, quantity);
          setSelectedCandle(null);
        }}
      />
    </section>
  );
}
