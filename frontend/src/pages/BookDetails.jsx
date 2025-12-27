import React from 'react';
import { useParams } from 'react-router-dom';

function BookDetails({ books, addToCart }) {
  const { id } = useParams();
  const book = books.find(b => b.id === parseInt(id));

  if (!book) return <p>Book not found.</p>;

  return (
    <div className="text-center">
      <img
        src={book.image}
        alt={book.title}
        className="img-fluid mb-3"
        style={{ maxWidth: '250px' }}
      />
      <h2>{book.title}</h2>
      <p>by {book.author}</p>
      <p className="text-muted">${book.price}</p>
      <button onClick={() => addToCart(book)} className="btn btn-primary">
        Add to Cart
      </button>
    </div>
  );
}

export default BookDetails;
