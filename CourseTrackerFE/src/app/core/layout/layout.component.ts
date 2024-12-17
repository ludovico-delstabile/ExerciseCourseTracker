import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuComponent } from "../menu/menu.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ShowIfLoadingDirective } from '../directives/showIfLoading.directive';
import { AuthService } from '../services/auth.service';
import { CurrentLeafRouteService } from '../services/current-leaf-route.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatSidenavModule,
    MenuComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    RouterOutlet,
    ShowIfLoadingDirective,
  ],
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    mat-toolbar {
      position: relative;
      mat-progress-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
      }
    }
    mat-drawer-container {
      flex: 1;
    }
    ::ng-deep {
      .mat-drawer-content {
        height: 100%;
        overflow: auto;
        padding: 0 16px;
      }
    }
  `,
  template: `
    <mat-toolbar color="secondary">
      <button mat-icon-button (click)="onToggleSidenav()"><mat-icon>menu</mat-icon></button>
      <h5 style="margin-left: 16px">{{currentTitle()}}</h5>
      <span class="spacer"></span>
      <button mat-icon-button (click)="onLogout()"><mat-icon>exit_to_app</mat-icon></button>
      <mat-progress-bar *appShowIfLoading mode="indeterminate"/>
    </mat-toolbar>
    <mat-drawer-container (backdropClick)="onBackdropClick()" >
      <mat-drawer mode="over" disableClose [opened]="isSidenavOpen()" [autoFocus]="false">
        <app-menu (navigate)="onNavigate()"/>
      </mat-drawer>
      <router-outlet />
    </mat-drawer-container>
  `,
})
export class LayoutComponent {
  private _authSrv = inject(AuthService);
  private _router = inject(Router);
  private _leafRoute = inject(CurrentLeafRouteService);

  currentTitle = computed(() => this._leafRoute.route()?.title);

  isSidenavOpen = signal(false);

  onToggleSidenav() {
    this.isSidenavOpen.update(isOpen => !isOpen);
  }
  onBackdropClick() {
    this.isSidenavOpen.set(false);
  }
  onNavigate() {
    this.isSidenavOpen.set(false);
  }

  onLogout() {
    this._authSrv.logout();
    this._router.navigate(['login']);
  }
}
