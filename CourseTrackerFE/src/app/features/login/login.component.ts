import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  template: `<p>login works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  form = inject(FormBuilder).group({
    username: [],
    password: [],
  });
}
