import Elysia from "elysia";

export default new Elysia()
.get("/generate-blog", async (context)=>{
  return Response.json({message:"Hello World"});
},{
  detail: {
    tags: ['Blog']
  }
})