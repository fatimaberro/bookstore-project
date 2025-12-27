import React, { useMemo, useState } from "react";
import BookCard from "../components/BookCard";

function Home({ books, addToCart }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filteredBooks = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = [...books];

    if (q) {
      list = list.filter(
        (b) =>
          (b.title || "").toLowerCase().includes(q) ||
          (b.author || "").toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-asc") list.sort((a, b) => Number(a.price) - Number(b.price));
    if (sortBy === "price-desc") list.sort((a, b) => Number(b.price) - Number(a.price));
    if (sortBy === "title") list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));

    return list;
  }, [books, query, sortBy]);

  return (
    <div>
      {/* Hero (Bootstrap) */}
      <div className="bg-light p-4 p-md-5 rounded-4 shadow-sm mb-4">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div>
            <h1 className="fw-bold mb-1">CatReads</h1>
            <p className="text-secondary mb-0">
             Discover our latest books.
            </p>
          </div>

          <div className="d-flex gap-2">
            <span className="badge text-bg-primary">New</span>
            <span className="badge text-bg-warning">Best-sellers</span>
            <span className="badge text-bg-success">Student discount</span>
          </div>
        </div>
      </div>

  

      {/* Result count */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <small className="text-secondary">
          {filteredBooks.length} livre(s) trouvé(s)
        </small>
        {query && (
          <button className="btn btn-outline-secondary btn-sm" onClick={() => setQuery("")}>
            Effacer la recherche
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="row">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} addToCart={addToCart} />
        ))}
      </div>

    
    </div>
  );
}

export default Home;
