import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { CourseDto } from '../../../api/models';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-course-details',
  standalone: true,
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
      <input matInput disabled [value]="course().name"/>
    </mat-form-field>
    <mat-form-field>
      <mat-label>Description</mat-label>
      <textarea matInput rows="5" disabled [value]="course().description"></textarea>
    </mat-form-field>
    <mat-form-field>
      <mat-label>Instructor</mat-label>
      <input matInput disabled [value]="course().instructor?.username"/>
    </mat-form-field>
    <mat-toolbar>
      <span class="spacer"></span>
      <button type="button" mat-stroked-button (click)="onCancel()">Cancel</button>
      <button type="button" mat-stroked-button (click)="onSubscribe()">Subscribe</button>
    </mat-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailsComponent {
  course = input.required<CourseDto>();
  patch$ = toObservable(this.course);

  subscribed = output<void>();
  canceled = output<void>();

  onCancel() {
    this.canceled.emit();
  }

  onSubscribe() {
    this.subscribed.emit();
  }
}
