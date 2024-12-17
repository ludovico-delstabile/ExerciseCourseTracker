import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CourseDto, UserDto } from '../../../api/models';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-form-course',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInput,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
  ],
  styles: `
    :host {
      display: block;
    }
    mat-form-field {
      width: 100%;
    }
  `,
  template: `
    <mat-toolbar>
      <h5 *ngIf="!patch()">Add Course</h5>
      <h5 *ngIf="patch()">Edit Course</h5>
    </mat-toolbar>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput formControlName="name"/>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Description</mat-label>
        <textarea matInput rows="5" formControlName="description"></textarea>
      </mat-form-field>
      <mat-form-field>
        <mat-label>StartDate</mat-label>
        <input matInput formControlName="startDate" [matDatepickerFilter]="dateFilter" [matDatepicker]="picker">
        <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Instructor</mat-label>
        <mat-select [compareWith]="compareUsers" formControlName="instructor">
          <mat-option *ngFor="let user of users()" [value]="user" >{{ user.username }}</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-toolbar>
        <span class="spacer"></span>
        <button type="button" mat-stroked-button (click)="onCancel()">Cancel</button>
        <button mat-stroked-button>Submit</button>
      </mat-toolbar>
    </form>
  `,
})
export class FormCourseComponent {
  patch = input<CourseDto | undefined | null>();
  patch$ = toObservable(this.patch);

  users = input<UserDto[] | null>();
  compareUsers = (u1: UserDto, u2: UserDto) => u1?.id === u2?.id;

  submitted = output<CourseDto>();
  canceled = output<void>();

  form = inject(FormBuilder).group({
    name: [null as string | null, Validators.required],
    description: [null as string | null, Validators.required],
    startDate: [null as Date | null, Validators.required],
    instructor: [null as UserDto | null, Validators.required],
  });

  private today = new Date();
  dateFilter = (d: Date | null): boolean => {
    return d == null || d > this.today;
  };

  constructor() {
    this.patch$.pipe(takeUntilDestroyed()).subscribe(patch => {
      this.form.markAsUntouched();
      this.form.reset({
        name: patch?.name || null,
        description: patch?.description || null,
        startDate: patch?.startDate ? new Date(patch?.startDate) : null,
        instructor: patch?.instructor || null,
      });
    });
  }

  onCancel() {
    this.canceled.emit();
  }

  onSubmit() {
    if (this.form.valid) this.submitted.emit(this.form.value as CourseDto);
  }

  
}
