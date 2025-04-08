import Elysia from "elysia";
import {generateBlog, generateBlogTopic, suggestBlogTitle, suggestContent, suggestDescription, suggestTags} from "../../controller/Blog";

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
.post("/suggest-blog-title", suggestBlogTitle, {
  detail: {
    tags: ['Blog']
  }
})
.post("/suggest-description", suggestDescription, {
  detail: {
    tags: ['Blog']
  }
})
.post("/suggest-tags", suggestTags, {
  detail: {
    tags: ['Blog']
  }
})
.post("/suggest-content", suggestContent, {
  detail: {
    tags: ['Blog']
  }
})