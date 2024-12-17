import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CoursesService, UsersService } from '../../api/services';
import { shareReplay, startWith, Subject, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { CourseDto } from '../../api/models';
import { toSignal } from '@angular/core/rxjs-interop';
import { SidePanelLayoutComponent } from "../../shared/side-panel-layout.component";
import { FormCourseComponent } from "./components/form-course.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatListModule,
    SidePanelLayoutComponent,
    FormCourseComponent,
    MatToolbarModule,
    MatButtonModule,
  ],
  template: `
    <app-side-panel-layout [isPanelOpen]="isPanelOpen()">
      <div content>
        <mat-toolbar>
          <span class="spacer"></span>
          <button mat-stroked-button (click)="onAddCourse()">Add Course</button>
        </mat-toolbar>
        <mat-list content >
          @for (course of courses$ | async; track course) {
            <mat-list-item (click)="onSelectCourse(course)" [class.selected]="selectedCourseId() === course.id">
              <span matListItemTitle>{{ course.name }}</span>
              <span matListItemLine>{{ course.description }}</span>
            </mat-list-item>
          }
        </mat-list>
      </div>
      <app-form-course panel [users]="users$ | async" [patch]="formPatch()" (submitted)="onSubmitCourse($event)" (canceled)="onCacel()"/>
    </app-side-panel-layout>
  `,
})
export class CoursesComponent {
  private _apiSrv = inject(CoursesService);
  private _snackbar = inject(MatSnackBar);
  
  loadCourses$ = new Subject<void>();
  courses$ = this.loadCourses$.pipe(startWith(void 0), switchMap(() => this._apiSrv.getCourses$Json()), shareReplay(1));
  courses = toSignal(this.courses$);

  users$ = inject(UsersService).getUsers$Json().pipe(shareReplay(1));

  selectionState = signal<{ courseId?: number; isSelectedAdd?: boolean }>({});
  selectedCourseId = computed(() => this.selectionState().courseId);
  isSelectedAdd = computed(() => this.selectionState().isSelectedAdd);

  isPanelOpen = computed(() => this.selectedCourseId() != null || this.isSelectedAdd());
  formPatch = computed(() => this.selectedCourseId() != null ? this.courses()?.find(c => c.id === this.selectedCourseId()) : undefined);

  onAddCourse() {
    this.selectionState.set({ isSelectedAdd: true });
  }

  onSelectCourse(course: CourseDto) {
    this.selectionState.set({ courseId: course.id });
  }

  onCacel() {
    this.selectionState.set({});
  }

  onSubmitCourse(formValue: CourseDto) {
    const req$ = this.formPatch() != null
      ? this._apiSrv.editCourse$Json({ body: { ...this.formPatch(), ...formValue } })
      : this._apiSrv.addCourse$Json({ body: formValue });

    req$.subscribe((res) => {
      this.loadCourses$.next();
      this.selectionState.set({ courseId: res.id });
      this._snackbar.open(`${ res?.name } Saved!`, 'Ok', { duration: 2000 });
    });
  }
}
