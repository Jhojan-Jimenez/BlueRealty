"use client";
import { useState } from "react";
import "./styles.css";
import LoadingModal from "./LoadingModal";

export default function TicketForm() {
  const [userEmail, setUserEmail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/createTicket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: userEmail,
          title,
          description,
        }),
      });
      if (res.ok) {
        alert("Ticket created successfully!");
        setUserEmail("");
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Failed to create ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {loading && <LoadingModal visible={loading} />}
      <form onSubmit={handleSubmit} className="form">
        <h1> Create your Ticket</h1>
        <input
          type="email"
          placeholder="Correo"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Asunto"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
