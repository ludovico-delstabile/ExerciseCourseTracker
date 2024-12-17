import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CoursesService, SubscriptionsService } from '../../api/services';
import { shareReplay, startWith, Subject, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { SidePanelLayoutComponent } from "../../shared/side-panel-layout.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { CourseDetailsComponent } from "../../shared/courses/course-details.component";
import { CourseDto } from '../../api/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-available-courses',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    SidePanelLayoutComponent,
    MatToolbarModule,
    CourseDetailsComponent
  ],
  template: `
    <app-side-panel-layout [isPanelOpen]="!!selectedCourseId()">
      <div content>
        <mat-list content class="page-list">
          @for (course of courses$ | async; track course) {
            <mat-list-item (click)="onSelectCourse(course)" [class.selected]="selectedCourseId() === course.id">
              <span matListItemTitle>{{ course.name }}</span>
              <span matListItemLine>{{ course.description }}</span>
            </mat-list-item>
          }
        </mat-list>
      </div>
      <app-course-details panel *ngIf="selectedCourse() as course" [course]="course">
        <mat-toolbar>
          <span class="spacer"></span>
          <button type="button" mat-stroked-button (click)="onCancel()">Cancel</button>
          <button type="button" mat-stroked-button (click)="onSubscribe(course)">Subscribe</button>
        </mat-toolbar>
      </app-course-details>
    </app-side-panel-layout>
  `,
})
export class AvailableCoursesComponent {
  private _apiSrv = inject(CoursesService);
  private _apiSubscriptionsSrv = inject(SubscriptionsService);
  private _snackbar = inject(MatSnackBar);
  
  loadCourses$ = new Subject<void>();
  courses$ = this.loadCourses$.pipe(startWith(void 0), switchMap(() => this._apiSrv.getCourses$Json()), shareReplay(1));
  courses = toSignal(this.courses$);

  selectedCourseId = signal<number | undefined>(undefined);
  selectedCourse = computed(() => this.selectedCourseId() != null ? this.courses()?.find(c => c.id === this.selectedCourseId()) : undefined);

  onSelectCourse(course: CourseDto) {
    this.selectedCourseId.set(course.id);
  }

  onSubscribe(course: CourseDto) {
    this._apiSubscriptionsSrv.subscribeCourse$Json({ body: course.id }).subscribe(() => {
      this._snackbar.open(`Subscribed to: ${ course.name }`, 'Ok', { duration: 2000 });
    });
  }

  onCancel() {
    this.selectedCourseId.set(undefined);
  }
}
