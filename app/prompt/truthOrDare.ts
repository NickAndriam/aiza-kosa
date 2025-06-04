export default function truthOrDare({
  type,
  level,
  language,
}: {
  type: "truth" | "dare";
  level: string;
  language: string;
}) {
  return `Give me a ${type} question based on these settings: type is dare, level is ${level}, and language is ${language}. Only give me the question, no explanation.
  - Make sure the question is appropriate for the given level.
  - Make sure the question is in the given language.
  - Make sure the question is a ${type}, not a truth.
  - Make they are fun and engaging, or sexual if the level is "sexual.
  `;
}
