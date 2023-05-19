import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { tap } from 'rxjs/internal/operators';

@Injectable({ providedIn: 'root' })
export class PendingService {
  private pending = new Map<string, Observable<any>>();

  public intercept(url: string, request: any): Observable<any> {
    const pendingRequestObservable = this.pending.get(url);
    return pendingRequestObservable ? pendingRequestObservable : this.sendRequest(url, request);
  }

  public sendRequest(url: string, request: any): Observable<any> {
    this.pending.set(url, request);
    return request.pipe(
      tap(() => {
        this.pending.delete(url);
      })
    );
  }
}
// https://stackoverflow.com/questions/50864978/angular-rxjs-6-how-to-prevent-duplicate-http-requests#answer-57308372
