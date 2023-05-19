import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ServiceStep {
  private _id: string = '__id__';
  private _step: string = '__step__';

  public storage(id: string, step: number) {
    localStorage.setItem(this._id, id);
    localStorage.setItem(this._step, String(step));
  }

  get id(): string {
    return <string>localStorage.getItem(this._id);
  }

  get step(): number {
    return Number(localStorage.getItem(this._step));
  }

  public delete() {
    localStorage.removeItem(this._id);
    localStorage.removeItem(this._step);
  }
}
