import Elysia from "elysia";
import {generateBlog} from "../../controller/Blog";

export default new Elysia()

.post("/generate-blog", generateBlog , {
  detail: {
    tags: ['Blog']
  }
})