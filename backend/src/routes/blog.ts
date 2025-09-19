import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from "@akashnpm/medium-common";

//typescript
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
        datasourceUrl: string,

    }
    Variables: {
        userId: string
    }
}>();

//middleware
blogRouter.use('/*', async (c, next) => {
    // 1) get headers
    const authheader = c.req.header("authorization") || "";
    // 2) verify the header
    //@ts-ignore
    const user = await verify(authheader, c.env.JWT_SECRET)
    // 3) if the header is correct we can proceed
    if (user) {
        //@ts-ignore
        c.set("userId", user.id)
        await next()
    }
    // 4) if not, we return the user 403 status code
    else {
        c.status(403)
        return c.json({ error: "unauthorized" })
    }
})

// endpoints
blogRouter.post('/create', async (c) => {
    const body = await c.req.json();
    //zod vaildation
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    const authorId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        })
        return c.json({
            id: blog.id
        })
    }
    catch (error) {
        //@ts-ignore
        console.error(error)
        c.status(404)
        c.text("Blog is not created")
    }
})
// update endpoint
blogRouter.put('/update', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());


    try {
        const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })
        return c.json({
            id: blog.id
        })
    } catch (e) {
        c.status(404)
        c.text("Blog not updated")
    }

})
// todo add pagination // get all blog
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany()
    return c.json({
        blogs
    })
})

// get blog using Id
blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const id = c.req.param("id");
    const blog = await prisma.post.findFirst({
        where: {
            id: id
        },

    })
    return c.json({
        blog
    })
})
