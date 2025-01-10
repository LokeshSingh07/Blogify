import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';


type Bindings = {
  DATABASE_URL: string,
  JWT_SECRET: string
}
type Variables = {}

const app = new Hono<{
  Bindings: Bindings,
  Variables: Variables
}>()



/*
  POST /api/v1/user/signup
  POST /api/v1/user/signin
  POST /api/v1/blog
  PUT /api/v1/blog
  GET /api/v1/blog/:id
  GET /api/v1/blog/bulk
*/

app.get('/', (c) => {
  return c.text('Welcome to Blogify❤️');
})
app.use(
  '/api/v1/*',
  cors({
    origin: ['http://localhost:5173'],
  })
)

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);









export default app;