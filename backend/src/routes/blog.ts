import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from 'hono/jwt';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
        datasourceUrl: string,

    }
    Variables:{
        userId :string
    }
}>();

//middleware
blogRouter.use('/*', async (c, next) => {
    // get headers
    // verify the header
    // if the header is correct we can proceed
    // if not, we return the user 403 status code
    const authheader = c.req.header("authorization") || "";
    //@ts-ignore
    const user = await verify(authheader, c.env.JWT_SECRET)
    if (user) {
        //@ts-ignore
        c.set("userId", user.id)
        await next()
    }
    else {
        c.status(403)
        return c.json({ error: "unauthorized" })
    }
})

// endpoints
blogRouter.post('/', async (c) => {
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json()
try{
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
catch(error){
    //@ts-ignore
    console.error(error)
    c.status(404)
    c.text("Blog is not created")
}
})

blogRouter.put('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();

    try{
    const blog = await prisma.post.update({
        where: {
            id : body.id
        },
        data:{
            title: body.title,
            content: body.content,
        }
    })
    return c.json({
        id: blog.id
    })
}catch(e){
    c.status(404)
    c.text("Blog not updated")
}

})

blogRouter.get('/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const id =  c.req.param("id");
    const blog = await prisma.post.findFirst({
        where: {
            id : id
        },

    })
    return c.json({
        blog
    })
})
// todo add pagination
blogRouter.get('/bulk', async(c) => {
     const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());  
    const blogs = await prisma.post.findMany()
    return c.json({
        blogs
    })
})