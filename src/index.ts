import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const httpServer = createServer(app);

const CLIENT_URL = process.env.DEV
  ? 'http://localhost:5173'
  : 'https://sss-games.vercel.app';
const corsOption = {
  origin: CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOption));

const io = new Server(httpServer, { cors: corsOption });
io.on('connection', (socket: Socket) => {
  console.log(`socket client connected at ${new Date()}`);
  socket.on('message', (message) => {
    io.emit('message', `${message} (${new Date().toISOString()})`);
  });
});

app.get('/', (req: Request, res: Response) => {
  console.log(`"/" requested at ${new Date()}`);
  res.send('Express Server!!');
});
app.get('/user', (req: Request, res: Response) => {
  console.log(`"/user" requested at ${new Date()}`);
  setTimeout(() => res.send({ name: 'Yotaro' }), 1000);
});

const port = process.env.PORT || 8080;
httpServer.listen(port, () => {
  if (process.env.DEV) {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  }
});
