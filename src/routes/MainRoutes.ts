import Elysia from "elysia";
import Generate from "./list/Generate";
import FileUpload from "./list/FileUpload";

export default new Elysia({ prefix: "api/v1" })
.use(Generate)
.use(FileUpload);