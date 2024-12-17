import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CourseDto } from '../../api/models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-course-details',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    MatButtonModule,
    MatFormFieldModule,
    MatInput,
    MatToolbarModule,
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
      <h5>Course Details</h5>
    </mat-toolbar>
    <mat-form-field>
      <mat-label>Name</mat-label>
      <input matInput readonly [value]="course().name"/>
    </mat-form-field>
    <mat-form-field>
      <mat-label>Description</mat-label>
      <textarea matInput rows="5" readonly [value]="course().description"></textarea>
    </mat-form-field>
    <mat-form-field>
      <mat-label>Start Date</mat-label>
      <input matInput rows="5" readonly [value]="course().startDate | date"/>
    </mat-form-field>
    <mat-form-field>
      <mat-label>Instructor</mat-label>
      <input matInput readonly [value]="course().instructor?.username"/>
    </mat-form-field>
  `,
})
export class CourseDetailsComponent {
  course = input.required<CourseDto>();
}
