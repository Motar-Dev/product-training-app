import express from 'express';
import cors from 'cors';

import { ENV } from './config/env';
import { clerkMiddleware } from '@clerk/express';

const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL })); // maybe remove the origin
app.use(clerkMiddleware()); // auth obj will be attached to the req
app.use(express.json()); // parses JSON request bodies.
app.use(express.urlencoded({ extended: true })); // parses from data.

app.get('/', (req, res) => {
  res.json({
    message:
      'Welcome to Product-Traning-App API - Powered by PostgreSQL, Drizzle ORM & Clerk Auth',
    endpoints: {
      users: '/api/users',
      products: '/api/products',
      comments: '/api/comments',
    },
  });
});

app.listen(ENV.PORT, () =>
  console.log(`Server is up and running on PORT:${ENV.PORT}`),
);
