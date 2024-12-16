import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuComponent } from "../menu/menu.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

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
    RouterOutlet,
  ],
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    mat-drawer-container {
      flex: 1;
      overflow: hidden;
    }
    mat-drawer-container {
      height: 100%;
      overflow: auto;
    }
  `,
  template: `
    <mat-toolbar color="secondary">
      <button mat-icon-button (click)="onToggleSidenav()"><mat-icon>menu</mat-icon></button>
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
}
