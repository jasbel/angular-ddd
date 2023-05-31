import { sId } from 'src/app/utils';

export enum EMode {
  minimum = 'Modo Mínimo',
  capture = 'Modo Captura',
  analysis = 'Modo Análisis',
}
export type TMode = keyof typeof EMode;

export enum ETypePay {
  cash = 'Efectivo',
  creditCard = 'Tarjeta de Credito',
}
export type TTypePay = keyof typeof ETypePay;

export interface ITotalizerSingle {
  id: sId;
  typePay: TTypePay;
  totalSale: number | null;
  totalCollection: number;
}

export interface ITotalizer {
  id: sId;
  collection: ITotalizerSingle[];
  amountTotal: number;
  total: number;
  depositValues: number;
  amount: number;
  printedTickets: number;
  nonPrintedTickets: number;
}

export interface ITotalizerInfo
  extends Pick<
    ITotalizer,
    'id' | 'collection' | 'total' | 'amountTotal' | 'depositValues' | 'amount' | 'printedTickets' | 'nonPrintedTickets'
  > {}
