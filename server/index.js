// import express, {json} from 'express';
// import cors from 'cors';
// import { connection } from './database/db.js';
// import dotenv from 'dotenv';
// import router from './routes/patientRoutes/index.js';
// import doctorRouter from './routes/doctorRoutes/index.js';
// import conversationRouter from './routes/conversationRoutes.js';



// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(json());

// connection();
// app.use("/api/", router)
// app.use('/api/doctors', doctorRouter);
// app.use('/api/conversations', conversationRouter);

// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });

///////////////
import express, { json } from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { connection } from './database/db.js';
import dotenv from 'dotenv';
import router from './routes/patientRoutes/index.js';
import doctorRouter from './routes/doctorRoutes/index.js';
import conversationRouter from './routes/conversationRoutes.js';
import videoCallRouter from './routes/videoCallRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const server = http.createServer(app);
export const io = new Server(server, {   // Exporting io instance here
  cors: {
    origin: '*',
  },
});

const onlineUsers = new Map();

// io.on('connection', (socket) => {
//   console.log(`Socket connected: ${socket.id}`);

//   socket.on('user_online', (userId) => {
//     console.log(`User ${userId} connected with socket ID ${socket.id}`);
//     onlineUsers.set(userId, socket.id);
//     io.emit('onlineUsers', Array.from(onlineUsers.keys()));
//   });

//   socket.on('disconnect', () => {
//     console.log(`Socket disconnected: ${socket.id}`);
//     let userId;
//     for (const [key, value] of onlineUsers.entries()) {
//       if (value === socket.id) {
//         userId = key;
//         break;
//       }
//     }
//     if (userId) {
//       console.log(`User ${userId} disconnected with socket ID ${socket.id}`);
//       onlineUsers.delete(userId);
//       io.emit('onlineUsers', Array.from(onlineUsers.keys()));
//     }
//   });
// });


app.use(cors());
app.use(json());

connection();
app.use("/api/", router);
app.use('/api/doctors', doctorRouter);
app.use('/api/conversations', conversationRouter);
app.use('/api/videoCalls', videoCallRouter);

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
