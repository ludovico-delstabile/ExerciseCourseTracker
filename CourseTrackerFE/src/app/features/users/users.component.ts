import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersService } from '../../api/services';
import { shareReplay } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-users',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatListModule,
    MatToolbarModule,
  ],
  template: `
    <mat-list class="page-list">
      @for (user of users$ | async; track user) {
        <mat-list-item>
          <span matListItemTitle>{{ user.username }}</span>
          <span matListItemLine>{{ user.userType }}</span>
        </mat-list-item>
      }
    </mat-list>
  `,
})
export class UsersComponent {
  private _apiSrv = inject(UsersService);

  users$ = this._apiSrv.getUsers$Json().pipe(shareReplay(1));
}
