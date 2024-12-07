import Elysia from "elysia";
import {generateBlog, generateBlogTopic} from "../../controller/Blog";

export default new Elysia()

.post("/generate-blog", generateBlog , {
  detail: {
    tags: ['Blog']
  }
})
.post("/generate-blog-topic", generateBlogTopic, {
  detail: {
    tags: ['Blog']
  }
})