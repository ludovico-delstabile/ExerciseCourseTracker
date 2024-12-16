import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CoursesService } from '../../api/services';
import { shareReplay } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-courses',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatListModule,
  ],
  template: `
    <mat-list>
      @for (course of courses$ | async; track course) {
        <mat-list-item>
          <span matListItemTitle>{{ course.name }}</span>
          <span matListItemLine>{{ course.description }}</span>
        </mat-list-item>
      }
    </mat-list>
  `,
})
export class CoursesComponent {
  private _apiSrv = inject(CoursesService);

  courses$ = this._apiSrv.getCourses$Json().pipe(shareReplay(1));
}
