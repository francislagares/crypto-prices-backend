import { Request, Response } from 'express';

function getCrypto(req: Request, res: Response): void {
  const cryptoId = req.params.id;

  res.json({
    status: 200,
    id: cryptoId,
  });
}

export default {
  getCrypto,
};
