import express from 'express';
import cryptosController from '../controllers/cryptos.controller';

const cryptosRouter = express.Router();

cryptosRouter.get('/:id', cryptosController.getCrypto);

export default cryptosRouter;
