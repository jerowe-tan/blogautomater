
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

    app.decorate({
      env,
      ctx,
    });

    return await app.fetch(request)
  },
}