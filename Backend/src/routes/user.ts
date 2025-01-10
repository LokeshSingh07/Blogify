import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { signinInput, signupInput } from '@nextian/blogify-common';
import { sign } from 'hono/jwt';



const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();



// signup
userRouter.post('/signup', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL   // wrangler.toml
    }).$extends(withAccelerate());

  
    const body = await c.req.json();

    // TODO: zod validation naad hashed the password
    const {success} = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({message: 'Invalid request body'});
    }

    let user;
    try{
        user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password,
                profileImage: `https://avatar.iran.liara.run/username?username=${body.name}`
            }
        })
    }
    catch(e){
        c.status(400)
        return c.json({
            message: 'User already registered',
        })
    }

    const token = await sign({id: user.id}, c.env.JWT_SECRET);

    c.status(201);
    return c.json({
        message: 'Account created successfully',
        user,
        jwt: token
    });
})



// signin
userRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const {email, password} = await c.req.json();
    const { success } = signinInput.safeParse({email, password});
    if (!success) {
        c.status(411);
        return c.json({message: 'Invalid request body'});
    }

    let user= await prisma.user.findFirst({
        where: {
        email,
        password
        }
    })

    if(!user){
        c.status(403) // unauthorized
        return c.json({
        message: 'Invalid credentials',
        })
    }

    const token = await sign({id: user.id}, c.env.JWT_SECRET)
    c.status(200);
        return c.json({
        message: 'User logged in successfully',
        user,
        jwt: token
    });
})





export { userRouter };