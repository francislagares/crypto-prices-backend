import { app } from './app';
import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer(app);
const socketHandler = new Server(httpServer);

socketHandler.on('connection', socket => {
  socket.on('connect_error', () => {
    console.log('Connection error!');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected!');
  });

  console.log('Client connected!');
  socketHandler.emit('crypto', 'Hello Cryptos Client !');
});

httpServer.listen(3000);
