import express from 'express';
import cryptosRouter from '../routes/cryptos';
import indexRouter from '../routes';

const app = express();

// Middlewares...
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes...
app.use('/', indexRouter);
app.use('/cryptos/profile/', cryptosRouter);
app.use('/cryptos/market-data/', cryptosRouter);

export { app };
