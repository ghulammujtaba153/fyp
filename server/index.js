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

// index.js
import express, { json } from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { connection } from './database/db.js';
import dotenv from 'dotenv';
import router from './routes/patientRoutes/index.js';
import doctorRouter from './routes/doctorRoutes/index.js';
import conversationRouter from './routes/conversationRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('leave_room', (room) => {
    socket.leave(room);
    console.log(`User left room: ${room}`);
  });

  socket.on('send_message', ({ room, message }) => {
    io.to(room).emit('new_message', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(cors());
app.use(json());

connection();
app.use("/api/", router);
app.use('/api/doctors', doctorRouter);
app.use('/api/conversations', conversationRouter);

// Export the io instance
export { io };

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
