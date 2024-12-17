import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CourseDto } from '../../api/models';

@Component({
  selector: 'app-course-details',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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
    <mat-form-field>
      <mat-label>Name</mat-label>
      <input matInput readonly [value]="course().name"/>
    </mat-form-field>
    <mat-form-field>
      <mat-label>Description</mat-label>
      <textarea matInput rows="5" readonly [value]="course().description"></textarea>
    </mat-form-field>
    <mat-form-field>
      <mat-label>Instructor</mat-label>
      <input matInput readonly [value]="course().instructor?.username"/>
    </mat-form-field>
    <ng-content></ng-content>
  `,
})
export class CourseDetailsComponent {
  course = input.required<CourseDto>();
}
