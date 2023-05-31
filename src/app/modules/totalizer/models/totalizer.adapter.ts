import { sId } from 'src/app/utils';
import { TotalizerInfoModel, TotalizerSingleModel } from './totalizer.model';
import { ETypePay, ITotalizerSingle, TTypePay } from './totalizer.interface';

export interface IAdapter<TL = unknown, TC = TL, TU = TC> {
  adaptOne(item: any): TL;
  adaptAll(data: any): TL[];
  adaptCreateApi(item: any): TC;
  adaptUpdateApi(item: any): TU;
}

export class TotalizerSingleInfoApi {
  id: sId | null;
  tipo_pago: TTypePay | null;
  total_venta: number | null;
  total_recaudacion: number | null;

  constructor(m?: TotalizerSingleInfoApi) {
    this.id = m?.id || null;
    this.tipo_pago = m?.tipo_pago || null;
    this.total_venta = m?.total_venta || null;
    this.total_recaudacion = m?.total_recaudacion || null;
  }

  static toModel(ma: TotalizerSingleInfoApi): ITotalizerSingle {
    return new TotalizerSingleModel({
      id: ma.id || null!,
      totalCollection: ma.total_recaudacion || null!,
      totalSale: ma.total_venta || null,
      typePay: ma.tipo_pago || null!,
    });
  }
}

export class TotalizerInfoApi {
  id: sId | null;
  total: number | null;
  importe_total: number | null;
  deposito_valores: number | null;
  importe_final: number | null;
  tabla_total: TotalizerSingleInfoApi[];
  tickets_impresos: number | null;
  tickets_no_impresos: number | null;

  constructor(m?: TotalizerInfoApi) {
    this.id = m?.id || null;
    this.total = m?.total || null;
    this.importe_total = m?.importe_total || null;
    this.deposito_valores = m?.deposito_valores || null;
    this.importe_final = m?.importe_final || null;
    this.tickets_impresos = m?.tickets_impresos || null;
    this.tickets_no_impresos = m?.tickets_no_impresos || null;

    this.tabla_total = m?.tabla_total || [];
  }

  static toModel(ma: TotalizerInfoApi): TotalizerInfoModel {
    return new TotalizerInfoModel({
      id: ma.id || null!,
      collection: ma.tabla_total ? ma.tabla_total.map((tt) => TotalizerSingleInfoApi.toModel(tt)) : [],
      total: ma?.total || null!,
      amountTotal: ma?.importe_total || null!,
      depositValues: ma?.deposito_valores || null!,
      amount: ma?.importe_final || null!,
      printedTickets: ma?.tickets_impresos || null!,
      nonPrintedTickets: ma?.tickets_no_impresos || null!,
    });
  }
}

export class TotalizerAdapter implements IAdapter<TotalizerInfoModel> {
  adaptAll(data: TotalizerInfoApi[]) {
    return data.map((d) => this.adaptOne(d));
  }

  adaptOne(item: TotalizerInfoApi) {
    return TotalizerInfoApi.toModel(item);
  }

  adaptCreateApi(item: any): TotalizerInfoModel {
    throw new Error('Method not implemented.');
  }
  adaptUpdateApi(item: any): TotalizerInfoModel {
    throw new Error('Method not implemented.');
  }
}
