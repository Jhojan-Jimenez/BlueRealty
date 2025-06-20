"use client";
import { useEffect, useState } from "react";
import { Response, Ticket } from "../types";
import LoadingModal from "./LoadingModal";
export default function TicketCard({
  ticket,
  responses,
}: {
  ticket: Ticket;
  responses: Response[];
}) {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/deleteTicket/${ticket.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Ticket eliminado correctamente.");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al eliminar el ticket:", error);
      alert("No se pudo eliminar el ticket. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (responses?.length > 0) {
      const date = new Date(responses[0].created_at);
      const formatted = date.toLocaleString();
      setFormattedDate(formatted);
    }
  }, [responses]);

  return (
    <>
      {loading ? (
        <LoadingModal visible={loading} />
      ) : (
        <div className="ticket-card">
          <h1>{ticket.title}</h1>
          <p>{ticket.description}</p>
          <p>
            <strong>Correo:</strong> {ticket.user_email}
          </p>
          <p>
            <strong>Estado:</strong> {ticket.status}
          </p>
          <button
            onClick={handleDelete}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "0.5rem",
            }}
          >
            Eliminar
          </button>
          <div>
            <p>
              <strong>Respuestas:</strong>
            </p>
            {responses.length > 0 ? (
              responses.map((response) => (
                <div key={response.id} className="response">
                  <p>{response.response}</p>
                  <p>
                    <strong>Fecha:</strong> {formattedDate}
                  </p>
                </div>
              ))
            ) : (
              <p className="response">No hay respuestas para este ticket.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
