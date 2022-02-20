export interface IPrice {
  id: number;
  symbol: string;
  metrics: { market_data: { price_usd: string } };
}
