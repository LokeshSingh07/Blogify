import { z } from 'zod'


// User Schema
export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name : z.string().optional()
})

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});


// blog Schema
export const createBlog = z.object({
    title: z.string().min(3).max(50),
    description: z.string().min(10).max(500),
    coverImage: z.string().optional(),
})
export const updateBlog = z.object({
    id: z.string().uuid(),
    title: z.string().min(3).max(50),
    description: z.string().min(10).max(500),
    coverImage: z.string().url(),
    published: z.boolean().optional()
})




// type inference in zod
export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>

export type CreateBlog = z.infer<typeof createBlog>
export type UpdateBlog = z.infer<typeof updateBlog>