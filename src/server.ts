import { app } from './app';
import { createServer } from 'http';
import { Server } from 'socket.io';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

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

axios
  .get(process.env.CRYPTO_LIST_URL as string)
  .then(response => {
    const pricesList = response.data.data.map(item => {
      return {
        id: item.id,
        name: item.symbol,
        price: item.metrics.market_data.price_usd,
      };
    });
    console.log(pricesList);
  })
  .catch(err => {
    console.log(err);
  });

httpServer.listen(process.env.PORT);
