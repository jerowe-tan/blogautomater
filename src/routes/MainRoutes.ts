import Elysia from "elysia";
import Generate from "./list/Generate";

export default new Elysia({ prefix: "api/v1" })
.use(Generate);