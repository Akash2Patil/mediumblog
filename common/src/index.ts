import  z  from "zod";

export const signupInput = z.object({
    email : z.email(),
    password : z.string().min(6),
})
export const signinInput = z.object({
    email : z.email(),
    password : z.string().min(6),
})
export const createBlogInput = z.object({
    title : z.string(),
    content : z.string(),
})
export const updateBlogInput = z.object({
    title : z.string(),
    content : z.string(),
    id: z.string()
})

// type inference in zod
export type SignupInput = z.infer<typeof signupInput>
// type inference in zod
export type SigninInput = z.infer<typeof signinInput>
// type inference in zod
export type CreateBlogInput = z.infer<typeof createBlogInput>
// type inference in zod
export type UpdateBlogInput = z.infer<typeof updateBlogInput>