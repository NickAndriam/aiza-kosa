
export async function loginPuter() {
  await puter.auth.signIn().then((res) => {
    puter.print("Signed in<br>" + JSON.stringify(res));
  });
}

export async function chatPuter(message) {
  console.log("Asking puter...: ", message);
  try {
    const response = await puter.ai.chat(message, { model: 'gpt-4o' });
    const content = response.message.content;
    // const content = "This is just a dummy message to test the UI"
    // console.log(content);
    return { ok: true, content };
  } catch (error) {
    console.log("Error chatting with puter:", error);
    return { ok: false, content: "Connection Error" };
  }
}

export async function speakPuter(message, language) {
  console.log("Asking puter...: ", message);
  try {
    const response = await puter.ai.txt2speech(message, language).then((audio) => {
      audio.play();
    });;
    // const content = response.message.content;
    console.log("Audio test", response)
    return response;
  } catch (error) {
    console.log("Error chatting with puter:", error);
    return undefined;
  }
}

export async function generatePuterImage(prompt) {
  console.log("Generating image with puter...");
  console.log("Prompt: ", prompt);
  try {
    const image = await puter.ai.txt2img(prompt)
    console.log("Image generated successfully: ", image.src);
    return { ok: true, url: image.src, prompt: prompt };
  } catch (error) {
    console.error("Error generating image:", error);
    return { ok: false, error: error.message };
  }
}

