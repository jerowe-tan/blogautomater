import Elysia from "elysia";
import GenerateBlog from "../../controller/GenerateBlog";

export default new Elysia()

.get("/generate-blog", GenerateBlog , {
  detail: {
    tags: ['Blog']
  }
})