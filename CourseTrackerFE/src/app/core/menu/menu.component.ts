import { ChangeDetectionStrategy, Component, computed, effect, inject, output, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule, ActivatedRoute, Router, EventType } from '@angular/router';
import { menuRoutes } from '../../app.routes';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatListModule, RouterModule],
  styles: `
    :host {
      display: block;
      padding: 8px;
    }
  `,
  template: `
    <mat-nav-list>
      @for(item of menuItems; track item) {
        <a mat-list-item [routerLink]="item.path" [activated]="currentRouteKey() === item.data?.['key']" (click)="navigate.emit()">{{ item.menuLabel }}</a>
      }
    </mat-nav-list>
  `,
})
export class MenuComponent {
  navigate = output<void>();
  
  menuItems = menuRoutes;

  route = inject(ActivatedRoute);
  router = inject(Router);
  currentRouteKey = signal<string | undefined>(undefined);

  constructor() {
    this.router.events.pipe(filter(evt => evt.type === EventType.NavigationEnd)).subscribe(evt => {
      let leaf = this.route;
      while (leaf.firstChild) leaf = leaf.firstChild;
      this.currentRouteKey.set(leaf.snapshot.data['key']);
    })
  }
}
