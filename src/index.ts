import { createAdapter, setupPrimary } from '@socket.io/cluster-adapter';
import { setupMaster, setupWorker } from '@socket.io/sticky';
import cluster from 'cluster';
import cors, { CorsOptions } from 'cors';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import { createServer } from 'http';
import os from 'os';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);

const CLIENT_URL = process.env.DEV
  ? 'http://localhost:5173'
  : 'https://sss-games.vercel.app';
const corsOptions: CorsOptions = {
  origin: CLIENT_URL,
  methods: ['GET', 'POST'],
  credentials: true,
};

app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response) => {
  console.log(`"/" requested at ${new Date()}`);
  res.send('Express Server!!');
});
app.get('/user', (req: Request, res: Response) => {
  console.log(`"/user" requested at ${new Date()}`);
  setTimeout(() => res.send({ name: 'Yotaro' }), 1000);
});

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  // setup sticky sessions
  setupMaster(httpServer, {
    loadBalancingMethod: 'least-connection',
  });

  // setup connections between the workers
  setupPrimary();

  // needed for packets containing buffers (you can ignore it if you only send plaintext objects)
  // Node.js < 16.0.0
  // cluster.setupMaster({
  //   serialization: 'advanced',
  // });
  // Node.js > 16.0.0
  cluster.setupPrimary({
    // @ts-ignore
    serialization: 'advanced',
  });

  const port = process.env.PORT || 8080;
  httpServer.listen(port, () => {
    if (process.env.DEV) {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    }
  });
  const numCPUs = os.cpus().length;

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker: { process: { pid: any } }) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);

  const httpServer = createServer();
  const io = new Server(httpServer, { cors: corsOptions });

  // use the cluster adapter
  io.adapter(createAdapter());

  // setup connection with the primary process
  setupWorker(io);

  io.on('connection', (socket) => {
    console.log(`socket client connected at ${new Date()}`);
    socket.on('message', (message) => {
      io.emit('message', `${message} (${new Date().toISOString()})`);
    });
  });
}
