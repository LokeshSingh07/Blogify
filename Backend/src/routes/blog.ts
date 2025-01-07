import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';


type Bindings = {
  DATABASE_URL: string,
  JWT_SECRET: string
}
//  pass data from middleware to the route handle
type Variables = {
    userId: string
}

export const blogRouter = new Hono<{
    Bindings: Bindings,
    Variables: Variables
}>();



// Middleware   =>     extract the userid pass it down to the router
blogRouter.use('/*', async(c:any, next:any)=>{
    const authHeader = c.req.header('Authorization') || "";
    if(!authHeader){
        c.status(404);
        return c.json({message: "Token Not Found"});
    }

    const token = authHeader.split(" ", )[1];
    const decoded = await verify(token, c.env.JWT_SECRET);

    if(!decoded){
        c.status(401);
        return c.json({error: "Unauthorized"})
    }

    // pass the userId to the route handler
    console.log("userId : ", decoded);
    c.set("userId", decoded.id);

    await next();
})


// create a blog
blogRouter.post('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const userId = c.get("userId");
        const {title, description, coverImage} = await c.req.json();
    
        // TODO: zod validation
    
        const blog = await prisma.post.create({
            data: {
                title,
                description,
                coverImage,
                published: true,
                authorId: userId
            }
        })

        c.status(201);
        return c.json({
            message: 'Blog created successfully',
            blog
        })
    }
    catch(err){
        console.error(err);
        c.status(500);
        return c.json({message: "Error in creating blog", error: err})
    }
})


// update a blog
blogRouter.put('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const {id, title, description, coverImage, published} = await c.req.json();
    
        // TODO: zod validation
    
        const blog = await prisma.post.update({
            where: {
                id: id
            },
            data: {
                title,
                description,
                coverImage,
                published
            }
        })

        c.status(201);
        return c.json({
            message: 'Blog updated successfully',
            blog
        })
    }
    catch(err){
        console.error(err);
        c.status(500);
        return c.json({message: "Error in updating blog", error: err})
    }
})


// get all blogs
blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const blog = await prisma.post.findMany({});

        c.status(201);
        return c.json({
            message: "All blog fetched successfully",
            blog
        })
    }
    catch(err){
        console.error(err);
        c.status(500);
        return c.json({message: "Error fetching blog", error: err})
    }

})


// get a single blog
blogRouter.get('/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());


    try{
        const blogId = c.req.param('id');
        console.log("id : ", blogId);
    
        // TODO: zod validation
    
        const blog = await prisma.post.findFirst({
            where: {
                id: blogId
            }
        })
        if(!blog){
            c.status(404);
            return c.json({message: "Blog not found"})
        }

        c.status(201);
        return c.json({
            message: 'Blog fetched successfully',
            blog
        })
    }
    catch(err){
        console.error(err);
        c.status(500);
        return c.json({message: "Error fetching blog", error: err})
    }

})





