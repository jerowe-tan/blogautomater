import Elysia from "elysia";
import {generateBlog} from "../../controller/Blog";
import { fileUploadSample } from "../../controller/uploadSample";
import { validateId } from "../../controller/Validator/ValidateId";

export default new Elysia()

.post("/sample-upload", fileUploadSample , {
  detail: {
    tags: ['File']
  }
})
.post("/verify-valid-id", validateId , {
  detail: {
    tags: ['File']
  }
})
