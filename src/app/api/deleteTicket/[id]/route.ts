import { db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const ticketRef = doc(db, "tickets", id);
    await deleteDoc(ticketRef);
    const resRef = query(
      collection(db, "responses"),
      where("ticket_id", "==", id)
    );
    const responsesSnapshot = await getDocs(resRef);
    for (const responseDoc of responsesSnapshot.docs) {
      await deleteDoc(doc(db, "responses", responseDoc.id));
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (reason) {
    const message =
      reason instanceof Error ? reason.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
