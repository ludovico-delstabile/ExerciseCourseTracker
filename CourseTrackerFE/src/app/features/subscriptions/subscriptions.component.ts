import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SubscriptionsService } from '../../api/services';
import { shareReplay } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatListModule,
  ],
  template: `
    <mat-list>
      @for (subscription of subscriptions$ | async; track subscription) {
        <mat-list-item>
          <span matListItemTitle>{{ subscription.course?.name }}</span>
          <span matListItemLine>{{ subscription.trackedHours }}</span>
        </mat-list-item>
      }
    </mat-list>
  `,
})
export class SubscriptionsComponent {
  private _apiSrv = inject(SubscriptionsService);

  subscriptions$ = this._apiSrv.getSubscriptions$Json().pipe(shareReplay(1));
}
