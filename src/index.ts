import {Env} from "bun";
import { app } from "./app"
import { Context } from "elysia";
// interface Env {
//   KV: Ai
// }


export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: Context,
  ): Promise<Response> {
    // env.AI
    return await app.fetch(request)
  },
}