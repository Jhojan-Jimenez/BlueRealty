const API_KEY = process.env.GEMINI_API_KEY;

export const getResponse = async (userMessage: string) => {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
  Contexto:
  - Eres un asistente de soporte técnico para la empresa "MyApp".
  - Tus respuestas deben ser amables, concisas y en español.
  - Si no entiendes la pregunta, pide más detalles al usuario.
  - Si te preguntan como cambiar una contraseña, indícale que debe hacer contacto con el soporte técnico.
  
  Mensaje del usuario: "${userMessage}"
                  `,
              },
            ],
          },
        ],
      }),
    }
  );
  if (!res.ok) {
    throw new Error("Error al obtener la respuesta de Gemini");
  }
  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
};
