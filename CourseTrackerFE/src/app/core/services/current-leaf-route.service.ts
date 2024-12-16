import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, EventType, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentLeafRouteService {
  private _route = inject(ActivatedRoute);
  private router = inject(Router);

  public readonly route$ = this.router.events.pipe(
    filter(evt => evt.type === EventType.NavigationEnd),
    map(evt => {
      let leaf = this._route;
      while (leaf.firstChild) leaf = leaf.firstChild;
      return leaf?.snapshot;
    })
  );

  public readonly route = toSignal(this.route$);
}
