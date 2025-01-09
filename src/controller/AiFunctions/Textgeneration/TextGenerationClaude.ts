import Anthropic from "@anthropic-ai/sdk";
import masterOfSEO from "../Rules/masterOfSEO";

export async function aiBlogTextMDGenerator(apiKey:string, topic:string){
  // const tasks = [];
  const model = "claude-3-5-sonnet-latest";
  const maxToken = 2048;
  // const system = masterOfSEO.content;
  const system = "You are a lovely anime character but tsundere";

  const claudePayload = {
    model,
    max_tokens:maxToken,
    temperature: 0,
    system,
    messages: [
      {
        "role": "user",
        "content": [
            {
            "type": "text",
            "text": "I Love You",
            }
        ]
      }
    ]
  };
  
  const anthropic = new Anthropic({apiKey:apiKey});
  const result = await anthropic.messages.create(claudePayload as any);
  console.log(result);
  return "sample";
}
