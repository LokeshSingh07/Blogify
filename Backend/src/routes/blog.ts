import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { createBlog, updateBlog } from '@nextian/blogify-common';
import { verify } from 'hono/jwt';
import { uploadToCloudinary } from '../utils/cloudinary';

type Bindings = {
  DATABASE_URL: string,
  JWT_SECRET: string,
  CLOUDINARY_CLOUD_NAME: string,
  CLOUDINARY_UPLOAD_PRESET: string
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
    // console.log("userId : ", decoded);
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
        
        // parse data
        const formData=  await c.req.formData();
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const coverImage = formData.get("coverImage") as File | null;

        // console.log("coverImage : ", coverImage);

        // const { success } = createBlog.safeParse({title, description, coverImage});
        if(!title || !description || !coverImage){
            c.status(411);
            return c.json({message: "Invalid request body"})
        }
    
        // TODO: zod validation

        // TODO: Upload file to Cloudinary
        const coverImageLink:any = await uploadToCloudinary(coverImage, c.env);

        const blog = await prisma.post.create({
            data: {
                title,
                description,
                coverImage: coverImageLink,
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
        const { success } = updateBlog.safeParse({id, title, description, coverImage, published});
        if(!success){
            c.status(411);
            return c.json({message: "Invalid request body"})
        }
    
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
// TODO: Add pagination
blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const page = Number(c.req.query('page')) || 1; 
        const limit = Number(c.req.query('limit')) || 10;
        const skip = (page - 1) * limit;

        const blog = await prisma.post.findMany({
            skip,
            take: limit,
            orderBy: {createdAt: 'desc'},
            include: {
                author: {
                    select: {
                        name: true,
                        profileImage: true
                    }
                }
            }
        });
        // console.log("blog: ", blog);

        const totalBlogs = await prisma.post.count();

        c.status(201);
        return c.json({
            message: "All blogs fetched successfully",
            blog,
            pagination: {
                total: totalBlogs,
                page,
                limit,
                totalPages: Math.ceil(totalBlogs / limit)
            }
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
        // console.log("id : ", blogId);
    
        // TODO: zod validation
    
        const blog = await prisma.post.findFirst({
            where: {
                id: blogId,
                published: true
            },
            select: {
                title: true,
                description: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                        profileImage: true,
                        bio: true
                    }

                }
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




// delete a blog
// TODO: add validation and checks
blogRouter.delete('/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const userId = c.get("userId");
        const blogId = c.req.param('id');

        const blog = await prisma.post.delete({
            where: {
                id: blogId
            }
        })
        
        c.status(200); 
        return c.json({
            message: 'Blog deleted successfully',
            blog
        })

    }
    catch(err){
        console.error(err);
        c.status(500);
        return c.json({message: "Error deleting blog", error: err})
    }
})


