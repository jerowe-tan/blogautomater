
import { app } from "./app"
import { Context } from "elysia";
interface Env {
  AI: Ai
}


export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: Context,
  ): Promise<Response> {
    if (new URL(request.url).pathname === "/favicon.ico") {
      return new Response(null, { status: 204 });
    }

    const tasks = [];

    // prompt - simple completion style input
    let simple = {
      prompt: 'Tell me a joke about Cloudflare'
    };
    let response = await env.AI.run('@cf/google/gemma-7b-it-lora', simple);
    tasks.push({ inputs: simple, response });
    console.log(response);

    app.decorate({
      env,
      ctx,
    });

    return await app.fetch(request)
  },
}