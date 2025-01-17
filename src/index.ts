import express, { Request, Response } from 'express';

const app = express();
const port: number = parseInt(process.env.PORT ?? '3000', 10);

app.get('/', (req: Request, res: Response): void => {
  res.send('Hello World');
});

const server = app.listen(port, (): void => {
  console.log(`Server is running on http://localhost:${port}`);
});

server.on('error', (error: NodeJS.ErrnoException): void => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use`);
    process.exit(1);
  }
  throw error;
});

// Handle termination signals
const shutdown = (): void => {
  console.log('Received shutdown signal, shutting down gracefully...');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
