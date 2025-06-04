
export async function loginPuter() {
  await puter.auth.signIn().then((res) => {
    puter.print("Signed in<br>" + JSON.stringify(res));
  });
}

export async function chatPuter(message) {
  console.log("Asking puter...: ", message);
  try {
    const response = await puter.ai.chat(message);
    const content = response.message.content;
    console.log(content);
    return content;
  } catch (error) {
    console.error("Error chatting with puter:", error);
    return undefined;
  }
}

export async function generatePuterImage(prompt) {
  console.log("Generating image with puter...");
  try {
    await puter.ai.txt2img(prompt).then((image) => {
      document.body.appendChild(image);
      return image
    });
  } catch (error) {
    console.error("Error generating image:", error);
  }
}

export default usePuter;
