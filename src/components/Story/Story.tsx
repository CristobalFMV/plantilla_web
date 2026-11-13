import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import "./Story.css";

type Review = {
  id: string;
  name: string;
  comment: string;
  photos: string[];
};

const reviewStorageKey = "lumere-reviews";
const maxPhotos = 3;
const maxPhotoSize = 1_000_000;

const featuredReviews: Review[] = [
  {
    id: "peter-v",
    name: "Peter V.",
    comment:
      "Las velas tienen un aroma delicioso. Me encanta el diseño y cómo iluminan mi hogar.",
    photos: ["/images/images/resenafoto.jpeg"],
  },
];

function shuffleReviews(reviews: Review[]) {
  const shuffled = [...reviews];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function isReview(value: unknown): value is Review {
  if (typeof value !== "object" || value === null) return false;
  const review = value as Record<string, unknown>;
  return (
    typeof review.id === "string" &&
    typeof review.name === "string" &&
    typeof review.comment === "string" &&
    Array.isArray(review.photos) &&
    review.photos.every((photo) => typeof photo === "string")
  );
}

function readPhoto(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("No se pudo leer una de las fotos seleccionadas."));
    };
    reader.onerror = () => reject(new Error("No se pudo leer una de las fotos seleccionadas."));
    reader.readAsDataURL(file);
  });
}

// Muestra reseñas en orden aleatorio y permite añadir nuevas reseñas con fotos en este navegador.
export default function Story() {
  const [submittedReviews, setSubmittedReviews] = useState<Review[]>([]);
  const [reviews, setReviews] = useState(featuredReviews);
  const [activeIndex, setActiveIndex] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const previewUrls = photos.map((photo) => URL.createObjectURL(photo));
    setPhotoPreviews(previewUrls);
    return () => previewUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [photos]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(reviewStorageKey);
      if (saved === null) return;
      const parsed: unknown = JSON.parse(saved);
      if (!Array.isArray(parsed) || !parsed.every(isReview)) {
        throw new Error("Las reseñas guardadas tienen un formato no válido.");
      }
      setSubmittedReviews(parsed);
      setReviews(shuffleReviews([...featuredReviews, ...parsed]));
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? `No se pudieron cargar las reseñas guardadas: ${loadError.message}`
          : "No se pudieron cargar las reseñas guardadas.",
      );
    }
  }, []);

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.currentTarget.files ?? []);
    if (selected.length > maxPhotos) {
      setError(`Puedes adjuntar hasta ${maxPhotos} fotos por reseña.`);
      event.currentTarget.value = "";
      return;
    }
    const invalidPhoto = selected.find(
      (photo) => !photo.type.startsWith("image/") || photo.size > maxPhotoSize,
    );
    if (invalidPhoto) {
      setError("Cada archivo debe ser una imagen de hasta 1 MB.");
      event.currentTarget.value = "";
      return;
    }
    setError("");
    setPhotos(selected);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    const trimmedName = name.trim();
    const trimmedComment = comment.trim();
    if (!trimmedName || !trimmedComment) {
      setError("Escribe tu nombre y tu reseña antes de enviarla.");
      return;
    }

    try {
      const review: Review = {
        id: crypto.randomUUID(),
        name: trimmedName,
        comment: trimmedComment,
        photos: await Promise.all(photos.map(readPhoto)),
      };
      const nextSubmittedReviews = [...submittedReviews, review];
      window.localStorage.setItem(reviewStorageKey, JSON.stringify(nextSubmittedReviews));
      setSubmittedReviews(nextSubmittedReviews);
      setReviews(shuffleReviews([...featuredReviews, ...nextSubmittedReviews]));
      setActiveIndex(0);
      setName("");
      setComment("");
      setPhotos([]);
      setMessage("¡Gracias! Tu reseña se guardó en este navegador.");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? `No se pudo guardar la reseña: ${submitError.message}`
          : "No se pudo guardar la reseña.",
      );
    }
  };

  const activeReview = reviews[activeIndex];

  return (
    <section className="story reviews" id="historia" aria-labelledby="reviews-title">
      <div className="container">
        <div className="reviews-heading">
          <h2 id="reviews-title">Historias que iluminan</h2>
          <p className="reviews-eyebrow">Opiniones de nuestra comunidad</p>
          <p>Experiencias reales con las velas Lumére.</p>
        </div>
        <div className="reviews-content">
          <div className="reviews-showcase">
            <article
              className="review-card"
              aria-roledescription="diapositiva"
              aria-label={`Reseña ${activeIndex + 1} de ${reviews.length}`}
            >
              <div className="review-photos">
                {activeReview.photos.map((photo, index) => (
                  <img
                    key={`${activeReview.id}-${index}`}
                    src={photo}
                    alt={`Foto compartida por ${activeReview.name}`}
                    loading="lazy"
                  />
                ))}
              </div>
              <div className="review-copy" aria-live="polite">
                <span className="review-quote-mark" aria-hidden="true">“</span>
                <blockquote>{activeReview.comment}</blockquote>
                <p className="review-author">{activeReview.name}</p>
              </div>
            </article>
            {reviews.length > 1 && (
              <div className="review-controls" aria-label="Navegación de reseñas">
                <button
                  type="button"
                  className="review-arrow"
                  aria-label="Reseña anterior"
                  onClick={() =>
                    setActiveIndex((index) => (index - 1 + reviews.length) % reviews.length)
                  }
                >
                  ‹
                </button>
                <div className="review-dots">
                  {reviews.map((review, index) => (
                    <button
                      key={review.id}
                      type="button"
                      className={`review-dot${index === activeIndex ? " is-active" : ""}`}
                      aria-label={`Mostrar reseña ${index + 1}`}
                      aria-current={index === activeIndex ? "true" : undefined}
                      onClick={() => setActiveIndex(index)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="review-arrow"
                  aria-label="Siguiente reseña"
                  onClick={() => setActiveIndex((index) => (index + 1) % reviews.length)}
                >
                  ›
                </button>
              </div>
            )}
          </div>

          <form className="review-form" onSubmit={handleSubmit}>
            <h3>Deja tu reseña</h3>
            <p>Cuéntanos qué te parecen nuestras velas. También puedes compartir fotos.</p>
            <label htmlFor="review-name">Tu nombre</label>
            <input
              id="review-name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
              required
            />
            <label htmlFor="review-comment">Tu comentario</label>
            <textarea
              id="review-comment"
              name="comment"
              rows={4}
              value={comment}
              onChange={(event) => setComment(event.currentTarget.value)}
              required
            />
            <label htmlFor="review-photos">Fotos (opcional, hasta {maxPhotos})</label>
            <input
              id="review-photos"
              name="photos"
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
            />
            {photoPreviews.length > 0 && (
              <div className="review-upload-previews" aria-label="Fotos seleccionadas">
                {photoPreviews.map((preview, index) => (
                  <img key={preview} src={preview} alt={`Vista previa ${index + 1}`} />
                ))}
              </div>
            )}
            {error && <p className="review-feedback is-error" role="alert">{error}</p>}
            {message && <p className="review-feedback" role="status">{message}</p>}
            <button className="btn review-submit" type="submit">Publicar reseña</button>
          </form>
        </div>
      </div>
    </section>
  );
}
