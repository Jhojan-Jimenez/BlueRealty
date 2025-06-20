"use client";

import React from "react";
import { HashLoader } from "react-spinners";
import "./styles.css";

export default function LoadingModal({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div className="loading-overlay">
      <div className="loader-container">
        <HashLoader color="black" size="200px" />
        <h2 style={{ textAlign: "center", color: "white", marginTop: "1rem" }}>
          Cargando...
        </h2>
      </div>
    </div>
  );
}
