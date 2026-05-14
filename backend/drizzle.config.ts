import { defineConfig } from 'drizzle-kit';
import { ENV } from './src/config/env';

export default defineConfig({
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: ENV.DATABASE_URL!, // ! says we have always ENV.DATABASE_URL
  },
});
