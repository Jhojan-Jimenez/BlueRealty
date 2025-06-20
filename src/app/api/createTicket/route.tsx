import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { getResponse } from "@/app/services/gemini";

export async function POST(request: NextRequest) {
  try {
    const { user_email, title, description } = await request.json();
    const ticketRef = await addDoc(collection(db, "tickets"), {
      user_email,
      title,
      description,
      status: "open",
      created_at: serverTimestamp(),
    });
    const responseRef = await addDoc(collection(db, "responses"), {
      ticket_id: ticketRef.id,
      response: await getResponse(description),
      created_at: serverTimestamp(),
    });

    return NextResponse.json(
      { success: true, id: ticketRef.id },
      { status: 201 }
    );
  } catch (reason) {
    const message =
      reason instanceof Error ? reason.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
