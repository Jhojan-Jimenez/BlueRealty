# 🎫 Sistema de Tickets con Respuestas Automáticas (Next.js + Firebase + Gemini)

Este proyecto es una pequeña app fullstack que simula un sistema de soporte técnico con respuestas automáticas. Utiliza tecnologías modernas como Next.js App Directory, Firebase Firestore y la API de Gemini (Google AI).

---

## 🛠️ Tecnologías Usadas

- ✅ **Next.js 14 (App Directory)** – SSR + React moderno
- ✅ **Firebase (Firestore)** – Base de datos NoSQL en tiempo real
- ✅ **Gemini (Google AI)** – Para generar respuestas automáticas personalizadas
- ✅ **TypeScript** – Tipado estricto para mejor DX

---

## 🚀 ¿Cómo funciona?

1. El usuario llena un formulario con su email, título y descripción del problema.
2. El ticket se guarda en Firestore.
3. Se envía el contenido del ticket a Gemini usando su API para obtener una respuesta automática.
4. La respuesta generada se guarda en Firestore en la colección `responses`.
5. La interfaz lista todos los tickets junto con sus respuestas, ordenados por fecha de creación (más reciente primero).

---

### 🧠 Lógica General

- `page.tsx` es la entrada de la app: renderiza el formulario (`TicketForm`)
- `TicketForm` es un **Client Component**, se carga de inmediato y permite al usuario enviar un nuevo ticket.
- `tickets/page.tsx` es un **Server Component asincrónico**, que obtiene los datos desde Firestore y muestra tickets y sus respuestas.
- `route.ts` es la ruta de API que maneja el flujo completo: guarda el ticket y la respuesta automática generada por Gemini / Además de eliminar tambien usando params [id].
- `services/getResponse.ts` encapsula la lógica para enviar prompts a Gemini (Google AI).
- Firestore almacena dos colecciones:
  - `tickets`: con email, asunto, descripción, estado y timestamp.
  - `responses`: con ticket_id relacionado y el texto generado por IA.

---

## 🧠 Flujo del Programa

```plaintext
Usuario envía ticket
       │
       ▼
Se guarda en Firestore → Se consulta Gemini → Se guarda respuesta
       │                                      │
       └────────────→ Ticket + Respuesta visibles en frontend

```
