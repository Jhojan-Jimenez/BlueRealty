"use client";
import Link from "next/link";
import TicketForm from "./components/TicketForm";

export default function Home() {
  return (
    <div style={{ padding: "20px", height: "100vh", textAlign: "center" }}>
      <h1>Home</h1>
      <TicketForm />
      <div>
        <Link
          href="/tickets"
          style={{ marginTop: "20px", display: "inline-block" }}
        >
          Ver Tickets
        </Link>
      </div>
    </div>
  );
}
