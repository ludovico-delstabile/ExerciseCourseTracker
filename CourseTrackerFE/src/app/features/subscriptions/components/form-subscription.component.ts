import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-form-subscription',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
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
      <h5>Edit Tracked Time</h5>
    </mat-toolbar>
    <mat-form-field>
      <mat-label>Tracked Hours</mat-label>
      <input matInput [formControl]="control"/>
    </mat-form-field>
    <mat-toolbar>
      <span class="spacer"></span>
      <button type="button" mat-stroked-button (click)="onCancel()">Cancel</button>
      <button type="button" mat-stroked-button (click)="onUnsubscribe()">Unsubscribe</button>
      <button type="button" mat-stroked-button (click)="onSubmit()">Submit</button>
    </mat-toolbar>
  `,
})
export class FormSubscriptionComponent {
  patch = input<number | undefined | null>();
  patch$ = toObservable(this.patch);

  submitted = output<number>();
  canceled = output<void>();
  unsubscribe = output<void>();

  control = inject(FormBuilder).control(null as number | null, [Validators.min(0)]);

  constructor() {
    this.patch$.pipe(takeUntilDestroyed()).subscribe(patch => {
      this.control.markAsUntouched();
      this.control.reset(patch);
    });
  }

  onCancel() {
    this.canceled.emit();
  }

  onSubmit() {
    if (this.control.valid) this.submitted.emit(this.control.value!);
  }
  onUnsubscribe() {
    this.unsubscribe.emit();
  }
}
