export async function aiValidateId(AI:Ai, fileId:File|File[]){
  const model = "@cf/llava-hf/llava-1.5-7b-hf";
  //Convert File to ArrayBuffer
  let files:File[] = [];
  if(!Array.isArray(fileId)){
    files = [fileId];
  }else{
    files = fileId;
  }
  const bufferFiles:Array<number> = [];
  for(const file of files){
    const arrayBuffer = await file.arrayBuffer();
    const buffers = [... new Uint8Array(arrayBuffer)];
    bufferFiles[bufferFiles.length] = buffers as any;
  }

  //Schema
  const inputs = {
    image: bufferFiles[0],
    prompt: "Check if the image is an actual valid Government Identifcation Card (or ID for short). Please answer only from scale of 0 to 10, base on the rating of how accurate it is, no more no less. Example 1, or 10, or 7 or, 6.5. The maximum 10 is the most accurate meaning the image provided is valid Government ID and the lowest is 0 meaning not related or totally not valid id. Thank you",
  }

  //Run AI Model
  const response = await AI.run(model, inputs as any);
  console.log(response);
  const score =  Number(response.description.trim());
  return score;
}