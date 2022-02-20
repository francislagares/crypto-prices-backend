import { app } from './app';
import { createServer } from 'http';
import { Server } from 'socket.io';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { IPrice } from './types/IPrices';

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

const getPrices = () => {
  axios
    .get(process.env.CRYPTO_LIST_URL as string)
    .then(response => {
      const pricesList = response.data.data.map((item: IPrice) => {
        return {
          id: item.id,
          name: item.symbol,
          price: item.metrics.market_data.price_usd,
        };
      });

      socketHandler.emit('crypto', pricesList);
    })
    .catch(err => {
      console.log(err);
    });
};

setInterval(() => {
  getPrices();
}, 5000);

httpServer.listen(process.env.PORT);
