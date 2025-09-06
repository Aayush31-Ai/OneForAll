import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function generateText(file, prompt) {
  // let contents = [];

  // // Case 1: Agar input ek string prompt hai (sirf text)
  // if (typeof input === "string") {
  //   contents.push({ text: input });
  // }

  // // Case 2: Agar input ek file path hai
  // else if (input?.filePath) {
  //   const fileBuffer = fs.readFileSync(input.filePath);
  //   const ext = path.extname(input.filePath).toLowerCase();

  //   let mimeType = "application/octet-stream"; // fallback

  //   if (ext === ".pdf") {
  //     mimeType = "application/pdf";
  //   } else if ([".jpg", ".jpeg"].includes(ext)) {
  //     mimeType = "image/jpeg";
  //   } else if (ext === ".png") {
  //     mimeType = "image/png";
  //   }

  //   contents = [
  //     { text: input.prompt || "Analyze this file" }, // agar prompt diya hai to use karlo
  //     {
  //       inlineData: {
  //         mimeType,
  //         data: fileBuffer.toString("base64"),
  //       },
  //     },
  //   ];
  // }

  // // AI Request

     const contents = [
        { text: prompt },
        {
            inlineData: {
                mimeType: file?.mimetype,
                data: file?.buffer.toString("base64")
            }
        }
    ];
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents:contents,
    config: {
      temperature: 0.5,
      maxOutputTokens: 1200,
      systemInstructions: `
        - You are a helpful assistant
        - Give answer in less than 100 words
        - Keep answers crisp and precise
      `,
    },
  });

  return response.text;
}

export default generateText;
