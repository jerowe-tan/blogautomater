import swagger from "@elysiajs/swagger";
import Elysia from "elysia";


export const app = new Elysia()
.use(swagger({
	path: '/',
	documentation: {
		info: {
			title: 'Blog Automation',
			description: "I'm tired of doing things manually so I created an automation",
			termsOfService: "https://tmsph.app/terms-service",
			contact: {
				name: "Me, Myself and I",
				url: "https://toyotalogistics.com.ph",
				email: "j.tan@toyota-mobilitysolutions.ph"
			},
			version: '0.0.1',
		},
		tags: [
			{
				name: 'Blog',
				description: 'Create Blogs Using AI'
			},
		],
	}
}))