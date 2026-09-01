import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "2rem",
      background: "var(--background-color)",
      color: "var(--text-color)",
      gap: "0.75rem",
    }}
  >
    <p
      style={{
        fontFamily: '"JetBrains Mono", monospace',
        color: "var(--primary-color)",
        fontWeight: 700,
        letterSpacing: "2px",
      }}
    >
      404
    </p>
    <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.6rem)", fontWeight: 800 }}>
      Page not found
    </h1>
    <p style={{ color: "var(--text-light)", maxWidth: "380px" }}>
      The page you're looking for doesn't exist or has moved.
    </p>
    <Link
      to="/"
      style={{
        marginTop: "0.75rem",
        padding: "12px 22px",
        borderRadius: "10px",
        background: "var(--primary-color)",
        color: "var(--primary-contrast)",
        fontWeight: 600,
      }}
    >
      Back to home
    </Link>
  </div>
);

export default NotFound;
