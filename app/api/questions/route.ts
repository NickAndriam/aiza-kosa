export async function POST(req: Request) {
  const API_KEY = process.env.NEXT_OPEN_ROUTER_API_KEY;

  if (!API_KEY) {
    return new Response(
      JSON.stringify({
        message: "API key is not set in environment variables.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const body = await req.json();
  const { type, questionFor, language } = body;

  const raw = JSON.stringify({
    model: "meta-llama/llama-4-maverick:free",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Give me a truth or dare question based on these settings: type is ${type}, level is ${questionFor}, and language is ${language}. Only give me the question, no explanation.`,
          },
        ],
      },
    ],
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      requestOptions
    );

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(
        JSON.stringify({
          message: `OpenRouter API error: ${response.status} ${errorText}`,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const jsonResponse = await response.json();
    const question = jsonResponse.choices[0].message.content;

    return new Response(JSON.stringify({ message: question }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
