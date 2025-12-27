import React from 'react';

function Cart({ cart, removeFromCart }) {
  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul >
          {cart.map(book => (
            <li key={book.id} >
              {book.title} - ${book.price}
              <button onClick={() => removeFromCart(book.id)} >Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;