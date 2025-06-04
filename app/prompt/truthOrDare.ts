export default function truthOrDare({
  type,
  level,
  language,
}: {
  type: "truth" | "dare";
  level: string;
  language: string;
}) {
  return `
You are a creative game master for the boldest, most fun, and unpredictable Truth or Dare game ever made.

Generate one (1) unique and engaging ${type} question for a "${level}" level game.
${
  level === "sexual"
    ? "Make it daring, provocative, and strictly for adults (18+)."
    : ""
}

Guidelines:
- Avoid writing "dare:" or "truth:" at the beginning of the question.
- The question must be written entirely in ${language}.
- Return only one question. It must be short, clear, and easy to understand.
- Write the question entirely in ${language}, naturally and culturally appropriate.
- Make it original — avoid clichés, repeats, or generic phrasing.
- Match the tone and intensity of the selected level ("${level}").
- Do not include any explanation, formatting, or comments — only the question itself.
- The question must be humanly possible, exciting, and something players would actually enjoy or fear doing.
- Prioritize fun, shock, laughter, vulnerability, or emotional connection — depending on context.

Format:
<Only the question, no extras>

  `.trim();
}

// - Make sure the question is appropriate for the given level.
//   - Make sure the question is in the given language.
//   - Make they are fun and engaging, or sexual if the level is "sexual.
