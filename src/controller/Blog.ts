import { HttpNativePlate } from "../helpers/HttpNative";
import { DateNavigator, transformDate } from "../helpers/Math";
import { decryptJWT, generateJWT } from "../helpers/t2/JWT";
import { requiredBody } from "../middlewares/Validator";
import { MOD_CONTEXT } from "../structure/WebTypes";
import { aiBlogTextMDGenerator, aiBlogTopicGenerator, aiGenerateKeywords, aiGenerateSummary } from "./AiFunctions/Textgeneration/TextGenerationV1";
import { aiSuggestBlogContent, aiSuggestBlogTitle, aiSuggestDescription, aiSuggestKeywords } from "./AiFunctions/Textgeneration/TextGenerationV2";
// import { aiBlogTextMDGenerator } from "./AiFunctions/Textgeneration/TextGenerationClaude";
import { GoogleDrive } from "./Storage/GoogleDrive";

export async function  generateBlog({env, body}:MOD_CONTEXT<0, {topic:string}>){
  if(!requiredBody(body, ["topic"])){
    return Response.json({
      message:"Invalid Form"
    }, {status:422})
  }
  const raw = await aiBlogTextMDGenerator(env.AI, body.topic);
  const mdTitle = checkTitleOfMdFile(raw);
  const mdSummary = await aiGenerateSummary(env.AI, raw);
  const mdKeywords = await aiGenerateKeywords(env.AI, raw);
  const modRaw = addMetaDescription(raw, mdTitle, mdSummary, mdKeywords) + raw;
  const mdFile = StringToMDFile(modRaw);
  const fileName = `blog_${transformDate(Date.now(), "iso")}:-:${toFileNameConvention(mdTitle)}.md`;

  const drive = new GoogleDrive(env);
  await drive.login(true);
  drive.setDriveId("1jjivGwrkJxYvGadrUVvGwV-Ny2VnK6UT");
  const uploadResult = await drive.store(mdFile, fileName);
  if(uploadResult.status == 200){
    return modRaw;
  }
  return uploadResult;
}

function addMetaDescription(raMdString:string, title:string, summary:string, keywords:string){
  const toAdd =`---
title: "${JSON.stringify(title).slice(1, -1)}"
author: ["TMSPH"]
published: ${transformDate(Date.now(), "yyyy-mm-dd")}
keywords: [${keywords}]
type: Blog
description: ${summary}
---\n`;
return toAdd;
}

export async function generateBlogTopic({env, body}:MOD_CONTEXT<0, {newsData:string}>){
  if(!requiredBody(body, ["newsData"])){
    return Response.json({
      message:"Invalid Form"
    }, {status:422})
  }

  return aiBlogTopicGenerator(env.AI, body.newsData);
}

export async function suggestBlogTitle({env, body}:MOD_CONTEXT<0, {prompt:string}>){
  if(!requiredBody(body, ["prompt"])){
    return Response.json({
      message:"Invalid Form"
    }, {status:422})
  }
  const streamText = await aiSuggestBlogTitle(env.AI, body.prompt);
  return new Response(
    streamText,
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      }
    }
  );
}

export async function suggestDescription({env, body}:MOD_CONTEXT<0, {prompt:string}>){
  if(!requiredBody(body, ["prompt"])){
    return Response.json({
      message:"Invalid Form"
    }, {status:422})
  }

  const streamText = await aiSuggestDescription(env.AI, body.prompt);

  return new Response(
    streamText,
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      }
    }
  );
}

export async function suggestTags({env, body}:MOD_CONTEXT<0, {prompt:string}>){
  if(!requiredBody(body, ["prompt"])){
    return Response.json({
      message:"Invalid Form"
    }, {status:422})
  }
  const text = await aiSuggestKeywords(env.AI, body.prompt);
  return new Response(text)
}

export async function suggestContent({env, body}:MOD_CONTEXT<0, {prompt:string}>){
  if(!requiredBody(body, ["prompt"])){
    return Response.json({
      message:"Invalid Form"
    }, {status:422})
  }
  const streamText = await aiSuggestBlogContent(env.AI, body.prompt);

  return new Response(streamText, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}



//----------------- Utility Functions -----------------//
function checkTitleOfMdFile(mdString:string){
  const result = [...mdString.matchAll(/^#\s.*$/gm)].map(x=>x[0])[0].replace(/^#\s+/, "");
  return result;
}

function toFileNameConvention(string:string){
  return string.replaceAll(/[^\w\s-]/g, "").replaceAll(/\s+/g, "-").toLowerCase();
}

function StringToMDFile(string:string){
  return new Blob([Buffer.from(string, 'utf-8')], {"type":"text/markdown"});
}

