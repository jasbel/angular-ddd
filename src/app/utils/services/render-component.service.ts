import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class RenderComponentService {
  private width$ = new BehaviorSubject<string>('mw-550px');
  public width = this.width$.asObservable();

  setWidth(w: string) {
    this.width$.next(w);
  }
}
