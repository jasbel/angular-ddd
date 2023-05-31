import { ITotalizer, ITotalizerSingle } from '../models';

export const TotalizerSingleES: { [key in keyof Required<ITotalizerSingle>]: string } = {
  id: 'Id',
  typePay: 'Tipo de pago',
  totalSale: 'Total Venta',
  totalCollection: 'Total Recaudacion'
};

export const TotalizerES: { [key in keyof Required<ITotalizer>]: string } = {
  id: 'Id',
  collection: 'Tabla',
  amountTotal: 'Importe Total',
  total: 'Total',
  depositValues: 'Deposito de Valores',
  amount: 'Importe Final',
  printedTickets: 'Tickets Impresos',
  nonPrintedTickets: 'Tickets NO Impresos',
};
