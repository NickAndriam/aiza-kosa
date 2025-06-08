export function translationPrompt(question: string, language: string) {
  return `
    Translate this "${question}" into ${language}
    Output:
    Only return the translation text.
    No labels. No extra words. No formatting. Just the sentence.
    `;
}
