import { MOD_CONTEXT } from "../structure/WebTypes";
import { aiBlogTextMDGenerator } from "./AiFunctions/Textgeneration/TextGenerationV1";

export default async (context:MOD_CONTEXT)=>{
  return aiBlogTextMDGenerator(context.env.AI , "Hello");
}