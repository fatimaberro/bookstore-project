import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Contact from './pages/Contact';
import BookDetails from './pages/BookDetails';
import Cart from './components/Cart';
import Login from "./pages/login";

function App() {
  const [cart, setCart] = useState([]);

  const [books, setBooks] = useState([]);
const [loadingBooks, setLoadingBooks] = useState(true);
const [booksError, setBooksError] = useState("");

useEffect(() => {
  const loadBooks = async () => {
    try {
      setLoadingBooks(true);
      setBooksError("");

      const res = await fetch("https://bookstore-backend-zhuc.onrender.com/api/books");
      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error(err);
      setBooksError("Failed to fetch");
    } finally {
      setLoadingBooks(false);
    }
  };

  loadBooks();
}, []);




  const addToCart = (book) => {
    if (!cart.some(item => item.id === book.id)) {
      setCart([...cart, book]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <Router>
      <Navbar cartCount={cart.length} />
      <div className="container my-4">
        <Routes>
          <Route
  path="/"
  element={
    loadingBooks ? (
      <p>Loading books...</p>
    ) : booksError ? (
      <p style={{ color: "red" }}>{booksError}</p>
    ) : (
      <Home books={books} addToCart={addToCart} />
    )
  }
/>

          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book/:id" element={<BookDetails books={books} addToCart={addToCart} />} />

          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;