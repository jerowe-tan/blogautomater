
import { MOD_CONTEXT } from "../structure/WebTypes";

export async function  fileUploadSample({env, body}:MOD_CONTEXT<0, {[key:string]:File}>):Promise<Response> {
  let result = "";
  for(const key in body){
    if(!body[key]) throw new Error(`Missing file ${key}`);
    console.log("File With Body is uploading", key, body[key]);
    const resultUpload = await env.SUSUKO.put("sample/"+body[key].name, body[key]);
    console.log("file uploaded", key, resultUpload?.size);
    result = result+"File uploaded"+key;
  }
  return new Response(JSON.stringify({body, result}), {status:200});
}