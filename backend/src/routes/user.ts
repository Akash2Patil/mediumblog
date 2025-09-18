import { Hono } from "hono";
import { PrismaClient } from '../generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt';
import { signupInput, signinInput } from "@100xdevs/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: String,
    JWT_SECRET: String
  }
}>();


userRouter.post('/signup', async (c) => {
  const body = await c.req.json()
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct"
    })
  }
  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password
      }
    })
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ jwt: token })
  }
  catch (error) {
    //@ts-ignore
    console.error(error);
    c.status(403)
    return c.text('Invaild')
  }
})


userRouter.post('/signin', async (c) => {
  const body = await c.req.json()
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct"
    })
  }
  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findFirst({
      //@ts-ignore
      where: {
        email: body.email,
        password: body.password

      }
    });

    if (!user) {
      c.status(403);
      c.json({ error: "user not found" })
    }
    //@ts-ignore
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt })
  }
  catch {
    c.status(403);
    return c.text('Invalid')
  }
})