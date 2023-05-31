import { sId } from 'src/app/utils';
import { ITotalizerInfo, ITotalizerSingle, TTypePay } from './totalizer.interface';

export class TotalizerSingleModel implements ITotalizerSingle {
  id: sId;
  typePay: TTypePay;
  totalSale: number | null;
  totalCollection: number;

  constructor(m?: TotalizerSingleModel) {
    this.id = m?.id! || null;
    this.typePay = m?.typePay || null!;
    this.totalSale = m?.totalSale || null;
    this.totalCollection = m?.totalCollection || null!;
  }
}

export class TotalizerInfoModel implements ITotalizerInfo {
  id: sId;
  collection: TotalizerSingleModel[];
  total: number;
  depositValues: number;
  amount: number;
  printedTickets: number;
  nonPrintedTickets: number;
  amountTotal: number;

  constructor(m?: TotalizerInfoModel) {
    this.id = m?.id! || '';
    this.collection = m?.collection || [];
    this.total = m?.total || null!;
    this.amountTotal = m?.amountTotal || null!;
    this.depositValues = m?.depositValues || null!;
    this.amount = m?.amount || null!;
    this.printedTickets = m?.printedTickets || null!;
    this.nonPrintedTickets = m?.nonPrintedTickets || null!;
  }
}
