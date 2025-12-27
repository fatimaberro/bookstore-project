import React from "react";

function Footer() {
  return (
    <footer className="border-top mt-4 py-3 bg-white">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <small className="text-secondary">
          © {new Date().getFullYear()} — Project CSCI426 (Bookstore)
        </small>
       
      </div>
    </footer>
  );
}

export default Footer;
