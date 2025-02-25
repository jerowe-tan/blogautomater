import Elysia from "elysia";
import {generateBlog} from "../../controller/Blog";
import { fileUploadSample } from "../../controller/uploadSample";

export default new Elysia()

.post("/sample-upload", fileUploadSample , {
  detail: {
    tags: ['File']
  }
})