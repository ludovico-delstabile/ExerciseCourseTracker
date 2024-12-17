import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { SubscriptionsService } from '../../api/services';
import { shareReplay, startWith, Subject, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { CourseDetailsComponent } from "../../shared/courses/course-details.component";
import { MatToolbar } from '@angular/material/toolbar';
import { SidePanelLayoutComponent } from "../../shared/side-panel-layout.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { toSignal } from '@angular/core/rxjs-interop';
import { SubscriptionDto } from '../../api/models';
import { MatButtonModule } from '@angular/material/button';
import { FormSubscriptionComponent } from "./components/form-subscription.component";

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatListModule,
    CourseDetailsComponent,
    MatToolbar,
    SidePanelLayoutComponent,
    MatButtonModule,
    FormSubscriptionComponent
],
  template: `
    <app-side-panel-layout [isPanelOpen]="!!selectedSubscriptionId()">
      <mat-list content >
        @for (subscription of subscriptions$ | async; track subscription) {
          <mat-list-item (click)="onSelectSubscription(subscription)" [class.selected]="selectedSubscriptionId() === subscription.id">
            <span matListItemTitle>{{ subscription.course?.name }}</span>
            <span matListItemLine>Tracked hours: {{ subscription.trackedHours }}</span>
          </mat-list-item>
        }
      </mat-list>
      <div panel *ngIf="selectedSubscription() as subscription">
        <app-form-subscription
          [patch]="subscription.trackedHours"
          (submitted)="onSaveTrackedTime($event)"
          (canceled)="onCancel()"
          (unsubscribe)="onUnsubscribe(subscription)"
        />
        <app-course-details [course]="subscription.course!" />
      </div>
    </app-side-panel-layout>
  `,
})
export class SubscriptionsComponent {
  private _apiSrv = inject(SubscriptionsService);
  private _snackbar = inject(MatSnackBar);
  
  loadSubscriptions$ = new Subject<void>();
  subscriptions$ = this.loadSubscriptions$.pipe(startWith(void 0), switchMap(() => this._apiSrv.getSubscriptions$Json()), shareReplay(1));
  subscriptions = toSignal(this.subscriptions$);

  selectedSubscriptionId = signal<number | undefined>(undefined);
  selectedSubscription = computed(() => this.selectedSubscriptionId() != null ? this.subscriptions()?.find(c => c.id === this.selectedSubscriptionId()) : undefined);

  onSelectSubscription(subscription: SubscriptionDto) {
    this.selectedSubscriptionId.set(subscription.id);
  }

  onUnsubscribe(subscription: SubscriptionDto) {
    this._apiSrv.unsubscribeCourse({ subscriptionId: subscription.id! }).subscribe(() => {
      this._snackbar.open(`Unsubscribed to: ${ subscription.course?.name }`, 'Ok', { duration: 2000 });
      this.selectedSubscriptionId.set(undefined);
      this.loadSubscriptions$.next();
    });
  }

  onCancel() {
    this.selectedSubscriptionId.set(undefined);
  }

  onSaveTrackedTime(value: number) {
    this._apiSrv.updateTrackedTime$Json({ subscriptionId: this.selectedSubscriptionId()!, body: value }).subscribe(() => {
      this.loadSubscriptions$.next();
    })
  }
}
