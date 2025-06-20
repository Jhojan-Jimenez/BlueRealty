import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { db } from "@/lib/firebase";
import "@/app/components/styles.css";
import TicketCard from "../components/TicketCard";
import { Response } from "../types";

export default async function page() {
  const ticketsRef = await getDocs(collection(db, "tickets"));
  const tickets = ticketsRef.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      user_email: data.user_email,
      title: data.title,
      description: data.description,
      status: data.status,
      created_at: data.created_at?.toDate().toISOString(),
    };
  });
  const responsesRef = await getDocs(collection(db, "responses"));
  const responses = responsesRef.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ticket_id: data.ticket_id,
      response: data.response,
      created_at: data.created_at?.toDate().toISOString(),
    };
  });
  tickets.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return (
    <div className="tickets-container">
      <h1>Tickets</h1>
      {tickets &&
        tickets.map((ticket) => {
          const ticketResponses = responses.filter(
            (response) => response.ticket_id === ticket.id
          );

          return (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              responses={ticketResponses}
            />
          );
        })}
    </div>
  );
}
