import { BASE64EX_STRING } from "../../../helpers/Cryptographic";
import masterOfSEO from "../Rules/masterOfSEO";

export async function aiBlogTextMDGenerator(AI:Ai, prompt:BASE64EX_STRING){
  // const tasks = [];
  const model = "@cf/meta/llama-3.2-11b-vision-instruct";

  const message = [
    masterOfSEO,
    {
      role: "user",
      content: prompt,
    },
  ];

  let response = await AI.run(model as any, message as any);
  // tasks.push({ inputs: simple, response });
  return response;
}