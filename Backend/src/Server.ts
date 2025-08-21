import { connectDB } from './config/Db';
import { env } from './config/env';
import app from './App';

async function start() {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`Server listening on http://localhost:${env.port}`);
  });
}

start().catch((e) => {
  console.error(e);
  process.exit(1);
});
