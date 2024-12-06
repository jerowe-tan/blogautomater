import Elysia from "elysia";
import Swagger from "./docs/Swagger";
import MainRoutes from "./routes/MainRoutes";


export const app = new Elysia({ aot: false })
.trace(async ({ onHandle }) => {
	onHandle(({ begin, onStop }) => {
		onStop(({ end }) => {
			console.log('Handle took', end - begin, 'ms')
		})
	})
})
.onError(({ code, error }) => {
	console.log(code);
	return new Response(JSON.stringify({ error: error.toString() ?? code }), { status: 500 });
})
.onAfterResponse(() => {
	console.log('Response', performance.now())
})
.use(MainRoutes)
.use(Swagger)