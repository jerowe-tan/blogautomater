import Elysia from "elysia";
import Generate from "./list/Generate";
import FileUpload from "./list/FileUpload";
import cors from "@elysiajs/cors";


const whiteList = [
  /.*\.tmsph\.app$/,
  /.*tmsph-sdi.workers\.dev$/,
  /.*tmsph-lms-customer\.pages\.dev$/,
  /.*tmsph-lms-api\.toyota-mobilitysolutions\.workers\.dev$/,
  /.*\.toyotalogistics\.com\.ph$/,
  /.*127.0.0.1:8787$/,
  /.*localhost:8787$/,
  /.*localhost:4321$/,
  /.*localhost:5173$/,
  /.*localhost:9669$/,
  /.*preview.crs-blog-content.pages.dev$/,
];

const corsMiddleware = {
  origin: (request: Request) => {
    let headerOrigin = request.headers.get("host")
    console.log(`CORS origin: ${headerOrigin}`);

    if(!headerOrigin)
      return true;

    return whiteList.some((allowedOrigin) => {
      if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(headerOrigin);
      }
      return allowedOrigin === headerOrigin;
    });
  },
  methods: ["GET", "POST", "PATCH", "PUT", "OPTIONS"],
  allowedHeaders: true as true,
  exposedHeaders: ["X-Request-Id", "X-Response-Time"],
  credentials: false,
  maxAge: 3600,
};

export default new Elysia({ prefix: "api/v1" })
.use(cors(corsMiddleware))
.use(Generate)
.use(FileUpload);