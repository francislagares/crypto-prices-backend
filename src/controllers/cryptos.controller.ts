import { Request, Response } from 'express';
import axios from 'axios';

function getCrypto(req: Request, res: Response): void {
  const cryptoId = req.params.id;

  axios
    .get(`${process.env.BASE_URL}/${cryptoId}/profile`, {
      headers: {
        'x-messari-api-key': process.env.API_KEY as string,
      },
    })
    .then(response => {
      res.json(response.data.data);
    })
    .catch(err => {
      res.json({
        error: true,
        message: 'Error Fetching Prices Data From API',
        errorDetails: err,
      });
    });
}

export default {
  getCrypto,
};
