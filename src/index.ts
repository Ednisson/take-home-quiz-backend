import 'reflect-metadata';
import express, {Application} from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import cors from 'cors';
import { AppDataSource } from './data-source';
import { LeadResolver } from './resolvers/LeadResolver';

async function main() {
  // Initialize database
  await AppDataSource.initialize();
  console.log('Database connected');

  // Build GraphQL schema
  const schema = await buildSchema({
    resolvers: [LeadResolver],
    validate: true,
  });

  // Create Apollo Server
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  await server.start();

  // Create Express app
  const app = express() as Application;
  
  app.use(cors());
  
  // Apply GraphQL middleware
  server.applyMiddleware({ app: app as any, path: '/graphql' });

  const PORT = process.env.PORT || 4000;
  
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

main().catch(error => {
  console.error('Error starting server:', error);
  process.exit(1);
});