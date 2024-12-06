import { Context } from "elysia";

export type MOD_CONTEXT<T = any, BODY = any> = Context & {env:ENV, cloneRequest:Request, shared?:T} & {body:BODY}


export interface ENV{
  AI:Ai,
  GOOGLE_DRIVE_CLIENT_EMAIL:string,
  GOOGLE_DRIVE_CLIENT_ID:string,
  GOOGLE_DRIVE_PRIVATE_KEY:string,
}