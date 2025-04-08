import { MOD_CONTEXT } from "../../structure/WebTypes";
import { aiValidateId } from "../AiFunctions/Image/ImageClassification";


export async function  validateId({env, body}:MOD_CONTEXT<0, {[key:string]:File}>){
  let result = "";

  const scores:{[key:string]: {score:number}} = {}
  for(const key in body){
    //Check first if there is missing body
    if(!body[key]) {
      return Response.json({
        status: 422,
        message: "File not found in one of the body.",
      });
    };
    const score = await aiValidateId(env.AI, body[key]);
    scores[key] = {
      score,
    }
    //Then do the validation using AI
  }
  return Response.json({
    result:scores,
  })
}