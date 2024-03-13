import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

 const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, "KIRANDEEP");
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
    console.log(token)
	c.set('userId', payload.id);
	await next()
});

blogRouter.post('/', async (c) => {
	const authorId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const post = await prisma.blog.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: Number(authorId)
		}
	});
    console.log(post)
	return c.json({
		id: post.id
	});
})

blogRouter.put('/', async (c) => {
	const authorId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	 const blog= await prisma.blog.update({
		where: {
			id: body.id,
			authorId: Number(authorId)
		},
		data: {
			title: body.title,
			content: body.content
		}
	});
    console.log(blog)

	return c.text('updated post');
});

//get all blogs
blogRouter.get("/bulk", async (c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const blogs = await prisma.blog.findMany();

    return c.json({
        blogs: blogs
    })
})


blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const blog = await prisma.blog.findFirst({
		where: {
			id: Number(id)
		}
	});

	return c.json(blog);
})


export default blogRouter;