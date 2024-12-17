import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { menuRoutes } from '../../app.routes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrentLeafRouteService } from '../services/current-leaf-route.service';

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
        <a mat-list-item [routerLink]="item.path" [activated]="currentRouteKey() === item.data?.['key']" (click)="navigate.emit()">{{ item.title }}</a>
      }
    </mat-nav-list>
  `,
})
export class MenuComponent {
  navigate = output<void>();
  
  menuItems = menuRoutes;

  leafRoute = inject(CurrentLeafRouteService);
  currentRouteKey = computed(() => this.leafRoute.route()?.data?.['key']);
}
