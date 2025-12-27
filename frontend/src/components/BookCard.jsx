import React from "react";
import { Link } from "react-router-dom";

function getBadge(bookId) {
  const n = Number(bookId) || 0;
  if (n % 5 === 0) return { text: "Best-seller", cls: "text-bg-warning" };
  if (n % 3 === 0) return { text: "Nouveau", cls: "text-bg-success" };
  return { text: "Sélection", cls: "text-bg-primary" };
}

function BookCard({ book, addToCart }) {
  const badge = getBadge(book.id);
  const price = Number(book.price);

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm border-0">
        <div className="position-relative">
          <img
            src={book.image}
            className="card-img-top"
            alt={book.title}
            style={{ height: 250, objectFit: "cover" }}
          />
          <span className={`badge ${badge.cls} position-absolute top-0 start-0 m-2`}>
            {badge.text}
          </span>
        </div>

        <div className="card-body d-flex flex-column">
          <h6 className="card-title fw-semibold mb-1">{book.title}</h6>
          <p className="text-secondary mb-2" style={{ fontSize: 14 }}>
            {book.author}
          </p>

          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-bold">
                {Number.isFinite(price) ? `$${price.toFixed(2)}` : `$${book.price}`}
              </span>
              <small className="text-secondary">TVA incl.</small>
            </div>

            <div className="d-flex gap-2">
              <Link to={`/book/${book.id}`} className="btn btn-outline-primary btn-sm w-50">
                Details
              </Link>
              <button onClick={() => addToCart(book)} className="btn btn-primary btn-sm w-50">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
