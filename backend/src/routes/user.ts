import { signinInput, signupInput } from "@kirandeep_7889/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

 const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
    }
}>();

userRouter.post('/signup', async (c) => {
   
   const body=await c.req.json();
   const {success} =signupInput.safeParse(body);

   if(!success){
      c.status(411);
      return c.json({
        message : "Inputs not correct"
      })
   }
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
      },
    });
  
    const token = await sign({ id: user.id }, "KIRANDEEP")
  
    return c.json({
      jwt: token
    })
})
  
userRouter.post('/signin', async (c) => {
    
  const body=await c.req.json();
  const {success} =signinInput.safeParse(body);

  if(!success){
     c.status(411);
     return c.json({
       message : "Inputs not correct"
     })
  }
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const user = await prisma.user.findUnique({
        where: {
            username: body.username,
    password: body.password
        }
    });

    if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, "KIRANDEEP");
    return c.json({ jwt });
})


export default  userRouter;