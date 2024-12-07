import { HttpNativePlate } from "../helpers/HttpNative";
import { DateNavigator, transformDate } from "../helpers/Math";
import { decryptJWT, generateJWT } from "../helpers/t2/JWT";
import { requiredFormData } from "../middlewares/Validator";
import { MOD_CONTEXT } from "../structure/WebTypes";
import { aiBlogTextMDGenerator } from "./AiFunctions/Textgeneration/TextGenerationV1";
import { GoogleDrive } from "./Storage/GoogleDrive";

export async function  generateBlog({env, body}:MOD_CONTEXT<0, {prompt:string}>){
  if(!requiredFormData(body, ["prompt"])){
    return Response.json({
      message:"Invalid Form"
    }, {status:422})
  }
  const raw = await aiBlogTextMDGenerator(env.AI , body.prompt);
  const mdTitle = checkTitleOfMdFile(raw);
  const mdFile = StringToMDFile(raw);
  const fileName = `blog_${transformDate(Date.now(), "iso")}:-:${toFileNameConvention(mdTitle)}.md`;

  const drive = new GoogleDrive(env);
  await drive.login(true);
  drive.setDriveId("1jjivGwrkJxYvGadrUVvGwV-Ny2VnK6UT");
  const uploadResult = await drive.store(mdFile, fileName);
  if(uploadResult.status == 200){
    return raw;
  }
  return uploadResult;
}

function checkTitleOfMdFile(mdString:string){
  const result = [...mdString.matchAll(/^#\s.*$/gm)].map(x=>x[0])[0].replace(/^#\s+/, "");
  console.log(result);
  return result;
}

function toFileNameConvention(string:string){
  return string.replaceAll(/[^\w\s-]/g, "").replaceAll(/\s+/g, "-").toLowerCase();
}

function StringToMDFile(string:string){
  return new Blob([Buffer.from(string, 'utf-8')], {"type":"text/markdown"});
}