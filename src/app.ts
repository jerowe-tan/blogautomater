import Elysia, { Context } from "elysia";
import Swagger from "./docs/Swagger";
import MainRoutes from "./routes/MainRoutes";
import { MOD_CONTEXT } from "./structure/WebTypes";


export const app = new Elysia({ aot: false })
.onTransform( ((ctx:MOD_CONTEXT<{startPerformance:number}>)=>{
	ctx.shared = {startPerformance:performance.now()};
}) as any  )
.onError(({ code, error }) => {
	console.log(code);
	return new Response(JSON.stringify({ error: error.toString() ?? code }), { status: 500 });
})
.onAfterResponse( ((ctx:MOD_CONTEXT<{startPerformance:number}>)=>{
	console.log(`A response on ${ctx.path} took ${performance.now() - (ctx.shared ? ctx.shared.startPerformance : 0)}ms`)
}) as any )
.use(MainRoutes)
.use(Swagger)