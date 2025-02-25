import { Context } from "elysia";

export type MOD_CONTEXT<T = any, BODY = any> = Context & {env:Env, cloneRequest:Request, shared?:T} & {body:BODY}